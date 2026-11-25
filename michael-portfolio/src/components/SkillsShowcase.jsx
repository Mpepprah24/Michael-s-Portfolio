import { motion } from 'motion/react';

const skillGroups = [
  {
    title: 'Programming',
    items: [
      { name: 'Python', logo: 'python.svg' },
      { name: 'Java', logo: 'java.svg' },
    ],
  },
  {
    title: 'Web experiences',
    items: [
      { name: 'HTML', logo: 'html5.svg' },
      { name: 'CSS', logo: 'css3.svg' },
      { name: 'React', logo: 'react.svg' },
    ],
  },
  {
    title: 'Data',
    items: [{ name: 'MySQL', logo: 'mysql.svg' }],
  },
];

const workflowGroups = [
  {
    title: 'Build & collaborate',
    items: [
      { name: 'GitHub', logo: 'github.svg' },
      { name: 'VS Code', logo: 'vscode.svg' },
      { name: 'Android Studio', logo: 'android-studio.svg' },
      { name: 'Power BI', logo: 'powerbi.svg' },
    ],
  },
  {
    title: 'AI in my workflow',
    items: [
      { name: 'ChatGPT', logo: 'chatgpt.svg' },
      { name: 'Copilot', logo: 'copilot.svg' },
      { name: 'Gemini', logo: 'gemini.svg' },
    ],
  },
];

function LogoMarquee({ groups, reverse = false }) {
  const entries = groups.flatMap((group) => [
    { type: 'category', name: group.title },
    ...group.items.map((item) => ({ type: 'skill', ...item })),
  ]);
  const accessibleList = groups
    .map((group) => `${group.title}: ${group.items.map((item) => item.name).join(', ')}`)
    .join('. ');

  return (
    <div
      className={`skills-marquee${reverse ? ' skills-marquee--reverse' : ''}`}
      role="group"
      aria-label={accessibleList}
    >
      <div className="skills-marquee__track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <ul className="skills-marquee__group" key={copy} aria-hidden={copy === 1}>
            {entries.map((entry, index) => entry.type === 'category' ? (
              <li className="skills-marquee__category" key={`${entry.name}-${index}`}>
                {entry.name}
              </li>
            ) : (
              <li className="skills-marquee__item" key={entry.name}>
                <span className="skills-marquee__logo">
                  <img src={`/assets/program-logos/${entry.logo}`} alt="" draggable="false" />
                </span>
                <span>{entry.name}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <p className="skills-marquee__sr-only">{accessibleList}.</p>
    </div>
  );
}

function SkillsPanel({ id, index, label, title, description, groups, direction = -24, reverse = false }) {
  return (
    <motion.section
      className="skills-showcase__panel"
      aria-labelledby={id}
      initial={{ opacity: 0, x: direction }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="skills-showcase__heading">
        <p className="social-contact__eyebrow">{index} / {label}</p>
        <h3 id={id}>{title}</h3>
        <p>{description}</p>
      </div>
      <LogoMarquee groups={groups} reverse={reverse} />
    </motion.section>
  );
}

export const SkillsShowcase = () => (
  <div className="skills-showcase">
    <SkillsPanel
      id="skills-strengths-title"
      index="01"
      label="CORE SKILLS"
      title="Design & development"
      description="The foundations I use to shape and build useful digital experiences."
      groups={skillGroups}
    />
    <SkillsPanel
      id="skills-programs-title"
      index="02"
      label="WORKFLOW"
      title="Tools around the work"
      description="Platforms for building, collaborating, analyzing, and exploring ideas."
      groups={workflowGroups}
      direction={24}
      reverse
    />
  </div>
);
