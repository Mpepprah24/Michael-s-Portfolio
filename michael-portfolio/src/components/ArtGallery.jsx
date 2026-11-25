import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const artworks = [
  {
    id: 'emerald-portrait',
    title: 'Jolyne Kujo',
    image: '/assets/art/01-emerald-portrait.jpg',
    alt: 'Colored pencil and marker drawing of Jolyne Kujo with green hair and yellow clothing',
    medium: 'Colored pencil and marker',
    description: 'A close-up portrait of Jolyne Kujo, using a focused color palette and a strong silhouette.',
    designNote: 'A small set of repeated colors can make a character feel cohesive.',
  },
  {
    id: 'dinosaur-study',
    title: 'Original T-Rex drawing',
    image: '/assets/art/02-dinosaur-study.jpg',
    alt: 'Detailed graphite drawing of an original Tyrannosaurus rex in profile',
    medium: 'Graphite on paper',
    description: 'An original T-Rex drawing built from dense pencil marks, with attention to the head, scales, and long tail.',
    designNote: 'Texture works best when it follows the larger form.',
  },
  {
    id: 'city-faceoff',
    title: 'Spider-Man vs Tombstone',
    image: '/assets/art/03-city-faceoff.jpeg',
    alt: 'Pencil drawing of Spider-Man facing Tombstone',
    medium: 'Graphite on paper',
    description: 'Spider-Man and Tombstone face off in a comic-book-style composition.',
    designNote: 'Scale and opposing poses establish tension before the details do.',
  },
  {
    id: 'motion-study',
    title: 'Iron Man vs Dr. Doom',
    image: '/assets/art/04-motion-study.jpeg',
    alt: 'Graphite drawing of Iron Man facing Doctor Doom',
    medium: 'Graphite on paper',
    description: 'Iron Man and Doctor Doom share a dynamic graphite face-off.',
    designNote: 'A clear gesture makes even a rough pose easy to read.',
  },
  {
    id: 'heroic-forms',
    title: 'John Stewart and Green Lantern',
    image: '/assets/art/05-heroic-forms.jpeg',
    alt: 'Graphite drawing of John Stewart and Green Lantern',
    medium: 'Graphite on paper',
    description: 'A layered superhero drawing featuring John Stewart and Green Lantern.',
    designNote: 'Overlapping shapes help establish depth on a flat page.',
  },
  {
    id: 'character-pair',
    title: 'Chucky and Annabelle fanart',
    image: '/assets/art/06-character-pair.jpeg',
    alt: 'Graphite fanart drawing of Chucky and Annabelle side by side',
    medium: 'Graphite on paper',
    description: 'A paired fanart sketch contrasting Chucky and Annabelle’s expressions and silhouettes.',
    designNote: 'Variation between neighboring forms keeps a composition lively.',
  },
  {
    id: 'ink-and-energy',
    title: 'Carnage',
    image: '/assets/art/07-ink-and-energy.jpeg',
    alt: 'Red and black illustration of Carnage',
    medium: 'Marker and pencil on paper',
    description: 'A high-contrast Carnage portrait with energetic marks surrounding the central figure.',
    designNote: 'A restrained palette lets expressive linework carry the mood.',
  },
  {
    id: 'winged-guardian',
    title: 'Kid Icarus',
    image: '/assets/art/08-winged-guardian.jpeg',
    alt: 'Colored pencil and marker drawing of Kid Icarus with white and gold details',
    medium: 'Colored pencil and marker',
    description: 'A full-color Kid Icarus character study with pale clothing, gold details, and a broad wing shape.',
    designNote: 'Repeating accent colors connects separate costume details.',
  },
  {
    id: 'black-swordsman',
    title: 'Guts',
    image: '/assets/art/09-black-swordsman.jpeg',
    alt: 'Black ink drawing of Guts with a sword',
    medium: 'Ink and marker on paper',
    description: 'A monochrome drawing of Guts, using dark shapes to define clothing and silhouette.',
    designNote: 'Large value shapes make a focal figure legible at a glance.',
  },
  {
    id: 'crimson-demon',
    title: 'Original Devil drawing',
    image: '/assets/art/10-crimson-demon.jpg',
    alt: 'Original red marker drawing of a horned, winged devil',
    medium: 'Marker and pencil on paper',
    description: 'An original devil illustration with oversized horns and wings filling the frame.',
    designNote: 'Letting a subject reach the edges can make it feel larger than the canvas.',
  },
  {
    id: 'blue-character-study',
    title: 'Bruno Bucciarati',
    image: '/assets/art/11-blue-character-study.jpg',
    alt: 'Blue and gold drawing of Bruno Bucciarati',
    medium: 'Marker and colored pencil',
    description: 'A character illustration of Bruno Bucciarati using blue as its dominant color and gold as an accent.',
    designNote: 'A dominant hue with a few warm accents gives the eye a clear path.',
  },
  {
    id: 'red-swordsman',
    title: 'Kenshin Himura',
    image: '/assets/art/12-red-swordsman.jpg',
    alt: 'Colored drawing of Kenshin Himura in a red robe with a sword at the shoulder',
    medium: 'Colored pencil and marker',
    description: 'A compact drawing of Kenshin Himura centered on a bold red robe and a sword at the shoulder.',
    designNote: 'Strong color blocks can anchor a small composition.',
  },
  {
    id: 'web-slinger',
    title: 'Spider-Man',
    image: '/assets/art/13-web-slinger.jpg',
    alt: 'Colored pencil drawing of Spider-Man swinging through the air',
    medium: 'Colored pencil and marker',
    description: 'A Spider-Man action pose with a curved body line suggesting a swing through the air.',
    designNote: 'A single sweeping line can guide the viewer through a busy pose.',
  },
  {
    id: 'color-study',
    title: 'Meruem and Netero',
    image: '/assets/art/14-color-study.jpg',
    alt: 'Colored drawing of Meruem and Netero in contrasting green and yellow',
    medium: 'Colored pencil',
    description: 'Meruem and Netero sit side by side, differentiated by warm and cool color choices.',
    designNote: 'Color contrast can separate neighboring subjects without adding visual clutter.',
  },
];

const detailVariants = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -12 },
};

function ArtworkCard({ artwork, onSelect, reduceMotion }) {
  return (
    <motion.button
      className="art-gallery__card"
      type="button"
      aria-label={`View ${artwork.title}`}
      onClick={(event) => onSelect(artwork, event)}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
    >
      <motion.span
        className="art-gallery__frame"
        layoutId={`artwork-${artwork.id}`}
        transition={reduceMotion ? { duration: 0.01 } : { type: 'spring', stiffness: 240, damping: 28 }}
      >
        <img src={artwork.image} alt="" loading="lazy" />
      </motion.span>
      <span className="art-gallery__card-title">{artwork.title}</span>
      <span className="art-gallery__card-medium">{artwork.medium}</span>
    </motion.button>
  );
}

function ArtworkDetail({ artwork, onBack, reduceMotion }) {
  const backButtonRef = useRef(null);

  useEffect(() => {
    backButtonRef.current?.focus();
  }, []);

  return (
    <motion.article
      className="art-gallery__detail"
      aria-labelledby={`artwork-title-${artwork.id}`}
      variants={detailVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: reduceMotion ? 0.01 : 0.3, ease: 'easeOut' }}
    >
      <motion.div
        className="art-gallery__detail-frame"
        layoutId={`artwork-${artwork.id}`}
        transition={reduceMotion ? { duration: 0.01 } : { type: 'spring', stiffness: 240, damping: 28 }}
      >
        <img src={artwork.image} alt={artwork.alt} />
      </motion.div>

      <div className="art-gallery__plaque">
        <p className="art-gallery__eyebrow">WORK {String(artworks.indexOf(artwork) + 1).padStart(2, '0')} / {String(artworks.length).padStart(2, '0')}</p>
        <h3 id={`artwork-title-${artwork.id}`}>{artwork.title}</h3>
        <section>
          <h4>About this piece</h4>
          <p>{artwork.description}</p>
        </section>
        <dl className="art-gallery__facts">
          <div>
            <dt>Medium</dt>
            <dd>{artwork.medium}</dd>
          </div>
          <div>
            <dt>Design observation</dt>
            <dd>{artwork.designNote}</dd>
          </div>
        </dl>
        <button
          ref={backButtonRef}
          className="art-gallery__back"
          type="button"
          onClick={onBack}
        >
          <span aria-hidden="true">←</span> Back to the gallery
        </button>
      </div>
    </motion.article>
  );
}

export function ArtGallery({ isOpen, onClose, onExitComplete }) {
  const [activeArtwork, setActiveArtwork] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const closeButtonRef = useRef(null);
  const selectedArtworkRef = useRef(null);
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

  const closeGallery = () => {
    if (isClosing) return;
    setActiveArtwork(null);
    if (reduceMotion) {
      onClose();
      return;
    }

    setIsClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 1500);
  };

  const selectArtwork = (artwork, event) => {
    selectedArtworkRef.current = event.currentTarget;
    setActiveArtwork(artwork);
  };

  const returnToGallery = () => {
    setActiveArtwork(null);
    window.requestAnimationFrame(() => selectedArtworkRef.current?.focus());
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      if (activeArtwork) returnToGallery();
      else closeGallery();
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
          className="art-gallery__backdrop"
          key="art-gallery"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduceMotion ? 0.01 : 0.28 } }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeGallery();
          }}
        >
          <motion.section
            className="art-gallery"
            role="dialog"
            aria-modal="true"
            aria-labelledby="art-gallery-title"
            onKeyDown={handleKeyDown}
            initial={reduceMotion ? false : { y: 18, scale: 0.99 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 10, scale: 0.99 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.32, ease: 'easeOut' }}
          >
            <div className="art-gallery__lighting" aria-hidden="true" />
            <header className="art-gallery__header">
              <div>
                <p className="art-gallery__eyebrow">A PERSONAL EXHIBITION</p>
                <h2 id="art-gallery-title">The sketchbook wall</h2>
                <p>Character studies, experiments, and ideas from my sketchbook.</p>
              </div>
              <button
                ref={closeButtonRef}
                className="art-gallery__close"
                type="button"
                aria-label="Close art gallery"
                onClick={closeGallery}
              >
                <span aria-hidden="true">×</span>
              </button>
            </header>

            <div className="art-gallery__exhibition">
              <AnimatePresence initial={false}>
                {activeArtwork ? (
                  <ArtworkDetail
                    key={`artwork-${activeArtwork.id}`}
                    artwork={activeArtwork}
                    onBack={returnToGallery}
                    reduceMotion={reduceMotion}
                  />
                ) : (
                  <motion.div
                    key="art-gallery-wall"
                    className="art-gallery__wall"
                    role="region"
                    aria-label="Artwork on the gallery wall"
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.97, y: 12 }}
                    animate={{
                      opacity: isClosing ? 0.18 : 1,
                      scale: isClosing ? 0.91 : 1,
                      y: isClosing ? 22 : 0,
                    }}
                    exit={{ opacity: 0, scale: 0.985, y: -8 }}
                    transition={{ duration: reduceMotion ? 0.01 : 0.45, ease: 'easeOut' }}
                  >
                    <div className="art-gallery__wall-heading">
                      <p>SKETCHBOOK SELECTION</p>
                      <span>{artworks.length} pieces</span>
                    </div>
                    <div className="art-gallery__grid">
                      {artworks.map((artwork) => (
                        <ArtworkCard
                          key={artwork.id}
                          artwork={artwork}
                          onSelect={selectArtwork}
                          reduceMotion={reduceMotion}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div
                className="art-gallery__doorway"
                aria-hidden="true"
              >
                <motion.span
                  className="art-gallery__door art-gallery__door--left"
                  initial={reduceMotion ? false : { x: 0 }}
                  animate={{ x: isClosing ? 0 : '-102%' }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.72, ease: [0.65, 0, 0.35, 1] }}
                />
                <motion.span
                  className="art-gallery__door art-gallery__door--right"
                  initial={reduceMotion ? false : { x: 0 }}
                  animate={{ x: isClosing ? 0 : '102%' }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.72, ease: [0.65, 0, 0.35, 1] }}
                />
              </motion.div>
              <motion.p
                className="art-gallery__exit-plaque"
                aria-live="polite"
                animate={{ opacity: isClosing ? 1 : 0, y: isClosing ? 0 : 8 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.42, delay: isClosing ? 0.72 : 0 }}
              >
                Thanks for coming!
              </motion.p>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
