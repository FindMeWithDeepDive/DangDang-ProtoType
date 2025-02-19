import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    global: "globalThis",
  },
  server: {
    proxy: {
      "/api": {
        target: "http://54.180.30.146:8080",
        changeOrigin: true,
        secure: false,
      },
      "/ws": {
        // WebSocket 프록시 추가
        target: "ws://54.180.30.146:8080",
        ws: true,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
