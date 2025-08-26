"use client";

import React, { useEffect, useState } from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

type Settings = {
  primaryColor: string;
  darkMode: boolean;
  colorScheme: "light" | "dark" | "auto";
};

const DEFAULTS: Settings = {
  primaryColor: "#228be6",
  darkMode: true,
  colorScheme: "dark",
};

export default function ThemeController({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/admin/settings", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (mounted && data?.data) {
          const s = data.data as Partial<Settings>;
          setSettings((prev) => ({
            primaryColor: s.primaryColor || prev.primaryColor,
            darkMode: typeof s.darkMode === "boolean" ? s.darkMode : prev.darkMode,
            colorScheme: (s.colorScheme as Settings["colorScheme"]) || prev.colorScheme,
          }));
        }
      } catch {}
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const scheme = settings.colorScheme === "auto" ? (settings.darkMode ? "dark" : "light") : settings.colorScheme;

  // Build a simple dynamic palette named "brand" from the stored hex
  // For now we reuse the same hex for all 10 shades to satisfy Mantine's requirement
  // Later we can generate real tints/shades.
  const brandShades: string[] = Array(10).fill(settings.primaryColor || "#228be6");

  return (
    <>
      <ColorSchemeScript defaultColorScheme={scheme} />
      <MantineProvider
        defaultColorScheme={scheme}
        theme={{
          colors: { brand: brandShades },
          primaryColor: "brand",
        }}
      >
        <Notifications position="top-right" />
        {children}
      </MantineProvider>
    </>
  );
}


