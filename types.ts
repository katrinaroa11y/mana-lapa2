@import "tailwindcss";

@theme {
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;

  --color-sage: #A8C3A1;
  --color-sage-dark: #8BA983;
  --color-sage-light: #C3DAC0;
  --color-cream: #FAF8F2;
  --color-warm-white: #FFFFFF;
  --color-slate: #5E6A71;
  --color-slate-dark: #3E4950;
  --color-slate-light: #7E8C94;
  --color-beige: #E8E1D8;
  --color-beige-light: #F4F0EA;
}

@layer base {
  body {
    font-family: var(--font-sans);
    background-color: var(--color-cream);
    color: var(--color-slate);
  }

  h1, h2, h3, h4, .font-serif {
    font-family: var(--font-serif);
  }
}

/* Glassmorphism helpers */
.glass-panel {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(232, 225, 216, 0.6);
}

.glass-header {
  background: rgba(250, 248, 242, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(232, 225, 216, 0.5);
}

/* Custom subtle scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #FAF8F2;
}
::-webkit-scrollbar-thumb {
  background: #D5CDC0;
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background: #A8C3A1;
}

