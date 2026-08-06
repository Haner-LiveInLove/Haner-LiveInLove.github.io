"use client";

import { useEffect, useState } from "react";

type Publication = {
  index: string;
  area: string;
  title: string;
  authors: string;
  venue: string;
  highlight?: string;
  abstract: string;
  links: { label: string; href: string }[];
};

// Template content: replace the text and URLs below with your own information.
const publications: Publication[] = [
  {
    index: "01",
    area: "AI",
    title: "Learning Structured World Models from Multimodal Interaction",
    authors: "Your Name, Collaborator One, Collaborator Two",
    venue: "Conference on Machine Learning · 2026",
    highlight: "Oral",
    abstract:
      "Add a concise two-to-four sentence summary of the problem, your key idea, and the main result. This expandable area keeps the page compact while still giving interested readers useful context.",
    links: [
      { label: "paper", href: "#" },
      { label: "project", href: "#" },
      { label: "code", href: "#" },
    ],
  },
  {
    index: "02",
    area: "CV",
    title: "Compositional Visual Reasoning with Lightweight Agents",
    authors: "Collaborator One, Your Name, Collaborator Three",
    venue: "International Conference on Computer Vision · 2025",
    highlight: "Highlight",
    abstract:
      "Use this space for a plain-language abstract. Explain what your method enables, why prior approaches struggle, and what the experiments demonstrate.",
    links: [
      { label: "paper", href: "#" },
      { label: "website", href: "#" },
      { label: "video", href: "#" },
    ],
  },
  {
    index: "03",
    area: "HCI",
    title: "Human-in-the-Loop Systems for Reliable Scientific Discovery",
    authors: "Your Name, Collaborator Four, Collaborator Five",
    venue: "Transactions on Interactive Intelligent Systems · 2025",
    abstract:
      "A final placeholder abstract demonstrates how longer research entries behave on desktop and mobile. Replace it freely or remove the abstract control when a short bibliography is enough.",
    links: [
      { label: "paper", href: "#" },
      { label: "data", href: "#" },
      { label: "code", href: "#" },
    ],
  },
];

const navItems = [
  { label: "About", href: "#about" },
  { label: "Research", href: "#research" },
  { label: "Experience", href: "#experience" },
  { label: "Service", href: "#service" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const sections = navItems
      .map(({ href }) => document.querySelector(href))
      .filter((section): section is Element => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -58%", threshold: [0, 0.15, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav className="site-nav" aria-label="Primary navigation">
        <div className="nav-inner">
          <a className="brand" href="#about" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark" aria-hidden="true">Y</span>
            <strong>Your Name</strong>
          </a>

          <button
            className={`menu-button ${menuOpen ? "is-open" : ""}`}
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>

          <div className={`nav-menu ${menuOpen ? "is-open" : ""}`}>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={activeSection === item.href.slice(1) ? "is-active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main>
        <section className="container hero" id="about">
          <div className="portrait-column">
            <div className="portrait-placeholder" role="img" aria-label="Portrait placeholder">
              <span>YN</span>
              <small>Replace with portrait</small>
            </div>
            <p className="caption">Your photo caption · 2026</p>
          </div>

          <div className="hero-copy">
            <p className="eyebrow">Researcher · Your University</p>
            <h1>Your Name</h1>
            <p className="email">yourname [at] university [dot] edu</p>
            <p>
              I am a <a href="#">Ph.D. student</a> in Computer Science at Your
              University, advised by <a href="#">Professor Name</a>. My research
              explores the intersection of machine learning, visual computing,
              and intelligent systems.
            </p>
            <p>
              I build learning systems that can understand complex environments,
              collaborate with people, and generalize beyond their training data.
              I am always happy to discuss research and new collaborations.
            </p>
            <div className="profile-links" aria-label="Profile links">
              <a href="#">Google Scholar</a>
              <span aria-hidden="true">/</span>
              <a href="#">GitHub</a>
              <span aria-hidden="true">/</span>
              <a href="#">ORCID</a>
              <span aria-hidden="true">/</span>
              <a href="mailto:yourname@university.edu">Email</a>
            </div>
          </div>
        </section>

        <section className="container page-section" id="research">
          <header className="section-heading">
            <div>
              <p className="section-kicker">Selected work</p>
              <h2>Recent Research</h2>
            </div>
            <a className="view-all" href="#">All publications ↗</a>
          </header>
          <div className="rule" />

          <p className="subsection-label">Machine Learning &amp; Interactive Systems</p>

          <div className="publication-list">
            {publications.map((publication) => (
              <article className="publication" key={publication.index}>
                <div className={`paper-visual visual-${publication.index}`} aria-hidden="true">
                  <span className="paper-area">{publication.area}</span>
                  <span className="paper-index">{publication.index}</span>
                  <i />
                </div>

                <div className="paper-copy">
                  <h3>{publication.title}</h3>
                  <p className="authors">
                    {publication.authors.split("Your Name")[0]}
                    <u>Your Name</u>
                    {publication.authors.split("Your Name")[1]}
                  </p>
                  <p className="venue">
                    {publication.venue}
                    {publication.highlight && (
                      <span className="highlight"> · {publication.highlight}</span>
                    )}
                  </p>
                  <div className="paper-actions">
                    <details>
                      <summary>[abstract]</summary>
                      <p>{publication.abstract}</p>
                    </details>
                    {publication.links.map((link) => (
                      <a href={link.href} key={link.label}>[{link.label}]</a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="container page-section" id="experience">
          <p className="section-kicker">Where I have worked</p>
          <h2>Experience</h2>
          <div className="rule" />
          <div className="timeline">
            <article className="timeline-item">
              <div className="institution-mark">AI</div>
              <div>
                <h3>Research Lab · Research Intern</h3>
                <p>Summer 2026 · Foundation Models &amp; Intelligent Agents</p>
              </div>
            </article>
            <article className="timeline-item">
              <div className="institution-mark university">U</div>
              <div>
                <h3>Your University · Ph.D. in Computer Science</h3>
                <p>2024—Present · Advisor: Professor Name</p>
              </div>
            </article>
          </div>
        </section>

        <section className="container page-section" id="service">
          <p className="section-kicker">Academic community</p>
          <h2>Service</h2>
          <div className="rule" />
          <p className="service-copy">
            Reviewer: Conference A, Conference B, Journal C · Teaching:
            Introduction to Machine Learning · Mentoring: Undergraduate Research Program
          </p>
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} Your Name</p>
        <a href="#about">Back to top ↑</a>
      </footer>
    </>
  );
}
