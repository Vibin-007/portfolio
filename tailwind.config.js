/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                paper: '#ffffff', // Pure White
                ink: '#2d2d2d', // Soft Pencil Black
                muted: '#e5e0d8', // Old Paper / Erased Pencil
                accent: '#ff4d4d', // Red Correction Marker
                secondary: '#2d5da1', // Blue Ballpoint Pen
            },
            fontFamily: {
                heading: ['Kalam', 'cursive'],
                body: ['Patrick Hand', 'cursive'],
            },
            boxShadow: {
                'hard': '4px 4px 0px 0px #2d2d2d',
                'hard-lg': '8px 8px 0px 0px #2d2d2d',
                'hard-sm': '2px 2px 0px 0px #2d2d2d',
            },
            borderRadius: {
                'wobbly': '255px 15px 225px 15px / 15px 225px 15px 255px',
                'wobbly-md': '25px 10px 35px 5px / 15px 25px 10px 20px',
                'wobbly-sm': '15px 5px 20px 2px / 5px 15px 5px 10px',
            }
        },
    },
    plugins: [],
}
