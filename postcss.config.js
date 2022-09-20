module.exports = {
    plugins: {
        "postcss-preset-env": {
            stage: 0,
            features: {
                "logical-properties-and-values":
                    false,
                "prefers-color-scheme-query":
                    false,
                "gap-properties":
                    false,
                "custom-properties":
                    false,
                "dir-pseudo-class":
                    false,
                "focus-within-pseudo-class":
                    false,
                "focus-visible-pseudo-class":
                    false,
                "color-functional-notation":
                    false,
                "nesting-rules":
                    false
            }
        },
        "tailwindcss/nesting": {},
        tailwindcss: {},
        autoprefixer: {},
        ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
    }
};
