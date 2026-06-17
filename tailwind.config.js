export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        surface: '#0f172a',
        soft: '#1e293b',
        glow: '#38bdf8',
        accent: '#818cf8',
      },
      boxShadow: {
        'glow-soft': '0 24px 64px rgba(56, 189, 248, 0.14), 0 12px 28px rgba(15, 23, 42, 0.18)',
        'pro-card': '0 18px 60px rgba(15, 23, 42, 0.16), 0 4px 20px rgba(56, 189, 248, 0.08)',
        'pro-hover': '0 28px 72px rgba(56, 189, 248, 0.16), 0 12px 32px rgba(15, 23, 42, 0.2)',
        'soft-glow': '0 0 0 1px rgba(255,255,255,0.04), 0 22px 48px rgba(15,23,42,0.18)',
      },
      blur: {
        soft: '30px',
      },
      backgroundImage: {
        'glow-border': 'radial-gradient(circle at top left, rgba(56, 189, 248, 0.35), transparent 35%), radial-gradient(circle at bottom right, rgba(129, 140, 248, 0.24), transparent 35%)',
      },
      boxShadowColor: {
        cyanGlow: 'rgba(56, 189, 248, 0.28)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        premium: '280ms',
      },
      animation: {
        'fade-slide': 'fadeSlide 0.45s ease-out both',
      },
      keyframes: {
        fadeSlide: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
