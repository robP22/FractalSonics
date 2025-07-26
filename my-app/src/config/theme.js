/**
 * Theme configuration for consistent styling across the application
 * This centralizes all design tokens and makes them easily configurable
 */

export const theme = {
  // Grid Configuration
  grid: {
    minItemWidth: '240px',
    gap: '2rem',
    gapMobile: '1.5rem',
    maxWidth: '2200px',
  },
  
  // Breakpoints
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1200px',
    large: '1440px',
  },
  
  // Spacing Scale
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '40px',
  },
  
  // Colors
  colors: {
    primary: '#764ba2',
    primaryLight: 'rgba(118, 75, 162, 0.3)',
    accent: '#007bff',
    accentLight: 'rgba(0, 123, 255, 0.2)',
    text: {
      primary: '#333',
      secondary: '#666',
      white: '#ffffff',
    },
    background: {
      white: '#ffffff',
      light: '#f8f9fa',
      gray: '#f0f0f0',
    },
    border: {
      default: '#e0e0e0',
      hover: '#007bff',
    },
    status: {
      success: '#155724',
      successBg: '#d4edda',
      successBorder: '#c3e6cb',
      error: '#721c24',
      errorBg: '#f8d7da',
      errorBorder: '#f5c6cb',
      warning: '#856404',
      warningBg: '#fff3cd',
      warningBorder: '#ffeaa7',
      info: '#0c5460',
      infoBg: '#d1ecf1',
      infoBorder: '#bee5eb',
    },
  },
  
  // Typography
  typography: {
    fontFamily: {
      primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      display: '"Freeday", "Blackcraft", "Courier New", "Monaco", "Menlo", monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
  },
  
  // Border Radius
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '10px',
    xl: '12px',
  },
  
  // Shadows
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 2px 8px rgba(0, 123, 255, 0.2)',
    lg: '0 4px 16px rgba(0, 0, 0, 0.18)',
    xl: '0 8px 32px rgba(0, 0, 0, 0.12)',
  },
  
  // Transitions
  transitions: {
    fast: 'all 0.2s ease',
    normal: 'all 0.3s ease',
    slow: 'all 0.5s ease',
  },
};

export default theme;