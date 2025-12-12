// instrumentation.js
// Runs once when the server starts - patches fetch to remove undefined headers
// Fixes Netlify "Cannot read properties of undefined (reading 'toString')" error

export async function register() {
  // Only patch on the server (not edge runtime)
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const originalFetch = globalThis.fetch;

    globalThis.fetch = async function patchedFetch(url, options = {}) {
      if (options && options.headers) {
        const cleanHeaders = {};

        // Handle Headers object
        if (options.headers instanceof Headers) {
          for (const [key, value] of options.headers.entries()) {
            if (value !== undefined && value !== null) {
              cleanHeaders[key] = value;
            }
          }
        }
        // Handle plain object
        else if (typeof options.headers === 'object') {
          for (const [key, value] of Object.entries(options.headers)) {
            if (value !== undefined && value !== null) {
              cleanHeaders[key] = String(value);
            }
          }
        }

        options = { ...options, headers: cleanHeaders };
      }

      return originalFetch.call(this, url, options);
    };

    console.log('[instrumentation] Patched fetch to sanitize undefined headers');
  }
}
