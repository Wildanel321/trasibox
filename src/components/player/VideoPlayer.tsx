"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Hls from "hls.js";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  Settings,
  Subtitles,
  SkipForward,
  ChevronLeft,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { formatSeconds } from "@/lib/utils";

interface SubtitleTrack {
  id: string;
  label: string;
  lang: string;
  src: string;
}

interface VideoPlayerProps {
  streamUrl: string;
  title: string;
  subtitleLabel?: string;
  contentId: string;
  contentType?: "MOVIE" | "EPISODE";
  initialTime?: number;
  subtitles?: SubtitleTrack[];
  nextEpisodeUrl?: string;
  nextEpisodeTitle?: string;
  backHref?: string;
}

export function VideoPlayer({
  streamUrl,
  title,
  subtitleLabel,
  contentId,
  contentType = "MOVIE",
  initialTime = 0,
  subtitles = [],
  nextEpisodeUrl,
  nextEpisodeTitle,
  backHref = "/",
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [qualities, setQualities] = useState<{ id: number; height: number; bitrate: number }[]>([]);
  const [currentQuality, setCurrentQuality] = useState(-1); // -1 = Auto
  const [activeSubtitle, setActiveSubtitle] = useState<string>("off");
  const [showSettings, setShowSettings] = useState(false);
  const [settingsTab, setSettingsTab] = useState<"main" | "speed" | "quality" | "subtitle">("main");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-hide controls timer
  const resetControlsTimeout = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        if (!showSettings) setShowControls(false);
      }, 3500);
    }
  }, [isPlaying, showSettings]);

  // Save progress locally & to API
  const saveProgress = useCallback(
    (time: number, dur: number) => {
      if (!dur || dur <= 0) return;
      try {
        const historyKey = "trasibox_history";
        const currentHistory = JSON.parse(localStorage.getItem(historyKey) || "{}");
        currentHistory[contentId] = {
          contentId,
          contentType,
          progressSeconds: Math.floor(time),
          durationSeconds: Math.floor(dur),
          completed: time / dur > 0.9,
          updatedAt: new Date().toISOString(),
        };
        localStorage.setItem(historyKey, JSON.stringify(currentHistory));

        // Call backend API (fire and forget / non-blocking)
        fetch("/api/v1/watch/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contentId,
            contentType,
            progressSeconds: Math.floor(time),
            durationSeconds: Math.floor(dur),
          }),
        }).catch(() => {});
      } catch {
        // storage fallback
      }
    },
    [contentId, contentType]
  );

  // Initialize HLS
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check saved progress if initialTime is 0
    let startTime = initialTime;
    if (startTime === 0) {
      try {
        const stored = JSON.parse(localStorage.getItem("trasibox_history") || "{}");
        if (stored[contentId]?.progressSeconds) {
          startTime = stored[contentId].progressSeconds;
        }
      } catch {}
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
      });
      hlsRef.current = hls;

      hls.loadSource(streamUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        const levels = data.levels.map((lvl, index) => ({
          id: index,
          height: lvl.height,
          bitrate: lvl.bitrate,
        }));
        setQualities(levels);
        if (startTime > 0) {
          video.currentTime = startTime;
        }
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              setErrorMsg("Gagal memuat video stream HLS. Silakan periksa jaringan.");
              break;
          }
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native Safari HLS
      video.src = streamUrl;
      video.addEventListener("loadedmetadata", () => {
        if (startTime > 0) video.currentTime = startTime;
      });
    } else {
      setErrorMsg("Browser Anda tidak mendukung pemutaran video HLS.");
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [streamUrl, contentId, initialTime]);

  // Video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => {
      setIsPlaying(false);
      setShowControls(true);
      saveProgress(video.currentTime, video.duration);
    };
    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.buffered.length > 0) {
        setBuffered(video.buffered.end(video.buffered.length - 1));
      }
    };
    const onDurationChange = () => setDuration(video.duration);
    const onVolumeChange = () => {
      setVolume(video.volume);
      setIsMuted(video.muted);
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("durationchange", onDurationChange);
    video.addEventListener("volumechange", onVolumeChange);

    // Periodic progress save every 5 seconds
    const interval = setInterval(() => {
      if (!video.paused && video.duration > 0) {
        saveProgress(video.currentTime, video.duration);
      }
    }, 5000);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("durationchange", onDurationChange);
      video.removeEventListener("volumechange", onVolumeChange);
      clearInterval(interval);
    };
  }, [saveProgress]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Play / Pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  };

  // Seek helper
  const seekRelative = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Speed change
  const changeSpeed = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
      setShowSettings(false);
      setSettingsTab("main");
    }
  };

  // Quality change
  const changeQuality = (lvlIndex: number) => {
    if (hlsRef.current) {
      hlsRef.current.currentLevel = lvlIndex;
      setCurrentQuality(lvlIndex);
      setShowSettings(false);
      setSettingsTab("main");
    }
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["input", "textarea"].includes((e.target as HTMLElement).tagName.toLowerCase())) return;

      switch (e.key.toLowerCase()) {
        case " ":
        case "k":
          e.preventDefault();
          togglePlay();
          resetControlsTimeout();
          break;
        case "f":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "m":
          e.preventDefault();
          if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
          break;
        case "arrowleft":
          e.preventDefault();
          seekRelative(-10);
          resetControlsTimeout();
          break;
        case "arrowright":
          e.preventDefault();
          seekRelative(10);
          resetControlsTimeout();
          break;
        case "arrowup":
          e.preventDefault();
          if (videoRef.current) videoRef.current.volume = Math.min(1, videoRef.current.volume + 0.1);
          break;
        case "arrowdown":
          e.preventDefault();
          if (videoRef.current) videoRef.current.volume = Math.max(0, videoRef.current.volume - 0.1);
          break;
        case "escape":
          setShowSettings(false);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlay, resetControlsTimeout, duration]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferedPercent = duration > 0 ? (buffered / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={resetControlsTimeout}
      onMouseLeave={() => isPlaying && !showSettings && setShowControls(false)}
      className="relative w-full aspect-video bg-black overflow-hidden select-none group font-sans"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        onClick={togglePlay}
        playsInline
        className="w-full h-full object-contain cursor-pointer"
      />

      {/* Error Banner */}
      {errorMsg && (
        <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-6 text-center z-40">
          <AlertCircle className="w-12 h-12 text-rose-500 mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Kendala Pemutaran</h3>
          <p className="text-sm text-zinc-400 max-w-md mb-6">{errorMsg}</p>
          <Link
            href={backHref}
            className="px-4 py-2 rounded-lg bg-[#7C5CFC] text-white text-sm font-semibold hover:bg-[#6A49F5]"
          >
            Kembali ke Katalog
          </Link>
        </div>
      )}

      {/* Top Header Overlay */}
      <div
        className={`absolute top-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-b from-black/90 via-black/40 to-transparent flex items-center justify-between z-30 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-3">
          <Link
            href={backHref}
            aria-label="Kembali"
            className="p-2 rounded-full bg-black/40 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-sm sm:text-base font-semibold text-white drop-shadow truncate max-w-sm sm:max-w-md">
              {title}
            </h2>
            {subtitleLabel && (
              <p className="text-xs text-zinc-400 truncate">{subtitleLabel}</p>
            )}
          </div>
        </div>

        {nextEpisodeUrl && (
          <Link
            href={nextEpisodeUrl}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white backdrop-blur-md transition-colors"
          >
            <span>Next Ep</span>
            <SkipForward className="w-4 h-4 text-[#7C5CFC]" />
          </Link>
        )}
      </div>

      {/* Center Large Play Pause Indicator when paused */}
      {!isPlaying && !errorMsg && (
        <button
          type="button"
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center z-20"
        >
          <div className="w-20 h-20 rounded-full bg-[#7C5CFC]/90 text-white flex items-center justify-center shadow-2xl shadow-[#7C5CFC]/50 backdrop-blur-sm transform transition-transform hover:scale-110 active:scale-95">
            <Play className="w-8 h-8 fill-white ml-1" />
          </div>
        </button>
      )}

      {/* Settings Popover */}
      {showSettings && (
        <div className="absolute bottom-20 right-4 sm:right-8 w-64 bg-[#18181B]/95 backdrop-blur-xl border border-white/15 rounded-xl shadow-2xl p-3 z-40 text-xs text-zinc-300">
          {settingsTab === "main" && (
            <div className="space-y-1">
              <div className="px-2 py-1.5 font-semibold text-white border-b border-white/10 mb-1">
                Pengaturan Player
              </div>
              <button
                type="button"
                onClick={() => setSettingsTab("speed")}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10 text-left transition-colors"
              >
                <span>Kecepatan Pemutaran</span>
                <span className="text-[#A78BFA] font-medium">{playbackSpeed}x</span>
              </button>
              {qualities.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSettingsTab("quality")}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10 text-left transition-colors"
                >
                  <span>Kualitas Resolusi</span>
                  <span className="text-[#A78BFA] font-medium">
                    {currentQuality === -1 ? "Auto" : `${qualities[currentQuality]?.height}p`}
                  </span>
                </button>
              )}
            </div>
          )}

          {settingsTab === "speed" && (
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setSettingsTab("main")}
                className="w-full flex items-center gap-1.5 px-2 py-1.5 text-zinc-400 hover:text-white border-b border-white/10 mb-1"
              >
                <ChevronLeft className="w-4 h-4" /> Kecepatan
              </button>
              {[0.5, 0.75, 1, 1.25, 1.5, 2].map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => changeSpeed(spd)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left ${
                    playbackSpeed === spd ? "bg-[#7C5CFC] text-white font-semibold" : "hover:bg-white/10"
                  }`}
                >
                  <span>{spd === 1 ? "Normal (1x)" : `${spd}x`}</span>
                </button>
              ))}
            </div>
          )}

          {settingsTab === "quality" && (
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setSettingsTab("main")}
                className="w-full flex items-center gap-1.5 px-2 py-1.5 text-zinc-400 hover:text-white border-b border-white/10 mb-1"
              >
                <ChevronLeft className="w-4 h-4" /> Kualitas
              </button>
              <button
                type="button"
                onClick={() => changeQuality(-1)}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left ${
                  currentQuality === -1 ? "bg-[#7C5CFC] text-white font-semibold" : "hover:bg-white/10"
                }`}
              >
                <span>Auto (Adaptif)</span>
              </button>
              {qualities.map((q) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => changeQuality(q.id)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left ${
                    currentQuality === q.id ? "bg-[#7C5CFC] text-white font-semibold" : "hover:bg-white/10"
                  }`}
                >
                  <span>{q.height}p</span>
                  <span className="text-[10px] text-zinc-400">
                    {Math.round(q.bitrate / 1000)} kbps
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bottom Controls Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-3 sm:p-5 bg-gradient-to-t from-black/95 via-black/70 to-transparent z-30 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Scrubber / Progress Bar */}
        <div className="relative w-full h-2 mb-3 sm:mb-4 group/scrub flex items-center cursor-pointer">
          {/* Buffer Bar */}
          <div
            className="absolute left-0 top-0 bottom-0 bg-white/20 rounded-full transition-all"
            style={{ width: `${bufferedPercent}%` }}
          />
          {/* Active Progress Bar */}
          <div
            className="absolute left-0 top-0 bottom-0 bg-[#7C5CFC] rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          />
          {/* Range Input for accessibility and scrub click */}
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            aria-label="Seek Video"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        {/* Action Controls Row */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
            </button>

            <button
              type="button"
              onClick={() => seekRelative(-10)}
              aria-label="Mundur 10 detik"
              className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => seekRelative(10)}
              aria-label="Maju 10 detik"
              className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            {/* Volume */}
            <div className="flex items-center gap-1.5 group/vol">
              <button
                type="button"
                onClick={() => {
                  if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
                }}
                aria-label="Toggle mute"
                className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (videoRef.current) {
                    videoRef.current.volume = val;
                    videoRef.current.muted = val === 0;
                  }
                }}
                aria-label="Volume slider"
                className="w-16 h-1 accent-[#7C5CFC] bg-white/20 rounded cursor-pointer hidden sm:block"
              />
            </div>

            {/* Timestamps */}
            <div className="text-xs text-zinc-300 font-mono tracking-tight ml-1">
              <span>{formatSeconds(currentTime)}</span>
              <span className="text-zinc-500 mx-1">/</span>
              <span>{formatSeconds(duration)}</span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => {
                setShowSettings(!showSettings);
                setSettingsTab("main");
              }}
              aria-label="Pengaturan"
              className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
            >
              <Settings className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label="Fullscreen"
              className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
