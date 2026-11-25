import { motion, useReducedMotion } from 'motion/react';

const worlds = [
  { id: 'cinema', title: 'Cinema', description: 'A few films I keep coming back to.' },
  { id: 'library', title: 'Library', description: 'My favorite books.' },
  { id: 'gallery', title: 'Gallery', description: 'Sketches, studies, and experiments.' },
];

function DestinationIcon({ destination }) {
  const icon = {
    cinema: (
      <>
        <rect x="4" y="6" width="24" height="20" rx="3" />
        <path d="M4.5 11h23M9 6v5m7-5v5m7-5v5" />
        <path d="m13 14 7 4-7 4z" />
      </>
    ),
    library: (
      <>
        <path d="M5.5 7.5c4.1-.9 7.6-.4 10.5 1.5v17c-2.9-1.9-6.4-2.4-10.5-1.5z" />
        <path d="M26.5 7.5c-4.1-.9-7.6-.4-10.5 1.5v17c2.9-1.9 6.4-2.4 10.5-1.5z" />
        <path d="M9 11c1.7-.2 3.2 0 4.5.6M23 11c-1.7-.2-3.2 0-4.5.6" />
      </>
    ),
    gallery: (
      <>
        <path d="M5 5.5h22v21H5z" />
        <path d="m8.5 22 5.5-7 3.4 4 2.4-2.8 4.2 5.8" />
        <circle cx="11" cy="11" r="1.5" />
      </>
    ),
  }[destination];

  return (
    <span className="portfolio-lobby__icon" aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none">{icon}</svg>
    </span>
  );
}

function WorldCard({ world, onEnter, buttonRef, active, index }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      ref={buttonRef}
      className="portfolio-worlds__card"
      type="button"
      aria-haspopup="dialog"
      aria-expanded={active}
      aria-label={`${world.title}. ${world.description}`}
      onClick={() => onEnter(world.id)}
      whileHover={reduceMotion ? undefined : { y: -5 }}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
    >
      <span className="portfolio-lobby__destination-top">
        <DestinationIcon destination={world.id} />
        <span className="portfolio-lobby__index">
          {String(index + 1).padStart(2, '0')}
        </span>
      </span>
      <span className="portfolio-worlds__title">{world.title}</span>
      <span className="portfolio-worlds__description">{world.description}</span>
      <span className="portfolio-lobby__enter" aria-hidden="true">Enter <span>↗</span></span>
    </motion.button>
  );
}

export function PortfolioLobby({ onOpenPanel }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.header
      id="home"
      className="portfolio-lobby"
      aria-labelledby="portfolio-home-title"
      initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: reduceMotion ? 0.01 : 1.2, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="portfolio-lobby__atmosphere" aria-hidden="true" />
      <div className="portfolio-lobby__content">
        <motion.p
          className="portfolio-lobby__eyebrow"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6, delay: reduceMotion ? 0 : 0.25 }}
        >
          HUMAN-CENTERED DESIGN & DEVELOPMENT
        </motion.p>
        <motion.h1
          id="portfolio-home-title"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.7, delay: reduceMotion ? 0 : 0.38 }}
        >
          Michael <span>Pepprah</span>
        </motion.h1>
        <motion.p
          className="portfolio-lobby__invitation"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.7, delay: reduceMotion ? 0 : 0.55 }}
        >
          Design, product thinking, and development, built around people.
        </motion.p>

        <div className="portfolio-lobby__actions">
          <button
            className="portfolio-lobby__primary-action"
            type="button"
            onClick={(event) => onOpenPanel('contact', event.currentTarget)}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3.5" y="5" width="17" height="14" rx="2" />
              <path d="m4.5 7 7.5 6 7.5-6" />
            </svg>
            Get in touch
            <span aria-hidden="true">↗</span>
          </button>
          <button
            className="portfolio-lobby__secondary-action"
            type="button"
            onClick={(event) => onOpenPanel('social', event.currentTarget)}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="6" cy="12" r="2" />
              <circle cx="18" cy="6" r="2" />
              <circle cx="18" cy="18" r="2" />
              <path d="m7.8 11 8.3-4m-8.3 6 8.3 4" />
            </svg>
            Socials
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
      <nav className="portfolio-lobby__section-nav" aria-label="Portfolio sections">
        <a href="#about"><span>01</span> About me</a>
        <a href="#projects"><span>02</span> Projects</a>
        <a href="#skills"><span>03</span> Skills & tools</a>
      </nav>
    </motion.header>
  );
}

export function PortfolioWorlds({ activeScene, onEnter, worldRefs }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      className="portfolio-worlds"
      aria-labelledby="portfolio-worlds-title"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.12 }}
    >
      <div className="portfolio-worlds__heading">
        <p className="social-contact__eyebrow">A LITTLE MORE PERSONAL</p>
        <h2 id="portfolio-worlds-title">Beyond the portfolio.</h2>
      </div>
      <div className="portfolio-worlds__grid" role="group" aria-label="Explore personal interests">
        {worlds.map((world, index) => (
          <WorldCard
            key={world.id}
            world={world}
            index={index}
            onEnter={onEnter}
            buttonRef={worldRefs[world.id]}
            active={activeScene === world.id}
          />
        ))}
      </div>
    </motion.section>
  );
}
