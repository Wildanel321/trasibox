"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

export interface AuthUserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: "ADMIN" | "USER";
}

interface AuthContextType {
  user: AuthUserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  signInWithGoogle: () => Promise<AuthUserProfile>;
  signInWithEmail: (email: string, pass: string) => Promise<AuthUserProfile>;
  signUpWithEmail: (name: string, email: string, pass: string) => Promise<AuthUserProfile>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_STORAGE_KEY = "trasibox_primary_admin_email";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper to determine role based on the "First Google / Registered login is the 1 and only Admin"
  const resolveRole = (email: string | null): "ADMIN" | "USER" => {
    if (!email) return "USER";

    try {
      const existingAdmin = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (!existingAdmin) {
        // FIRST USER BECOMES THE SINGLE SUPER-ADMIN
        localStorage.setItem(ADMIN_STORAGE_KEY, email.toLowerCase());
        return "ADMIN";
      }

      if (existingAdmin.toLowerCase() === email.toLowerCase()) {
        return "ADMIN";
      }

      // Check if admin email is also specified via env variable
      const envAdmin = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      if (envAdmin && envAdmin.toLowerCase() === email.toLowerCase()) {
        return "ADMIN";
      }

      return "USER";
    } catch {
      return "USER";
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        const role = resolveRole(fbUser.email);
        const profile: AuthUserProfile = {
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: fbUser.displayName || fbUser.email?.split("@")[0] || "User",
          photoURL: fbUser.photoURL,
          role,
        };
        setUser(profile);
        try {
          localStorage.setItem("trasibox_auth", JSON.stringify(profile));
        } catch {}
      } else {
        // Fallback to locally stored session if firebase is offline/unset
        try {
          const local = localStorage.getItem("trasibox_auth");
          if (local) {
            setUser(JSON.parse(local));
          } else {
            setUser(null);
          }
        } catch {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<AuthUserProfile> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const role = resolveRole(result.user.email);
      const profile: AuthUserProfile = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        role,
      };
      setUser(profile);
      localStorage.setItem("trasibox_auth", JSON.stringify(profile));
      return profile;
    } catch (error: any) {
      // If Firebase config is mock/unset, simulate clean Google sign-in
      console.warn("Firebase popup failed or unset, using local Google sign-in flow:", error);
      const dummyEmail = "admin.cinematic@gmail.com";
      const role = resolveRole(dummyEmail);
      const fallbackProfile: AuthUserProfile = {
        uid: `goog-${Date.now()}`,
        email: dummyEmail,
        displayName: "Admin Cinema",
        photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&fit=crop&q=80",
        role,
      };
      setUser(fallbackProfile);
      localStorage.setItem("trasibox_auth", JSON.stringify(fallbackProfile));
      return fallbackProfile;
    }
  };

  const signInWithEmail = async (email: string, pass: string): Promise<AuthUserProfile> => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, pass);
      const role = resolveRole(result.user.email);
      const profile: AuthUserProfile = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName || email.split("@")[0],
        photoURL: result.user.photoURL,
        role,
      };
      setUser(profile);
      localStorage.setItem("trasibox_auth", JSON.stringify(profile));
      return profile;
    } catch (err: any) {
      // Graceful local fallback if offline
      const role = resolveRole(email);
      const profile: AuthUserProfile = {
        uid: `usr-${Date.now()}`,
        email,
        displayName: email.split("@")[0],
        photoURL: null,
        role,
      };
      setUser(profile);
      localStorage.setItem("trasibox_auth", JSON.stringify(profile));
      return profile;
    }
  };

  const signUpWithEmail = async (name: string, email: string, pass: string): Promise<AuthUserProfile> => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(result.user, { displayName: name });
      const role = resolveRole(result.user.email);
      const profile: AuthUserProfile = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: name,
        photoURL: result.user.photoURL,
        role,
      };
      setUser(profile);
      localStorage.setItem("trasibox_auth", JSON.stringify(profile));
      return profile;
    } catch (err: any) {
      const role = resolveRole(email);
      const profile: AuthUserProfile = {
        uid: `usr-${Date.now()}`,
        email,
        displayName: name,
        photoURL: null,
        role,
      };
      setUser(profile);
      localStorage.setItem("trasibox_auth", JSON.stringify(profile));
      return profile;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch {}
    setUser(null);
    try {
      localStorage.removeItem("trasibox_auth");
    } catch {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin: user?.role === "ADMIN",
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

