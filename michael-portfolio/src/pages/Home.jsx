import { LayoutGroup } from 'motion/react';
import { createPortal } from 'react-dom';
import { useRef, useState } from 'react';
import AnimatedBackground from '../components/AnimatedBackground';
import { AboutSection } from '../components/AboutSection';
import { ArtGallery } from '../components/ArtGallery';
import { BookLibrary } from '../components/BookLibrary';
import { MovieTheater } from '../components/MovieTheater';
import { PortfolioLobby, PortfolioWorlds } from '../components/PortfolioLobby';
import { Projects } from '../components/Projects';
import { SkillsShowcase } from '../components/SkillsShowcase';

const socialLinks = [
  { label: 'Goodreads', href: 'https://www.goodreads.com/user/show/140373436-michael-pepprah', icon: 'goodreads', actionLabel: 'View profile', description: 'Track books, discover recommendations, and share reviews with other readers.' },
  { label: 'Comic Geeks', href: 'https://leagueofcomicgeeks.com/profile/mpepp24', icon: 'comic-geeks', actionLabel: 'View profile', description: 'Explore a comic-book community, catalog a collection, and manage a weekly pull list.' },
  { label: 'Serializd', href: 'https://www.serializd.com/user/MPepp24/profile', icon: 'serializd', actionLabel: 'View profile', description: 'A social TV diary for tracking shows and episodes, with ratings and reviews.' },
  { label: 'Letterboxd', href: 'https://letterboxd.com/MovieLover546/', icon: 'letterboxd', actionLabel: 'View profile', description: 'A social film diary for logging movies, rating and reviewing them, and exploring lists.' },
  { label: 'Art Instagram', href: 'https://www.instagram.com/mike._art345/', icon: 'instagram', actionLabel: 'View profile', description: 'A visual social network where I share my artwork and creative projects.' },
];

const contactLinks = [
  { label: 'Email', href: 'mailto:mpepprah24@gmail.com', icon: 'email', detail: 'mpepprah24@gmail.com', actionLabel: 'Send email', description: 'Opens an email so you can contact me directly about opportunities, collaborations, or questions.' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/michael-pepprah/', icon: 'linkedin', actionLabel: 'View profile', description: 'A professional network to explore my experience, skills, and career connections.' },
  { label: 'GitHub', href: 'https://github.com/Mpepprah24', icon: 'github', actionLabel: 'View profile', description: 'A developer platform where I share code repositories, projects, and development work.' },
];

const officialIcons = {
  goodreads: '/assets/social-icons/goodreads.svg',
  'comic-geeks': '/assets/social-icons/comic-geeks.png',
  serializd: '/assets/social-icons/serializd.svg',
  letterboxd: '/assets/social-icons/letterboxd.svg',
  instagram: '/assets/social-icons/instagram.svg',
};

const SiteIcon = ({ type }) => {
  if (officialIcons[type]) {
    return <img className="site-icon" src={officialIcons[type]} alt="" aria-hidden="true" />;
  }

  const commonProps = {
    'aria-hidden': true,
    className: `site-icon site-icon--${type}`,
    viewBox: '0 0 32 32',
  };

  if (type === 'email') {
    return (
      <svg {...commonProps}>
        <rect x="4" y="7" width="24" height="18" rx="3" />
        <path d="m5 9 11 9 11-9" />
      </svg>
    );
  }

  if (type === 'linkedin') {
    return (
      <svg {...commonProps}>
        <rect x="4" y="4" width="24" height="24" rx="5" />
        <path className="site-icon__letters" d="M10 14v9m0-13v.1M15 23v-9m0 4a4 4 0 0 1 8 0v5" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <use href="/icons.svg#github-icon" x="3" y="3" width="26" height="26" />
    </svg>
  );
};

const LinkList = ({ links }) => (
  <ul className="contact-link-list">
    {links.map(({ label, href, icon, detail, actionLabel, description }) => {
      const tooltipId = `contact-link-tooltip-${icon}`;

      return (
        <li key={label}>
          <a
            className="contact-link"
            href={href}
            target={href.startsWith('mailto:') ? undefined : '_blank'}
            rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
            aria-describedby={tooltipId}
          >
            <SiteIcon type={icon} />
            <span className="contact-link__text">
              <span className="contact-link__name">{label}</span>
              {detail && <span className="contact-link__detail">{detail}</span>}
            </span>
            <span className="contact-link__action">{actionLabel}</span>
            <span className="contact-link__tooltip" id={tooltipId} role="tooltip">
              {description}
            </span>
          </a>
        </li>
      );
    })}
  </ul>
);

const SocialContactDialog = ({ activePanel, onClose, onSelectPanel }) => {
  const closeButtonRef = useRef(null);
  const tabRefs = useRef([]);

  const tabs = [
    {
      id: 'contact',
      label: 'Contact',
      title: 'Let’s make something useful.',
      links: contactLinks,
    },
    {
      id: 'social',
      label: 'Socials',
      title: 'Follow what I’m exploring.',
      links: socialLinks,
    },
  ];
  const activeTab = tabs.find((tab) => tab.id === activePanel);

  if (!activeTab) return null;

  const handleKeyDown = (event) => {
    if (
      event.target.getAttribute('role') === 'tab'
      && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')
    ) {
      event.preventDefault();
      const currentIndex = tabs.findIndex((tab) => tab.id === activePanel);
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const nextIndex = (currentIndex + direction + tabs.length) % tabs.length;
      const nextTab = tabs[nextIndex];
      onSelectPanel(nextTab.id);
      window.requestAnimationFrame(() => tabRefs.current[nextIndex]?.focus());
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusable = Array.from(
      event.currentTarget.querySelectorAll(
        'button:not([disabled]):not([tabindex="-1"]), a[href]',
      ),
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  return createPortal(
    <div
      className="social-contact__backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={handleKeyDown}
    >
      <section
        className="social-contact__dialog"
        id="social-contact-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="social-contact-title"
      >
        <button
          className="social-contact__close"
          type="button"
          aria-label="Close panel"
          ref={closeButtonRef}
          autoFocus
          onClick={onClose}
        >
          ×
        </button>
        <p className="social-contact__eyebrow">CONNECT / MICHAEL PEPPRAH</p>
        <div className="social-contact__tabs" role="tablist" aria-label="Contact and social links">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`social-contact-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={activePanel === tab.id}
              aria-controls="social-contact-panel"
              tabIndex={activePanel === tab.id ? 0 : -1}
              onClick={() => onSelectPanel(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div
          id="social-contact-panel"
          className="social-contact__tabpanel"
          role="tabpanel"
          aria-labelledby={`social-contact-tab-${activeTab.id}`}
        >
          <h2 id="social-contact-title">{activeTab.title}</h2>
          <LinkList links={activeTab.links} />
        </div>
      </section>
    </div>,
    document.body,
  );
};

export const Home = () => {
  const [activePanel, setActivePanel] = useState(null);
  const [activeScene, setActiveScene] = useState(null);
  const cinemaTriggerRef = useRef(null);
  const libraryTriggerRef = useRef(null);
  const galleryTriggerRef = useRef(null);
  const panelTriggerRef = useRef(null);
  const destinationRefs = {
    cinema: cinemaTriggerRef,
    library: libraryTriggerRef,
    gallery: galleryTriggerRef,
  };
  const leaveScene = () => {
    setActivePanel(null);
    setActiveScene(null);
  };
  const openPanel = (panel, trigger) => {
    panelTriggerRef.current = trigger;
    setActivePanel(panel);
  };
  const closePanel = () => {
    setActivePanel(null);
    window.requestAnimationFrame(() => panelTriggerRef.current?.focus());
  };

  return (
    <div className="home-page min-h-screen">
      <AnimatedBackground />
      <LayoutGroup id="portfolio-worlds">
        <PortfolioLobby onOpenPanel={openPanel} />
        <main className="portfolio-content" aria-label="Portfolio">
          <AboutSection />
          <Projects />
          <section id="skills" className="home-skills container" aria-labelledby="skills-title">
            <div className="home-section-heading home-skills__heading">
              <p className="social-contact__eyebrow">HOW I WORK</p>
              <h2 id="skills-title">From user needs to useful experiences.</h2>
            </div>
            <SkillsShowcase />
          </section>
          <PortfolioWorlds
            activeScene={activeScene}
            onEnter={setActiveScene}
            worldRefs={destinationRefs}
          />
        </main>
        <MovieTheater
          isOpen={activeScene === 'cinema'}
          onClose={leaveScene}
          onExitComplete={() => cinemaTriggerRef.current?.focus()}
        />
        <BookLibrary
          isOpen={activeScene === 'library'}
          onClose={leaveScene}
          onExitComplete={() => libraryTriggerRef.current?.focus()}
        />
        <ArtGallery
          isOpen={activeScene === 'gallery'}
          onClose={leaveScene}
          onExitComplete={() => galleryTriggerRef.current?.focus()}
        />
      </LayoutGroup>
      <SocialContactDialog
        activePanel={activePanel}
        onClose={closePanel}
        onSelectPanel={setActivePanel}
      />
    </div>
  );
};