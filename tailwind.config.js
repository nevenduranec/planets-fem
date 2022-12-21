/** @type {import("tailwindcss").Config} */
module.exports = {
    content: ['./src/**/*.{html,js}', './index.html'],
    theme: {
        extend: {
            gridTemplateColumns: {
                main: 'minmax(0, 1fr) 350px',
            },
        },
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
        fontSize: {
            sm: '0.8rem',
            base: '1rem',
            xl: '1.25rem',
            '2xl': '1.563rem',
            '3xl': '1.953rem',
            '4xl': '2.441rem',
            '5xl': '3.052rem',
        },
        screens: {
            main: '686px',
            md: '768px',
            'max-md': { max: '768px' },
            lg: '1024px',
            xl: '1440px',
        },
    },
    plugins: [],
};
