import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { AboutSection } from './AboutSection';
import { Projects } from './Projects';
import { SkillsShowcase } from './SkillsShowcase';

const processSteps = ['Listen', 'Sketch', 'Prototype', 'Build'];

export function StudioExperience({
  isOpen,
  isPanelOpen,
  onClose,
  onExitComplete,
  onOpenPanel,
}) {
  const closeButtonRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusable = Array.from(
      event.currentTarget.querySelectorAll('button:not([disabled]), a[href]'),
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
          className="studio__backdrop"
          key="design-studio"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduceMotion ? 0.01 : 0.3 } }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.section
            className="studio"
            role="dialog"
            aria-modal="true"
            aria-labelledby="studio-title"
            aria-hidden={isPanelOpen}
            inert={isPanelOpen}
            onKeyDown={handleKeyDown}
            initial={reduceMotion ? false : { clipPath: 'inset(48% 0 48%)', opacity: 0.6 }}
            animate={{ clipPath: 'inset(0% 0 0%)', opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { clipPath: 'inset(48% 0 48%)', opacity: 0.6 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.72, ease: [0.65, 0, 0.35, 1] }}
          >
            <header className="studio__header">
              <div>
                <p className="studio__eyebrow">NOW ENTERING</p>
                <h2 id="studio-title">Design Studio</h2>
                <p>From first questions to thoughtful digital experiences.</p>
              </div>
              <div className="studio__header-actions">
                <button type="button" onClick={(event) => onOpenPanel('social', event.currentTarget)}>Socials</button>
                <button type="button" onClick={(event) => onOpenPanel('contact', event.currentTarget)}>Contact</button>
                <button
                  ref={closeButtonRef}
                  className="studio__close"
                  type="button"
                  aria-label="Leave the design studio"
                  onClick={onClose}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </header>

            <ol className="studio__process" aria-label="Design process">
              {processSteps.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {step}
                </li>
              ))}
            </ol>

            <div className="studio__content">
              <AboutSection />
              <Projects />
              <motion.section
                id="skills"
                className="home-skills"
                aria-labelledby="skills-title"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.55, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.15 }}
              >
                <div className="home-section-heading home-skills__heading">
                  <p className="social-contact__eyebrow">TOOLS OF THE TRADE</p>
                  <h2 id="skills-title">Skills and programs I use.</h2>
                </div>
                <SkillsShowcase />
              </motion.section>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
