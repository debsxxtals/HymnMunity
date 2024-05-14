import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        screen: resolve(__dirname, 'src/logo.html'),
        main: resolve(__dirname, 'src/index.html'),
        register: resolve(__dirname, 'src/register.html'),
        dashboard: resolve(__dirname, 'src/dashboard.html'),
        song: resolve(__dirname, 'src/song.html'),
        chatbox: resolve(__dirname, 'src/chatbox.html'),
        profile: resolve(__dirname, 'src/profile.html'),
        schedule: resolve(__dirname, 'src/tryschedule.html'), 
        attendance: resolve(__dirname, 'src/attendance.html')
      },
    }
  },
});
