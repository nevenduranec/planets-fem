/** @type {import("tailwindcss").Config} */
module.exports = {
    content: [
        "./src/**/*.{html,js}",
        "./index.html"
    ],
    theme: {
        colors: {
            transparent: "transparent",
            current: "currentColor",
            "cyan": "hsl(158, 36%, 37%)",
            "cyan-dark": "hsl(158, 36%, 15%)",
            "cream": "hsl(30, 38%, 92%)",
            "blue": "hsl(212, 21%, 14%)",
            "blue-gray": "hsl(228, 12%, 48%)",
            "white": "hsl(0, 0%, 100%)"
        },
        fontFamily: {
            'montserrat': ["'Montserrat'", "sans-serif"],
            'fraunces': ["'Fraunces'", "serif"]
        },
        screens: {
            'main': '686px',
        },
    },
    plugins: []
};
