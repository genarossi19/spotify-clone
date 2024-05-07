// global.d.ts

// Declara que API_KEY es una variable global
declare global {
    interface Window {
      VITE_API_KEY: string;
    }
  }
// Tu script para definir API_KEY
window.VITE_API_KEY = "<%= process.env.VITE_API_KEY %>";  