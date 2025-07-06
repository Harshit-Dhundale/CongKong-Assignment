/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}" // required for shadcn components
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1F25FF",
        "primary-light": "#4A50FF",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
  safelist: [
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-red-500",
    "bg-purple-500",
  ],
}
