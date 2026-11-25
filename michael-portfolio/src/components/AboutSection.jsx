import { motion } from 'motion/react';
import portrait from '../assets/michael-about.jpeg';

export const AboutSection = () => {
  return (
    <section id="about" className="home-about container" aria-labelledby="about-title">
      <motion.div
        className="home-about__portrait-wrap"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.25 }}
      >
        <img className="home-about__portrait" src={portrait} alt="Michael sitting outside" />
      </motion.div>

      <motion.div
        className="home-about__content"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.25 }}
      >
        <p className="social-contact__eyebrow">A LITTLE ABOUT ME</p>
        <h2 id="about-title">Design-minded. Curious by nature.</h2>
        <p>
          I&apos;m Michael, a full-stack developer and creative builder, and a Human-Centered
          Design and Development graduate from Penn State Harrisburg. I&apos;m passionate
          about UI/UX design, product management, and the thoughtful details that make
          technology feel intuitive.
        </p>
        <p>
          With a background in art and a love of technology, I enjoy bringing both sides
          together to shape useful, expressive digital experiences. I&apos;m always learning,
          experimenting, and looking for new ways to grow.
        </p>
      </motion.div>
    </section>
  );
};
