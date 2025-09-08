import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Hackathon Theme Colors
        ribbon: {
          DEFAULT: "hsl(var(--ribbon-red))",
          dark: "hsl(var(--ribbon-dark))",
        },
        gold: {
          primary: "hsl(var(--gold-primary))",
          secondary: "hsl(var(--gold-secondary))",
          accent: "hsl(var(--gold-accent))",
        },
        space: {
          blue: "hsl(var(--space-blue))",
          purple: "hsl(var(--space-purple))",
        },
        star: "hsl(var(--star-white))",
        glow: {
          primary: "hsl(var(--glow-primary))",
          secondary: "hsl(var(--glow-secondary))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        // Hackathon Animations
        "ribbon-cut-left": {
          "0%": { transform: "translateX(0) rotate(0deg)" },
          "100%": { transform: "translateX(-200px) rotate(-15deg)", opacity: "0" },
        },
        "ribbon-cut-right": {
          "0%": { transform: "translateX(0) rotate(0deg)" },
          "100%": { transform: "translateX(200px) rotate(15deg)", opacity: "0" },
        },
        "letter-fly-in": {
          "0%": { 
            transform: "translateY(var(--random-y, -200px)) translateX(var(--random-x, 0)) rotate(var(--random-rot, 0deg)) scale(0.5)",
            opacity: "0",
            filter: "blur(10px)"
          },
          "30%": {
            transform: "translateY(calc(var(--random-y, -200px) * 0.3)) translateX(calc(var(--random-x, 0) * 0.7)) rotate(calc(var(--random-rot, 0deg) * 0.5)) scale(0.8)",
            opacity: "0.3",
            filter: "blur(5px)"
          },
          "70%": {
            transform: "translateY(calc(var(--bounce-height, 50px) * -0.3)) translateX(0) rotate(0deg) scale(1.1)",
            opacity: "0.8",
            filter: "blur(2px)"
          },
          "85%": {
            transform: "translateY(0) translateX(0) rotate(0deg) scale(0.95)",
            opacity: "0.9",
            filter: "blur(1px)"
          },
          "100%": { 
            transform: "translateY(0) translateX(0) rotate(0deg) scale(1)",
            opacity: "1",
            filter: "blur(0px)"
          },
        },
        "letter-scatter": {
          "0%": { 
            transform: "translateY(var(--random-y, -300px)) translateX(var(--random-x, 0)) rotate(var(--random-rot, 0deg)) scale(0.3)",
            opacity: "0",
            filter: "blur(15px)"
          },
          "20%": {
            transform: "translateY(calc(var(--random-y, -300px) * 0.6)) translateX(calc(var(--random-x, 0) * 0.8)) rotate(calc(var(--random-rot, 0deg) * 0.7)) scale(0.6)",
            opacity: "0.4",
            filter: "blur(8px)"
          },
          "60%": {
            transform: "translateY(calc(var(--bounce-height, 50px) * -0.5)) translateX(calc(var(--random-x, 0) * 0.2)) rotate(calc(var(--random-rot, 0deg) * 0.2)) scale(1.2)",
            opacity: "0.8",
            filter: "blur(3px)"
          },
          "80%": {
            transform: "translateY(calc(var(--bounce-height, 50px) * -0.1)) translateX(0) rotate(0deg) scale(0.95)",
            opacity: "0.95",
            filter: "blur(1px)"
          },
          "100%": { 
            transform: "translateY(0) translateX(0) rotate(0deg) scale(1)",
            opacity: "1",
            filter: "blur(0px)"
          },
        },
        "letter-split-left": {
          "0%": { transform: "translateX(0) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateX(-100vw) rotate(-45deg)", opacity: "0" },
        },
        "letter-split-right": {
          "0%": { transform: "translateX(0) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateX(100vw) rotate(45deg)", opacity: "0" },
        },
        "letter-split-center": {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(-50vh) rotate(0deg)", opacity: "0" },
        },
        "particle-burst": {
          "0%": { 
            transform: "translate(-50%, -50%) scale(0)",
            opacity: "1"
          },
          "50%": { 
            transform: "translate(calc(-50% + var(--burst-x, 0)), calc(-50% + var(--burst-y, 0))) scale(1)",
            opacity: "0.8"
          },
          "100%": { 
            transform: "translate(calc(-50% + var(--burst-x, 0)), calc(-50% + var(--burst-y, 0))) scale(0)",
            opacity: "0"
          },
        },
        "golden-glow": {
          "0%": { 
            textShadow: "0 0 10px hsl(var(--gold-primary)), 0 0 20px hsl(var(--gold-primary)), 0 0 30px hsl(var(--gold-primary))",
            filter: "brightness(1.2)"
          },
          "50%": { 
            textShadow: "0 0 20px hsl(var(--gold-accent)), 0 0 40px hsl(var(--gold-accent)), 0 0 60px hsl(var(--gold-accent))",
            filter: "brightness(1.5)"
          },
          "100%": { 
            textShadow: "0 0 10px hsl(var(--gold-primary)), 0 0 20px hsl(var(--gold-primary)), 0 0 30px hsl(var(--gold-primary))",
            filter: "brightness(1.2)"
          },
        },
        "shine-sweep": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "space-warp": {
          "0%": { 
            transform: "scale(1) rotateZ(0deg)",
            opacity: "0"
          },
          "50%": {
            transform: "scale(1.5) rotateZ(180deg)",
            opacity: "1"
          },
          "100%": { 
            transform: "scale(50) rotateZ(360deg)",
            opacity: "0"
          },
        },
        "star-zoom": {
          "0%": { 
            transform: "scale(0) translateZ(0px)",
            opacity: "1"
          },
          "100%": { 
            transform: "scale(1) translateZ(1000px)",
            opacity: "0"
          },
        },
        "warp-tunnel": {
          "0%": { 
            transform: "scale(0)",
            opacity: "0"
          },
          "50%": {
            opacity: "1"
          },
          "100%": { 
            transform: "scale(100)",
            opacity: "0"
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Hackathon Animations
        "ribbon-cut-left": "ribbon-cut-left 0.8s ease-in-out forwards",
        "ribbon-cut-right": "ribbon-cut-right 0.8s ease-in-out forwards",
        "letter-fly-in": "letter-fly-in 1.2s ease-out forwards",
        "letter-scatter": "letter-scatter 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "letter-split-left": "letter-split-left 1s ease-in forwards",
        "letter-split-right": "letter-split-right 1s ease-in forwards", 
        "letter-split-center": "letter-split-center 1s ease-in forwards",
        "particle-burst": "particle-burst 1.5s ease-out forwards",
        "golden-glow": "golden-glow 2s ease-in-out infinite",
        "shine-sweep": "shine-sweep 1.5s ease-in-out infinite",
        "space-warp": "space-warp 2s ease-in-out forwards",
        "star-zoom": "star-zoom 2s linear infinite",
        "warp-tunnel": "warp-tunnel 2s ease-in-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
