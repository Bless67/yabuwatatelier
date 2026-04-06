// Color Palette Configuration
export const colors = {
  // Primary Colors
  primary: {
    cream: '#E8E4D9',
    darkGreen: '#1a4d3e',
  },

  // Secondary Colors
  secondary: {
    lightSage: '#c5d5cf',
    darkCharcoal: '#2a2a2a',
    warmNeutral: '#a89968',
  },

  // Variants
  variants: {
    forestGreen: '#2d5a52',
    offWhite: '#F5F1E8',
    warmGold: '#b8a876',
  },

  // Functional Colors
  functional: {
    background: '#1a4d3e',
    text: '#E8E4D9',
    textDark: '#2a2a2a',
    accent: '#a89968',
    border: '#c5d5cf',
  },
} 

// Tailwind Color Map (for use in tailwind.config.ts)
export const tailwindColors = {
  cream: colors.primary.cream,
  'dark-green': colors.primary.darkGreen,
  'light-sage': colors.secondary.lightSage,
  'dark-charcoal': colors.secondary.darkCharcoal,
  'warm-neutral': colors.secondary.warmNeutral,
  'forest-green': colors.variants.forestGreen,
  'warm-gold': colors.variants.warmGold,
} 
