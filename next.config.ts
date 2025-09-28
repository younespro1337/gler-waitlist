// Next.js config tuned for Windows dev stability
const nextConfig = {
  // Move build artifacts out of .next to avoid tooling that interferes
  // with dot-directories on Windows. This mitigates ENOENT races
  // like `.next/static/development/_buildManifest.js.tmp.*`.
  distDir: 'build',

  // Improve file watching reliability on some Windows setups by using polling.
  // This helps avoid transient rebuild errors during rapid HMR updates.
  webpackDevMiddleware: (config: any) => {
    config.watchOptions = {
      ...(config.watchOptions || {}),
      poll: 1000,
      aggregateTimeout: 300,
      ignored: ['**/.git/**', '**/node_modules/**']
    };
    return config;
  },
};

export default nextConfig;
