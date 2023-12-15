/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
         "../../packages/ui/**/*{.js,.ts,.jsx,.tsx}",
    ],
    theme: {
        extend: {}, 
    },
    plugins: [],
}

