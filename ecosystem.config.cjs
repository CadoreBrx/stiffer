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
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
