'use client';
import { useEffect, useState, useRef } from 'react';

/**
 * ClientHtmlContent - Prevents hydration errors from third-party scripts
 *
 * This component ensures that HTML content with external scripts (like Typeform,
 * Calendly, etc.) only renders on the client side, preventing hydration mismatches
 * caused by scripts that modify the DOM after initial render.
 */
export function ClientHtmlContent({ html, className = '', style = {} }) {
  const [isClient, setIsClient] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && ref.current && html) {
      // Clear and re-insert HTML on client side to avoid hydration issues
      ref.current.innerHTML = html;
    }
  }, [isClient, html]);

  // Render empty div on server and let client-side effect populate it
  return (
    <div
      ref={ref}
      className={className}
      style={style}
      suppressHydrationWarning
    />
  );
}
