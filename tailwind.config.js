/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
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
      fontFamily: {
        'heading': ['Playfair Display', 'serif'],
        'body': ['Source Sans Pro', 'sans-serif'],
        'caption': ['Inter', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        border: "var(--color-border)", /* minimal border */
        input: "var(--color-input)", /* subtle cream */
        ring: "var(--color-ring)", /* warm saddle brown */
        background: "var(--color-background)", /* warm off-white */
        foreground: "var(--color-foreground)", /* rich dark brown */
        primary: {
          DEFAULT: "var(--color-primary)", /* warm saddle brown */
          foreground: "var(--color-primary-foreground)", /* warm off-white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* complementary chocolate */
          foreground: "var(--color-secondary-foreground)", /* warm off-white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* muted red */
          foreground: "var(--color-destructive-foreground)", /* warm off-white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* subtle cream */
          foreground: "var(--color-muted-foreground)", /* medium brown */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* vibrant coral */
          foreground: "var(--color-accent-foreground)", /* warm off-white */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* warm off-white */
          foreground: "var(--color-popover-foreground)", /* rich dark brown */
        },
        card: {
          DEFAULT: "var(--color-card)", /* subtle cream */
          foreground: "var(--color-card-foreground)", /* rich dark brown */
        },
        success: {
          DEFAULT: "var(--color-success)", /* forest green */
          foreground: "var(--color-success-foreground)", /* warm off-white */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* golden yellow */
          foreground: "var(--color-warning-foreground)", /* rich dark brown */
        },
        error: {
          DEFAULT: "var(--color-error)", /* muted red */
          foreground: "var(--color-error-foreground)", /* warm off-white */
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        'warm-sm': '0 1px 2px rgba(139, 69, 19, 0.1)',
        'warm': '0 2px 4px rgba(139, 69, 19, 0.1)',
        'warm-md': '0 4px 8px rgba(139, 69, 19, 0.1)',
        'warm-lg': '0 8px 16px rgba(139, 69, 19, 0.1)',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
        '600': '600ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}