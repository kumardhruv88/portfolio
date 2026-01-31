/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0a0e27", // Deep Space Navy
        secondary: "#ff0080", // Neural Pink
        accent: "#9d4edd", // Accent Purple
        highlight: "#00d9ff", // Electric Blue
        offwhite: "#f8f9fa",
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        space: ["Space Grotesk", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        'neural-gradient': 'linear-gradient(to right, #ff0080, #ff4da6)',
        'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
      },
    },
  },
  plugins: [],
}
