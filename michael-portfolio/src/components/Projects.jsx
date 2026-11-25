import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const projects = [
  {
    id: "soccer-injury-tracker",
    title: "Soccer Injury Tracker",
    category: "Java",
    summary:
      "I built a shared way to track players, teams, injuries, and recovery because health updates can be easy to lose across a team. Keeping those details together helps coaches and medical staff make more informed decisions about player care.",
    tech: ["Java", "Swing", "MVC", "JUnit 5"],
    screenshots: [
      {
        src: "/projects/soccer-injury-tracker-preview.png",
        alt: "Soccer Injury Tracker desktop app showing a player roster and injury management panel",
        label: "Player tracker",
      },
    ],
    github: "https://github.com/Mpepprah24/IST261SoccerInjuryTracker",
  },
  {
    id: "budget-expense-tracker",
    title: "Budget & Expense Tracker",
    category: "Java",
    summary:
      "I made a lightweight expense tracker to turn everyday spending into a clearer picture of what remains in a budget. Categorizing costs and showing the remaining balance puts the information people need to make their next decision within reach.",
    tech: ["Java", "MVC", "OOP"],
    screenshots: [
      {
        src: "/projects/budget-expense-tracker-preview.svg",
        alt: "Illustrative terminal preview of the Budget and Expense Tracker menu and spending summary",
        label: "Terminal preview",
      },
    ],
    github: "https://github.com/Mpepprah24/HCDD311BudgetandExpenseTracker",
  },
  {
    id: "movie-website",
    title: "Silver Screen Chronicles",
    category: "Web",
    summary:
      "I created a cinema-themed site that brings movie discovery, games, and shopping into one experience. Clear page-to-page navigation helps visitors move from browsing films to exploring interactive features without losing the thread.",
    tech: ["HTML", "CSS", "JavaScript"],
    screenshots: [
      {
        src: "/projects/silver-screen-home.png",
        alt: "Silver Screen Chronicles homepage with cinema branding and site navigation",
        label: "Home",
      },
      {
        src: "/projects/silver-screen-gallery.png",
        alt: "Silver Screen Chronicles movie poster gallery",
        label: "Gallery",
      },
      {
        src: "/projects/silver-screen-shop.png",
        alt: "Silver Screen Chronicles shop listing movies with buy and rent options",
        label: "Shop",
      },
      {
        src: "/projects/silver-screen-library.png",
        alt: "Silver Screen Chronicles personal movie library",
        label: "Library",
      },
      {
        src: "/projects/silver-screen-cart.png",
        alt: "Silver Screen Chronicles shopping cart with selected movies and total",
        label: "Cart",
      },
    ],
    github: "https://github.com/Mpepprah24/MovieWebsiteIST256",
  },
  {
    id: "gameflix",
    title: "GameFlix",
    category: "Web",
    summary:
      "I started shaping GameFlix around a simple user need: make a large game catalog feel easy to discover. Its Spring Boot scaffold gives me a starting point for a data-backed catalog where browsing and clear navigation lead the design.",
    tech: ["Java", "Spring Boot", "MySQL"],
    screenshots: [
      {
        src: "/projects/gameflix-preview.png",
        alt: "Early GameFlix catalog concept showing anime and sandbox game rows",
        label: "Catalog concept",
      },
    ],
    github: "https://github.com/Mpepprah24/Gameflix",
  },
  {
    id: "hcdd-discovery",
    title: "HCDD Discovery Prototype",
    category: "Design",
    status: "Coming soon",
    summary:
      "I’m designing a clearer way for incoming students to understand Human-Centered Design and Development at Penn State Harrisburg. The prototype focuses on the questions prospective students need answered as they decide whether the program fits them.",
    tech: ["Figma", "UX Research", "Prototyping"],
    screenshots: [],
    github: null,
  },
  {
    id: "nsbe-psh",
    title: "Penn State Harrisburg NSBE Website",
    category: "Web",
    status: "Coming soon",
    summary:
      "I’m working with fellow members on a home for the Penn State Harrisburg chapter of the National Society of Black Engineers. The goal is to make chapter events, updates, and ways to get involved easier for students to find.",
    tech: ["React", "Tailwind CSS", "Collaboration"],
    screenshots: [],
    github: null,
  },
  {
    id: "art-gallery",
    title: "Sketchbook Wall: Art Gallery",
    category: "Web",
    summary:
      "I wanted the gallery to feel like opening a sketchbook rather than browsing a flat image grid. A corkboard layout gives each illustration room to be discovered while keeping the collection inviting to explore.",
    tech: ["HTML", "CSS", "JavaScript", "Google Fonts"],
    screenshots: [
      {
        src: "/projects/art-gallery.png",
        alt: "Art gallery page displaying hand-drawn character illustrations pinned in a grid",
        label: "Gallery",
      },
    ],
    github: null,
  },
];

const cubeFaces = [
  {
    id: "front-soccer",
    side: "front",
    label: "Player care",
    projects: [projects[0]],
    rotateX: 0,
    rotateY: 0,
  },
  {
    id: "left-budget",
    side: "left",
    label: "Personal finance",
    projects: [projects[1]],
    rotateX: 0,
    rotateY: 90,
  },
  {
    id: "back-movies",
    side: "back",
    label: "Movie discovery",
    projects: [projects[2]],
    rotateX: 0,
    rotateY: 180,
  },
  {
    id: "right-gameflix",
    side: "right",
    label: "Game discovery",
    projects: [projects[3]],
    rotateX: 0,
    rotateY: 270,
  },
  {
    id: "top-hcdd",
    side: "top",
    label: "HCDD discovery",
    projects: [projects[4]],
    rotateX: 90,
    rotateY: 270,
  },
  {
    id: "bottom-nsbe",
    side: "bottom",
    label: "NSBE website",
    projects: [projects[5]],
    rotateX: -90,
    rotateY: 270,
  },
  {
    id: "front-gallery",
    side: "front",
    label: "Creative work",
    projects: [projects[6]],
    rotateX: 0,
    rotateY: 360,
  },
];

function ProjectMedia({ project }) {
  const [screenshotIndex, setScreenshotIndex] = useState(0);
  const screenshots = project.screenshots ?? [];
  const screenshot = screenshots[screenshotIndex];

  return (
    <div className={`projects-cube__media${screenshot ? "" : " projects-cube__media--empty"}`}>
      {screenshot ? (
        screenshot.type === "video" ? (
          <video
            src={screenshot.src}
            aria-label={screenshot.alt}
            controls
            playsInline
          />
        ) : (
          <img src={screenshot.src} alt={screenshot.alt} />
        )
      ) : (
        <div className="projects-cube__empty" aria-hidden="true">
          <span>{project.title.slice(0, 2)}</span>
          <span>Preview coming soon</span>
        </div>
      )}
      {screenshots.length > 1 && (
        <div
          className="projects-cube__media-nav"
          role="group"
          aria-label={`${project.title} media`}
        >
          {screenshots.map((item, index) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setScreenshotIndex(index)}
              aria-label={`Show ${item.label}`}
              aria-pressed={index === screenshotIndex}
            >
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      )}
      {screenshot && (
        <span className="projects-cube__media-label">{screenshot.label}</span>
      )}
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="projects-cube-card">
      <ProjectMedia project={project} />
      <div className="projects-cube-card__details">
        <p className="projects-cube-card__meta">
          <span>{project.category}</span>
          {project.status && (
            <span className="projects-cube-card__status">{project.status}</span>
          )}
        </p>
        <h3>{project.title}</h3>
        <p className="projects-cube-card__summary">{project.summary}</p>
        <ul className="projects-cube-card__tech" aria-label="Technologies used">
          {project.tech.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {project.github && (
          <a
            className="projects-cube-card__github"
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  );
}

function CubeFace({ face, index, activeIndex }) {
  const isActive = index === activeIndex;
  const isGalleryFace = face.id === "front-gallery";
  const isVisible = isGalleryFace ? activeIndex === 6 : face.side !== "front" || activeIndex !== 6;

  return (
    <section
      className={`projects-cube__face projects-cube__face--${face.side}`}
      aria-label={`${face.label} project face`}
      aria-hidden={!isActive || !isVisible}
      inert={!isActive || !isVisible}
      style={{
        display: isVisible ? undefined : "none",
        pointerEvents: isActive ? "auto" : "none",
      }}
    >
      <ProjectCard project={face.projects[0]} />
      <span className="projects-cube__face-index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")} / {String(cubeFaces.length).padStart(2, "0")}
      </span>
    </section>
  );
}

export const Projects = () => {
  const [activeFace, setActiveFace] = useState(0);
  const reduceMotion = useReducedMotion();
  const face = cubeFaces[activeFace];

  const rotateTo = (index) => {
    setActiveFace((index + cubeFaces.length) % cubeFaces.length);
  };

  const handleCubeClick = (event) => {
    if (event.target instanceof Element && event.target.closest("a, button, video, input")) return;
    rotateTo(activeFace + 1);
  };

  const handleCubeKeyDown = (event) => {
    if (
      event.target !== event.currentTarget
      || (event.key !== "Enter" && event.key !== " ")
    ) return;

    event.preventDefault();
    rotateTo(activeFace + 1);
  };

  return (
    <motion.section
      id="projects"
      className="home-projects container"
      aria-labelledby="studio-work-title"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.15 }}
    >
      <header className="home-section-heading projects-cube__heading">
        <p className="social-contact__eyebrow">PROJECTS / CASE STUDIES</p>
        <h2 id="studio-work-title">Work shaped by people and purpose.</h2>
        <p className="projects-cube__intro">
          Seven projects, one rotating cube. Click a face or use the controls to
          explore the work and the people-centered thinking behind it.
        </p>
      </header>

      <div className="projects-cube-showcase">
        <div className="projects-cube__viewport">
          <motion.div
            className="projects-cube"
            animate={{
              rotateX: face.rotateX,
              rotateY: face.rotateY,
            }}
            transition={{
              duration: reduceMotion ? 0.01 : 1,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            onClick={handleCubeClick}
            onKeyDown={handleCubeKeyDown}
            role="group"
            aria-roledescription="rotating 3D project cube"
            aria-label={`Project cube, ${face.label} face. Click or press Enter or Space to rotate to the next face.`}
            tabIndex={0}
          >
            {cubeFaces.map((cubeFace, index) => (
              <CubeFace
                key={cubeFace.id}
                face={cubeFace}
                index={index}
                activeIndex={activeFace}
              />
            ))}
          </motion.div>
        </div>

        <p className="projects-cube__hint">
          Click anywhere on the cube to rotate, or use the arrows and face controls.
        </p>
        <nav className="projects-cube__controls" aria-label="Rotate project cube">
          <button
            type="button"
            className="projects-cube__arrow"
            onClick={() => rotateTo(activeFace - 1)}
            aria-label="Rotate to previous project face"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 12H5m7 7-7-7 7-7" />
            </svg>
          </button>
          <div className="projects-cube__pagination" aria-label="Choose a cube face">
            {cubeFaces.map((cubeFace, index) => (
              <button
                key={cubeFace.id}
                type="button"
                onClick={() => rotateTo(index)}
                aria-label={`Show ${cubeFace.label} face`}
                aria-current={index === activeFace ? "true" : undefined}
              />
            ))}
          </div>
          <span className="projects-cube__count" aria-live="polite">
            {String(activeFace + 1).padStart(2, "0")}{" "}
            <span aria-hidden="true">/</span>{" "}
            {String(cubeFaces.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            className="projects-cube__arrow"
            onClick={() => rotateTo(activeFace + 1)}
            aria-label="Rotate to next project face"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </button>
        </nav>
      </div>
    </motion.section>
  );
};
