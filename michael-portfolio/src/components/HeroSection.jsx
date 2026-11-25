import { motion } from 'motion/react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

export const HeroSection = () => (
  <motion.section
    variants={container}
    initial="hidden"
    animate="show"
    id="home"
    className="home-hero container"
    aria-labelledby="home-title"
  >
    <div className="home-hero__content">
      <motion.p variants={item} className="home-hero__eyebrow">
        <span className="home-hero__status" aria-hidden="true" />
        FULL-STACK DEVELOPER <span aria-hidden="true">/</span> CREATIVE BUILDER
      </motion.p>

      <motion.h1 variants={item} id="home-title" className="home-hero__title">
        Hi, I&apos;m
        <br />
        <span>Michael.</span>
      </motion.h1>

      <motion.p variants={item} className="home-hero__description">
        I create interactive, thoughtful digital experiences, bringing ideas to life
        from the first line of code to the final pixel.
      </motion.p>
    </div>

    <div className="home-hero__scroll" aria-hidden="true">
      <span />
      SCROLL TO EXPLORE
    </div>
  </motion.section>
);
