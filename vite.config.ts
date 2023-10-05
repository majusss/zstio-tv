import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/getSubstitutions": {
        target: "https://zastepstwa-zstio.netlify.app/api/getSubstitutions",
        changeOrigin: true,
        rewrite: (path) => path.replace(`/api/getSubstitutions`, ""),
      },
      "/api/getCurrentPlaying": {
        target: "http://localhost:3000/api/spoti_current",
        changeOrigin: true,
        rewrite: (path) => path.replace(`/api/getCurrentPlaying`, ""),
      },
      "/api/getLuckyNumber": {
        target: "http://localhost:3000/api/getLuckyNumber",
        changeOrigin: true,
        rewrite: (path) => path.replace(`/api/getLuckyNumber`, ""),
      },
      "/api/getCytat": {
        target: "http://localhost:3000/api/getCytat",
        changeOrigin: true,
        rewrite: (path) => path.replace(`/api/getCytat`, ""),
      },
    },
  },
  plugins: [react()],
});
