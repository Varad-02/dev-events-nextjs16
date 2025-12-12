"use client";
import { useEffect } from "react";
import posthog from "posthog-js";

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
        const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com";

        if (!key) {
            console.warn("PostHog not initialized — missing env vars.");
            return;
        }

        posthog.init(key, {
            api_host: host,
            autocapture: false,
            capture_pageview: false,
            disable_session_recording: true,
            debug: false,
            persistence: "localStorage",
        });

        // ⭐ Add this line to expose PostHog for console tests:
        //(window as any).posthog = posthog;
        if (process.env.NODE_ENV === "development") {
            (window as any).posthog = posthog;
        }

    }, []);

    return <>{children}</>;
}
