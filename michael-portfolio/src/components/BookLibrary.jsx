import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const books = [
  {
    id: 'the-odyssey',
    title: 'The Odyssey',
    author: 'Homer',
    year: 'c. 8th century BCE',
    genre: 'Epic poetry · Myth',
    cover: '/assets/books/the-odyssey.jpg',
    synopsis: 'After the Trojan War, Odysseus faces a long voyage home across a world of gods, monsters, and shifting loyalties.',
    themes: ['Homecoming', 'Courage', 'Cleverness'],
    personalNote: 'I like Odysseus’s resourcefulness; HCDD designs around people’s changing needs.',
  },
  {
    id: 'dune-messiah',
    title: 'Dune Messiah',
    author: 'Frank Herbert',
    year: '1969',
    genre: 'Science fiction · Political',
    cover: '/assets/books/dune-messiah.jpg',
    synopsis: 'Paul Atreides rules an empire shaped by prophecy while facing the consequences of the future he helped unleash.',
    themes: ['Power', 'Prophecy', 'Responsibility'],
    personalNote: 'I like its questions about power; HCDD asks who benefits and who is affected.',
  },
  {
    id: '1984',
    title: '1984',
    author: 'George Orwell',
    year: '1949',
    genre: 'Fiction · Dystopian',
    cover: '/assets/books/1984.jpg',
    synopsis: 'Winston Smith tries to preserve private thought in a society where power reaches into memory, language, and daily life.',
    themes: ['Truth', 'Freedom', 'Surveillance'],
    personalNote: 'I like its warning about surveillance; HCDD must protect privacy and trust.',
  },
  {
    id: 'goodbye-eri',
    title: 'Goodbye, Eri',
    author: 'Tatsuki Fujimoto',
    year: '2022',
    genre: 'Manga · Drama',
    cover: '/assets/books/goodbye-eri.jpg',
    synopsis: 'A young filmmaker turns grief and memory into a project that blurs the edges between what happened and what was staged.',
    themes: ['Memory', 'Grief', 'Storytelling'],
    personalNote: 'I like its layered storytelling; HCDD values understanding how people make meaning.',
  },
  {
    id: 'shamo',
    title: 'Shamo',
    author: 'Izo Hashimoto · Akio Tanaka',
    year: '1998–2004',
    genre: 'Manga · Martial arts',
    cover: '/assets/books/shamo.jpg',
    synopsis: 'A young man enters a brutal world of martial arts, survival, and the cost of violence.',
    themes: ['Identity', 'Discipline', 'Consequences'],
    personalNote: 'I like its look at identity and consequences; HCDD asks us to understand people’s circumstances.',
  },
  {
    id: 'superman-peace-on-earth',
    title: 'Superman: Peace on Earth',
    author: 'Paul Dini · Alex Ross',
    year: '1999',
    genre: 'American comics · Graphic novel',
    cover: '/assets/books/superman-peace-on-earth.jpg',
    synopsis: 'Superman sets out to address hunger and confronts the limits of individual action in the face of systemic need.',
    themes: ['Compassion', 'Hope', 'Responsibility'],
    personalNote: 'I like its focus on helping others; HCDD centers solutions on real human needs.',
  },
  {
    id: 'watchmen',
    title: 'Watchmen',
    author: 'Alan Moore · Dave Gibbons',
    year: '1986–1987',
    genre: 'American comics · Graphic novel',
    cover: '/assets/books/watchmen.jpg',
    synopsis: 'A murder investigation draws retired masked heroes into a crisis that unsettles their ideas of justice and power.',
    themes: ['Justice', 'Power', 'Moral ambiguity'],
    personalNote: 'I like its competing perspectives; HCDD requires listening to people with different experiences.',
  },
  {
    id: 'x-men-god-loves-man-kills',
    title: 'X-Men: God Loves, Man Kills',
    author: 'Chris Claremont · Brent Anderson',
    year: '1982',
    genre: 'American comics · Graphic novel',
    cover: '/assets/books/x-men-god-loves-man-kills.jpg',
    synopsis: 'The X-Men confront a campaign of fear and persecution that puts prejudice and belonging at the heart of the story.',
    themes: ['Belonging', 'Prejudice', 'Empathy'],
    personalNote: 'I like its themes of prejudice and belonging; HCDD values inclusion and empathy.',
  },
  {
    id: 'spider-man-kravens-last-hunt',
    title: "Spider-Man: Kraven's Last Hunt",
    author: 'J.M. DeMatteis · Mike Zeck',
    year: '1987',
    genre: 'American comics · Superhero',
    cover: '/assets/books/spider-man-kravens-last-hunt.jpg',
    synopsis: 'Kraven captures Spider-Man and takes his place, forcing Peter to confront his identity and resilience.',
    themes: ['Identity', 'Resilience', 'Perspective'],
    personalNote: 'I like its focus on identity; HCDD starts by understanding people’s experiences.',
  },
];

const pageVariants = {
  initial: { opacity: 0, rotateY: -14, x: 18 },
  animate: { opacity: 1, rotateY: 0, x: 0 },
  exit: { opacity: 0, rotateY: 12, x: -18 },
};

function BookDetail({ book, index, total, onSelectBook, reduceMotion }) {
  return (
    <motion.article
      className="book-detail"
      aria-labelledby={`book-title-${book.id}`}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: reduceMotion ? 0.01 : 0.32, ease: 'easeOut' }}
      style={{ transformPerspective: 1400, transformOrigin: 'left center' }}
    >
      <div className="book-detail__left-page">
        <motion.div className="book-detail__cover">
          <img src={book.cover} alt="" />
        </motion.div>
        <p className="book-detail__byline">Written by</p>
        <p className="book-detail__author">{book.author}</p>
      </div>

      <div className="book-detail__right-page">
        <p className="book-detail__eyebrow">
          BOOK {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </p>
        <h3 id={`book-title-${book.id}`}>{book.title}</h3>
        <dl className="book-detail__facts">
          <div><dt>Published</dt><dd>{book.year}</dd></div>
          <div><dt>Genre</dt><dd>{book.genre}</dd></div>
        </dl>

        <section className="book-detail__section" aria-labelledby={`book-synopsis-${book.id}`}>
          <h4 id={`book-synopsis-${book.id}`}>The story</h4>
          <p>{book.synopsis}</p>
        </section>

        <section className="book-detail__section" aria-labelledby={`book-themes-${book.id}`}>
          <h4 id={`book-themes-${book.id}`}>Themes</h4>
          <ul className="book-detail__themes">
            {book.themes.map((theme) => <li key={theme}>{theme}</li>)}
          </ul>
        </section>

        {book.personalNote && (
          <section className="book-detail__personal-note" aria-labelledby={`book-note-${book.id}`}>
            <h4 id={`book-note-${book.id}`}>Why I like it / HCDD</h4>
            <p>{book.personalNote}</p>
          </section>
        )}

        <div className="book-detail__pagination" role="group" aria-label="Book pages">
          <button
            type="button"
            onClick={() => onSelectBook(index - 1)}
            disabled={index === 0}
          >
            <span aria-hidden="true">←</span> Previous book
          </button>
          <span aria-live="polite">{index + 1} of {total}</span>
          <button
            type="button"
            onClick={() => onSelectBook(index + 1)}
            disabled={index === total - 1}
          >
            Next book <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function BookLibrary({ isOpen, onClose, onExitComplete }) {
  const [activeBookIndex, setActiveBookIndex] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const closeButtonRef = useRef(null);
  const bookButtonRefs = useRef([]);
  const closeTimerRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const activeBook = books[activeBookIndex];

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

  const closeLibrary = () => {
    if (isClosing) return;
    setActiveBookIndex(0);
    if (reduceMotion) {
      onClose();
      return;
    }

    setIsClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 900);
  };

  const selectBook = (index) => {
    setActiveBookIndex(index);
    window.requestAnimationFrame(() => bookButtonRefs.current[index]?.focus());
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeLibrary();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusable = Array.from(
      event.currentTarget.querySelectorAll('button:not([disabled])'),
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
    <AnimatePresence onExitComplete={onExitComplete}>
      {isOpen && (
        <motion.div
          className="book-library__backdrop"
          key="personal-library"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduceMotion ? 0.01 : 0.28 } }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeLibrary();
          }}
        >
          <motion.section
            className="book-library"
            role="dialog"
            aria-modal="true"
            aria-labelledby="book-library-title"
            onKeyDown={handleKeyDown}
            initial={reduceMotion ? false : { y: 18, scale: 0.99 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 10, scale: 0.99 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.32, ease: 'easeOut' }}
          >
            <div className="book-library__ambient" aria-hidden="true" />
            <header className="book-library__header">
              <div>
                <p className="book-library__eyebrow">A PERSONAL LIBRARY</p>
                <h2 id="book-library-title">My Favorite Books</h2>
                <p>A few books I love and return to.</p>
              </div>
              <button
                ref={closeButtonRef}
                className="book-library__close"
                type="button"
                aria-label="Close personal library"
                onClick={closeLibrary}
              >
                <span aria-hidden="true">×</span>
              </button>
            </header>

            <div className="book-library__spread">
              <div className="book-library__index">
                <p className="book-library__index-label">BOOKS / PAGE INDEX</p>
                <nav aria-label="Books in this library">
                  {books.map((book, index) => (
                    <button
                      ref={(element) => {
                        bookButtonRefs.current[index] = element;
                      }}
                      key={book.id}
                      type="button"
                      aria-current={activeBookIndex === index ? 'page' : undefined}
                      className={activeBookIndex === index
                        ? 'book-library__book-link book-library__book-link--active'
                        : 'book-library__book-link'}
                      onClick={() => selectBook(index)}
                    >
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      {book.title}
                    </button>
                  ))}
                </nav>
                <div className="book-library__index-note">
                  <span>{String(activeBookIndex + 1).padStart(2, '0')} / {String(books.length).padStart(2, '0')}</span>
                  Each title opens as its own page.
                </div>
              </div>

              <div className="book-library__reading-page">
                <AnimatePresence initial={false} mode="wait">
                  <BookDetail
                    key={`book-${activeBook.id}`}
                    book={activeBook}
                    index={activeBookIndex}
                    total={books.length}
                    onSelectBook={selectBook}
                    reduceMotion={reduceMotion}
                  />
                </AnimatePresence>
              </div>

              <motion.div
                className="book-library__opening-cover"
                initial={reduceMotion ? false : { rotateY: 0 }}
                animate={{
                  rotateY: reduceMotion ? 0 : isClosing ? 0 : -158,
                  width: isClosing ? '100%' : '38%',
                }}
                transition={reduceMotion
                  ? { duration: 0.01 }
                  : isClosing
                    ? {
                      rotateY: { type: 'spring', stiffness: 150, damping: 18 },
                      width: { duration: 0.72, ease: 'easeInOut' },
                    }
                    : {
                      rotateY: { type: 'spring', stiffness: 100, damping: 19, delay: 0.14 },
                      width: { duration: 0.01 },
                    }}
                aria-hidden="true"
              >
                <span className="book-library__cover-spine" />
                <span className="book-library__cover-emblem">
                  <img src="/assets/books-icon.png" alt="" />
                </span>
                <span className="book-library__cover-title">MY FAVORITE<br />BOOKS</span>
                <span className="book-library__cover-edition">A PERSONAL LIBRARY</span>
              </motion.div>
              <motion.div
                className={isClosing
                  ? 'book-library__closing-veil book-library__closing-veil--closing'
                  : 'book-library__closing-veil'}
                aria-hidden="true"
                animate={{ opacity: isClosing ? 1 : 0 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.68 }}
              >
                <span className="book-library__dust" />
                <span className="book-library__dust" />
                <span className="book-library__dust" />
                <span className="book-library__dust" />
                <span className="book-library__dust" />
                <span className="book-library__dust" />
              </motion.div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
