/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "4xs": ".375rem", // 6px
        "3xs": ".5rem", // 8px
        "2xs": ".625rem", // 10px
        xs: ".75rem", // 12px
        sm: ".875rem", // 14px
        base: "1rem", // 16px
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
        "3xl": "1.875rem", // 30px
        "4xl": "2.25rem", // 36px
        "5xl": "3rem", // 48px
        "6xl": "4rem", // 64px
      },
      backgroundColor: {
        main: "#00c27b",
        accent: "#009961",
        nav: "#444444",
      },
      textColor: {
        body: "#444444",
      },
      fontFamily: {
        body: ["Open Sans", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      fontWeight: {
        hairline: 100,
        thin: 200,
        light: 300,
        book: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
      screens: {
        sm: "568px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      lineHeight: {
        none: 1,
        tight: 1.25,
        snug: 1.375,
        normal: 1.5,
        relaxed: 1.625,
        loose: 2,
      },
      borderWidth: {
        default: "1px",
        0: "0",
        2: "2px",
        4: "4px",
        8: "8px",
      },
      flex_center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
  },
  plugins: [],
};
