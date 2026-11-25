import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react';

const movies = [
  {
    id: 'whiplash',
    title: 'Whiplash',
    poster: '/assets/movies/whiplash.jpg',
    director: 'Damien Chazelle',
    year: '2014',
    runtime: '1h 47m',
    genre: 'Drama · Music',
    rating: 'R',
    summary: 'An ambitious young drummer pushes himself to extremes under the eye of a demanding conservatory instructor.',
    personalNote: 'I like its look at pressure and mentorship; HCDD considers how systems affect people’s well-being.',
  },
  {
    id: 'training-day',
    title: 'Training Day',
    poster: '/assets/movies/training-day.jpg',
    director: 'Antoine Fuqua',
    year: '2001',
    runtime: '2h 2m',
    genre: 'Crime · Thriller',
    rating: 'R',
    summary: 'A rookie officer spends his first day riding with a veteran whose methods test the line between policing and corruption.',
    personalNote: 'I like its moral tension; HCDD asks how decisions and systems affect people.',
  },
  {
    id: 'ran',
    title: 'Ran',
    poster: '/assets/movies/ran.jpg',
    director: 'Akira Kurosawa',
    year: '1985',
    runtime: '2h 42m',
    genre: 'Historical · Drama',
    rating: 'R',
    summary: 'An aging warlord divides his lands among his sons, setting a vast and tragic struggle in motion.',
    personalNote: 'I like its striking visuals and family conflict; HCDD considers the human cost of decisions.',
  },
  {
    id: 'spider-verse',
    title: 'Spider-Verse Films',
    poster: '/assets/movies/spider-verse.jpg',
    director: 'Multiple directors',
    year: '2018–2023',
    runtime: '4h 17m',
    genre: 'Animation · Superhero',
    rating: 'PG',
    summary: 'Two animated adventures bring different Spider-heroes together across a lively, ever-expanding multiverse.',
    personalNote: 'I like its different heroes and art styles; HCDD makes room for diverse perspectives.',
  },
  {
    id: 'spirited-away',
    title: 'Spirited Away',
    poster: '/assets/movies/spirited-away.jpg',
    director: 'Hayao Miyazaki',
    year: '2001',
    runtime: '2h 5m',
    genre: 'Animation · Fantasy',
    rating: 'PG',
    summary: 'Trapped in a world of spirits, Chihiro takes a job at a bathhouse while searching for a way to save her parents.',
    personalNote: 'I like Chihiro’s growth; HCDD values understanding a person’s journey through an unfamiliar system.',
  },
  {
    id: 'do-the-right-thing',
    title: 'Do the Right Thing',
    poster: '/assets/movies/do-the-right-thing.jpg',
    director: 'Spike Lee',
    year: '1989',
    runtime: '2h',
    genre: 'Drama · Comedy',
    rating: 'R',
    summary: 'On a sweltering Brooklyn block, one summer day brings questions of race, community, and responsibility to a head.',
    personalNote: 'I like its focus on community; HCDD starts by listening to the people most affected.',
  },
  {
    id: 'lord-of-the-rings',
    title: 'The Lord of the Rings Trilogy',
    poster: '/assets/movies/lord-of-the-rings-trilogy.png',
    director: 'Peter Jackson',
    year: '2001–2003',
    runtime: '9h 18m',
    genre: 'Fantasy · Adventure',
    rating: 'PG-13',
    summary: 'A hobbit and his companions carry a powerful ring across Middle-earth to keep it from returning to its maker.',
    personalNote: 'I like the loyalty and teamwork; HCDD benefits from collaboration and shared purpose.',
  },
  {
    id: 'the-dark-knight',
    title: 'The Dark Knight',
    poster: '/assets/movies/the-dark-knight.jpg',
    director: 'Christopher Nolan',
    year: '2008',
    runtime: '2h 32m',
    genre: 'Action · Crime · Drama',
    rating: 'PG-13',
    summary: 'Batman faces the Joker as Gotham struggles with fear, justice, and difficult choices.',
    personalNote: 'I like its complex choices; HCDD asks us to consider how solutions affect everyone involved.',
  },
  {
    id: 'dune-films',
    title: 'Dune: Parts One & Two',
    poster: '/assets/movies/dune-films.jpg',
    director: 'Denis Villeneuve',
    year: '2021–2024',
    runtime: '5h 21m',
    genre: 'Science fiction · Adventure',
    rating: 'PG-13',
    summary: 'Paul Atreides joins the Fremen on Arrakis as rival forces fight over the planet and its future.',
    personalNote: 'I like its detailed worlds; HCDD begins by understanding a community and its environment.',
  },
  {
    id: 'sam-raimi-spider-man',
    title: 'Sam Raimi’s Spider-Man Trilogy',
    poster: '/assets/movies/sam-raimi-spider-man.jpg',
    director: 'Sam Raimi',
    year: '2002–2007',
    runtime: '6h 27m',
    genre: 'Superhero · Action',
    rating: 'PG-13',
    summary: 'Peter Parker balances everyday responsibilities with the challenges of being Spider-Man.',
    personalNote: 'I like Peter’s relatable struggles; HCDD starts with people’s real needs and limits.',
  },
  {
    id: 'remember-the-titans',
    title: 'Remember the Titans',
    poster: '/assets/movies/remember-the-titans.jpg',
    director: 'Boaz Yakin',
    year: '2000',
    runtime: '1h 53m',
    genre: 'Sports · Drama',
    rating: 'PG',
    summary: 'A newly integrated high-school football team learns to work together under coach Herman Boone.',
    personalNote: 'I like how trust grows across differences; HCDD values listening to diverse perspectives.',
  },
  {
    id: 'john-wick-franchise',
    title: 'John Wick Films',
    poster: '/assets/movies/john-wick-films.jpg',
    director: 'Chad Stahelski',
    year: '2014–2023',
    runtime: '8h 43m',
    genre: 'Action · Thriller',
    rating: 'R',
    summary: 'A retired assassin is pulled back into a dangerous world after a personal loss.',
    personalNote: 'I like its clear visual storytelling; HCDD uses clarity to make experiences easier to understand.',
  },
];

const detailVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.16, staggerChildren: 0.08 },
  },
};

const detailItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: 'easeOut' } },
};

function MovieCard({ movie, onSelect, reduceMotion }) {
  return (
    <motion.button
      className="movie-card"
      type="button"
      aria-label={`View ${movie.title}`}
      onClick={(event) => onSelect(movie, event)}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
    >
      <motion.span
        className={movie.id === 'lord-of-the-rings'
          ? 'movie-card__poster movie-card__poster--wide'
          : 'movie-card__poster'}
        layoutId={`poster-${movie.id}`}
        transition={reduceMotion ? { duration: 0.01 } : { type: 'spring', stiffness: 260, damping: 28 }}
      >
        <img src={movie.poster} alt="" loading="lazy" />
        <span className="movie-card__cue" aria-hidden="true">NOW SHOWING</span>
      </motion.span>
      <span className="movie-card__title">{movie.title}</span>
      <span className="movie-card__year">{movie.year}</span>
    </motion.button>
  );
}

function MovieDetail({ movie, onBack, reduceMotion }) {
  const backButtonRef = useRef(null);
  const transition = reduceMotion
    ? { duration: 0.01 }
    : { type: 'spring', stiffness: 260, damping: 28 };

  useEffect(() => {
    backButtonRef.current?.focus();
  }, []);

  return (
    <motion.article
      className="movie-detail"
      aria-labelledby={`movie-title-${movie.id}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: reduceMotion ? 0.01 : 0.18 } }}
    >
      {!reduceMotion && (
        <motion.div
          className="movie-detail__flare"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.42, 0.16] }}
          transition={{ duration: 0.58, ease: 'easeOut' }}
        />
      )}
      <motion.div
        className={movie.id === 'lord-of-the-rings'
          ? 'movie-detail__poster movie-detail__poster--wide'
          : 'movie-detail__poster'}
        layoutId={`poster-${movie.id}`}
        transition={transition}
      >
        <img src={movie.poster} alt="" />
      </motion.div>

      <motion.div
        className="movie-detail__copy"
        variants={detailVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="movie-detail__eyebrow" variants={detailItemVariants}>
          A film from my shelf
        </motion.p>
        <motion.h3 id={`movie-title-${movie.id}`} variants={detailItemVariants}>
          {movie.title}
        </motion.h3>
        <motion.p className="movie-detail__summary" variants={detailItemVariants}>
          {movie.summary}
        </motion.p>

        <motion.dl className="movie-detail__facts" variants={detailItemVariants}>
          <div><dt>Director</dt><dd>{movie.director}</dd></div>
          <div><dt>Released</dt><dd>{movie.year}</dd></div>
          <div><dt>Runtime</dt><dd>{movie.runtime}</dd></div>
          <div><dt>Genre</dt><dd>{movie.genre}</dd></div>
          <div><dt>US rating</dt><dd>{movie.rating}</dd></div>
        </motion.dl>

        {movie.personalNote && (
          <motion.div className="movie-detail__personal-note" variants={detailItemVariants}>
            <p>Why I like it / HCDD</p>
            <p>{movie.personalNote}</p>
          </motion.div>
        )}

        <motion.button
          ref={backButtonRef}
          className="movie-detail__back"
          type="button"
          onClick={onBack}
          variants={detailItemVariants}
        >
          <span aria-hidden="true">←</span> Back to the reel
        </motion.button>
      </motion.div>
    </motion.article>
  );
}

export function MovieTheater({ isOpen, onClose, onExitComplete }) {
  const [activeMovie, setActiveMovie] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const closeButtonRef = useRef(null);
  const selectedPosterRef = useRef(null);
  const closeTimerRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      window.clearTimeout(closeTimerRef.current);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const closeTheater = () => {
    if (isClosing) return;
    setActiveMovie(null);
    if (reduceMotion) {
      onClose();
      return;
    }

    setIsClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 850);
  };

  const selectMovie = (movie, event) => {
    selectedPosterRef.current = event.currentTarget;
    setActiveMovie(movie);
  };

  const returnToReel = () => {
    setActiveMovie(null);
    window.requestAnimationFrame(() => selectedPosterRef.current?.focus());
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      if (activeMovie) returnToReel();
      else closeTheater();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusable = Array.from(
      event.currentTarget.querySelectorAll('button:not([disabled])'),
    ).filter((element) => !element.closest('[inert]'));
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
    <AnimatePresence onExitComplete={onExitComplete}>
      {isOpen && (
        <motion.div
          className="movie-theater__backdrop"
          key="movie-theater"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduceMotion ? 0.01 : 0.28 } }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeTheater();
          }}
        >
          <motion.section
            className="movie-theater"
            role="dialog"
            aria-modal="true"
            aria-labelledby="movie-theater-title"
            onKeyDown={handleKeyDown}
            initial={reduceMotion ? false : { y: 18, scale: 0.99 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 10, scale: 0.99 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.32, ease: 'easeOut' }}
          >
            <motion.div
              className="movie-theater__curtain movie-theater__curtain--left"
              aria-hidden="true"
              initial={{ x: 0 }}
              animate={{ x: isClosing ? 0 : '-102%' }}
              transition={{
                duration: reduceMotion ? 0.01 : 0.74,
                ease: isClosing ? [0.2, 0.8, 0.2, 1] : [0.65, 0, 0.35, 1],
              }}
            />
            <motion.div
              className="movie-theater__curtain movie-theater__curtain--right"
              aria-hidden="true"
              initial={{ x: 0 }}
              animate={{ x: isClosing ? 0 : '102%' }}
              transition={{
                duration: reduceMotion ? 0.01 : 0.74,
                ease: isClosing ? [0.2, 0.8, 0.2, 1] : [0.65, 0, 0.35, 1],
              }}
            />

            <div className="movie-theater__grain" aria-hidden="true" />
            <motion.div
              className="movie-theater__closing-dim"
              aria-hidden="true"
              animate={{ opacity: isClosing ? 1 : 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.68 }}
            />
            <header className="movie-theater__header">
              <div>
                <p className="movie-theater__eyebrow">PERSONAL REPERTORY</p>
                <h2 id="movie-theater-title">My screening room</h2>
                <p className="movie-theater__intro">A few films I keep coming back to.</p>
              </div>
              <button
                ref={closeButtonRef}
                className="movie-theater__close"
                type="button"
                aria-label="Close screening room"
                onClick={closeTheater}
              >
                <span aria-hidden="true">×</span>
              </button>
            </header>

            <LayoutGroup id="personal-screening-room">
              <motion.div
                className="movie-theater__reel"
                role="group"
                aria-label="Selected films"
                aria-hidden={Boolean(activeMovie)}
                inert={Boolean(activeMovie)}
                animate={{ opacity: activeMovie ? 0 : 1 }}
                transition={{
                  duration: reduceMotion ? 0.01 : 0.24,
                  delay: activeMovie && !reduceMotion ? 0.22 : 0,
                }}
              >
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onSelect={selectMovie}
                    reduceMotion={reduceMotion}
                  />
                ))}
              </motion.div>
              <AnimatePresence mode="wait" initial={false}>
                {activeMovie && (
                  <MovieDetail
                    key={activeMovie.id}
                    movie={activeMovie}
                    onBack={returnToReel}
                    reduceMotion={reduceMotion}
                  />
                )}
              </AnimatePresence>
            </LayoutGroup>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
