/**
 * PM2 — site estático (Vite build em /dist).
 * Uso: npm run build && pm2 start ecosystem.config.cjs
 */
module.exports = {
  apps: [
    {
      name: 'stiffer',
      cwd: __dirname,
      script: 'npm',
      args: 'run start',
      interpreter: 'none',
      autorestart: true,
      watch: false,
      max_memory_restart: '200M',
      // PORT alinhado com script "start" em package.json (>6000)
      env: {
        NODE_ENV: 'production',
        PORT: '6173',
      },
    },
  ],
}
