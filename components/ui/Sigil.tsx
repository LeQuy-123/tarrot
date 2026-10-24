/** The Archive's eight-pointed sigil, used as logo and ornament. */
export function Sigil({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" fill="none" stroke="currentColor">
      <circle cx="32" cy="32" r="29" strokeWidth="1.2" />
      <circle cx="32" cy="32" r="22" strokeWidth="0.8" strokeDasharray="1.5 2.5" />
      <path
        d="M32 6 L36 28 L58 32 L36 36 L32 58 L28 36 L6 32 L28 28 Z"
        strokeWidth="1.4"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path d="M32 14 L34.5 29.5 L50 32 L34.5 34.5 L32 50 L29.5 34.5 L14 32 L29.5 29.5 Z" strokeWidth="0.8" transform="rotate(45 32 32)" />
      <circle cx="32" cy="32" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Ornament({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 16" className={className} aria-hidden="true" fill="none" stroke="currentColor">
      <path d="M0 8 H100" strokeWidth="0.8" />
      <path d="M140 8 H240" strokeWidth="0.8" />
      <path d="M120 1 L127 8 L120 15 L113 8 Z" strokeWidth="1" />
      <circle cx="104" cy="8" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="136" cy="8" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
