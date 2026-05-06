import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "sidebar-bg": "var(--sidebar-bg)",
        "sidebar-border": "var(--sidebar-border)",
        accent: "var(--accent)",
        "accent-light": "var(--accent-light)",
        muted: "var(--muted)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
export default config;
