module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ['"Inconsolata", serif'],
      },
      backgroundImage: {
        desktop: "url('/background/background-desktop.png')",
        tablet: "url('/background/background-tablet.png')",
        mobile: "url('/background/background-mobile.png')",
      },
      colors: {
        neutral: {
          0: "hsl(0, 0%, 100%)",
          3: "hsl(252, 6%, 83%)",
          5: "hsl(245, 15%, 58%)",
          7: "hsl(245, 19%, 35%)",
          9: "hsl(248, 70%, 10%)",
        },
        orange: {
          5: "hsl(7, 88%, 67%)",
          7: "hsl(7, 71%, 60%)",
        },
        textGradient: {
          start: "hsl(7, 86%, 67%)",
          end: "hsl(0, 0%, 100%)",
        },
      },
    },
  },
  plugins: [],
};
