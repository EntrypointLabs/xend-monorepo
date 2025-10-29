/** @type {import("plasmo").PlasmoConfig} */
export default {
  vite: {
    build: {
      rollupOptions: {
        external: [
          "@solana/kit",
          "@solana-program/memo",
          "@solana-program/system",
          "@solana-program/token"
        ]
      }
    }
  }
}
