/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: "#362F78",
        secondary: "#10b981",
        accent: "#f59e0b",
        muted: "#6b7280",

        // UI text colors
        NavigationMenu: "#D1D5DB",
        NavigationMenuHover: "#1f293d", 
        iconColour: "#1f293d", 
        muted: "#9ca3af", // gray-400
        subtle: "#f3f4f6", // gray-100

        // Status colors
        success: "#22c55e", // green-500
        error: "#ef4444", // red-500
        warning: "#f97316", // orange-500
        info: "#3b82f6", // blue-500
      },
    },
  },
  plugins: [],
};
