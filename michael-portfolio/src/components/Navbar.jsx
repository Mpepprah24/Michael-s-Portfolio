import { useEffect, useState } from 'react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
];

const panelItems = [
  { name: 'Socials', id: 'social' },
  { name: 'Contact', id: 'contact' },
];

export const Navbar = ({ activePanel, onOpenPanel }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);
  const showPanel = (panel) => {
    onOpenPanel(panel);
    closeMenu();
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-300 ${
        isScrolled
          ? 'border-border/60 bg-background/85 py-3 shadow-lg shadow-black/10 backdrop-blur-xl'
          : 'bg-background/65 py-4 backdrop-blur-md'
      }`}
    >
      <nav
        className="container relative flex items-center justify-between gap-6"
        aria-label="Main navigation"
      >
        <a
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground sm:text-xl"
          href="#home"
          onClick={closeMenu}
          aria-label="Michael's Portfolio home"
        >
          <span className="grid size-9 place-items-center rounded-lg border border-primary/40 bg-primary/10 text-primary">
            M
          </span>
          <span>
            Michael<span className="text-primary">.</span>
          </span>
        </a>

        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-3 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-foreground/70 transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              href={item.href}
            >
              {item.name}
            </a>
          ))}
          {panelItems.map((item) => (
            <button
              key={item.id}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                activePanel === item.id ? 'bg-primary/10 text-primary' : 'text-foreground/70'
              }`}
              type="button"
              aria-haspopup="dialog"
              aria-expanded={activePanel === item.id}
              onClick={() => showPanel(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>

        <button
          className="flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:hidden"
          type="button"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <svg
            aria-hidden="true"
            className={`size-5 transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {isMenuOpen ? (
              <path d="m6 6 12 12M18 6 6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
          <span>Menu</span>
        </button>

        <div
          id="mobile-navigation"
          aria-hidden={!isMenuOpen}
          className={`mobile-navigation absolute inset-x-0 top-full border-b border-border/70 bg-background/95 px-4 py-3 shadow-xl backdrop-blur-xl lg:hidden ${
            isMenuOpen ? 'mobile-navigation--open' : ''
          }`}
        >
          <div className="container grid gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                className="rounded-lg px-4 py-3 text-center font-semibold text-foreground/75 transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
                href={item.href}
                onClick={closeMenu}
              >
                {item.name}
              </a>
            ))}
            {panelItems.map((item) => (
              <button
                key={item.id}
                className={`rounded-lg px-4 py-3 text-center font-semibold transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary ${
                  activePanel === item.id ? 'bg-primary/10 text-primary' : 'text-foreground/75'
                }`}
                type="button"
                aria-haspopup="dialog"
                aria-expanded={activePanel === item.id}
                onClick={() => showPanel(item.id)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};
