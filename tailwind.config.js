/** @type {import("tailwindcss").Config} */
module.exports = {
    content: ['./src/**/*.{html,js}', './index.html'],
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            white: 'hsl(0, 0%, 100%)',
            mercury: 'hsl(194, 48%, 49%)',
            venus: 'hsl(33, 82%, 61%)',
            earth: 'hsl(263, 67%, 51%)',
            mars: 'hsl(10, 63%, 51%)',
            jupiter: 'hsl(2, 68%, 53%)',
            saturn: 'hsl(17, 73%, 46%)',
            uranus: 'hsl(169, 73%, 44%)',
            neptune: 'hsl(222, 87%, 56%)',
            gray: 'hsl(240, 17%, 26%)',
            grayLite: 'hsl(240, 6%, 54%)',
            dark: 'hsl(240, 67%, 8%)',
        },
        fontFamily: {
            antonio: ["'Antonio'", 'sans-serif'],
            spartan: ["'Spartan'", 'sans-serif'],
        },
        screens: {
            main: '686px',
        },
    },
    plugins: [],
};
