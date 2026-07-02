"use client";

export default function Footer() {
  return (
    <footer className="relative z-20 bg-[var(--bg-elevated)] border-t border-[var(--border-subtle)] pt-12 sm:pt-16 pb-6 sm:pb-8 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 sm:mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-h2 tracking-[-0.03em] flex items-center mb-4 sm:mb-5"
            >
              <span className="text-[var(--text-primary)]">SIDDHI</span>
              <span className="text-[var(--accent)]">X</span>
            </a>
            <p className="text-body max-w-sm mb-6">
              Premium AI automation and full-stack development agency building enterprise-grade intelligent systems.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-caption text-[var(--text-primary)] mb-4 sm:mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {["Services", "Portfolio", "Process", "About"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-body text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors font-medium"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-caption text-[var(--text-primary)] mb-4 sm:mb-5">
              Connect
            </h4>
            <ul className="space-y-3">
              {["LinkedIn", "Twitter", "Instagram", "GitHub"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-body text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors font-medium flex items-center gap-1.5 group"
                  >
                    {item}
                    <svg width="10" height="10" viewBox="0 0 14 14" fill="none" className="opacity-0 -translate-x-1 group-hover:opacity-70 group-hover:translate-x-0 transition-all duration-300">
                      <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-row justify-between items-center pt-6 border-t border-[var(--border-subtle)] gap-2 w-full">
          <p className="text-caption text-[var(--text-tertiary)]">
            © {new Date().getFullYear()} SiddhiX Agency.
          </p>
          <div className="flex gap-4 sm:gap-6">
            <a href="#" className="text-caption text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors">
              Privacy
            </a>
            <a href="#" className="text-caption text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>

      {/* Subtle background watermark */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 w-full overflow-hidden pointer-events-none flex justify-center opacity-[0.02]">
        <span className="text-display text-[25vw] leading-none whitespace-nowrap tracking-tighter text-[var(--text-primary)]">
          SIDDHIX
        </span>
      </div>
    </footer>
  );
}
