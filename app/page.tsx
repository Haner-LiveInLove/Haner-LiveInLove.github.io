"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Publication = {
  title: string;
  authors: string;
  venue: string;
  abstract: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  links: { label: string; href: string }[];
};

const publications: Publication[] = [
  {
    title: "OpenDexGrasp: Open-vocabulary Task-Oriented Dexterous Grasping",
    authors:
      "Jiyao Zhang*, Junhan Wang*, Tianyu Wang*, Zeyuan Chen, Anthony Bolton, Yitong Peng, Hao Dong",
    venue: "The Conference on Robot Learning (CoRL) · 2026",
    abstract:
      "OpenDexGrap is a unified data and generative modeling framework that grounds free-form functional intent in visual and geometric observations to generate executable, task-consistent dexterous grasps.",
    image: "/opendexgrasp-teaser.jpg",
    imageAlt: "OpenDexGrasp framework and task-oriented grasp examples",
    imageWidth: 3308,
    imageHeight: 1318,
    links: [
      { label: "paper", href: "https://opendexgrasp.github.io/static/assets/opendexgrasp.pdf" },
      { label: "website", href: "https://opendexgrasp.github.io/" },
    ],
  },
  {
    title: "HiPolicy: Hierarchical Multi-Frequency Action Chunking for Policy Learning",
    authors:
      "Jiyao Zhang, Zimu Han, Junhan Wang, Xionghao Wu, Shihong Lin, Jinzhou Li, Hongwei Fan, Ruihai Wu, Dongjiang Li, Hao Dong",
    venue: "European Conference on Computer Vision (ECCV) · 2026",
    abstract:
      "HiPolicy addresses the tradeoff between long-horizon planning and fine-grained control in imitation learning via a hierarchical multi-frequency action chunking framework.",
    image: "/hipolicy-teaser.png",
    imageAlt: "HiPolicy hierarchical multi-frequency action chunking overview",
    imageWidth: 829,
    imageHeight: 502,
    links: [
      { label: "paper", href: "https://arxiv.org/abs/2604.06067" },
      { label: "website", href: "https://hipolicy.github.io/" },
      { label: "code", href: "https://github.com/HiPolicy/HiPolicy" },
    ],
  },
  {
    title: "ESI-VLA: Learning Embodied Spatial Intelligence for Vision-Language-Action Models",
    authors:
      "Jiyao Zhang*, Yitong Peng*, Mingxu Zhang*, Xionghao Wu, Junhan Wang, Hao Dong",
    venue: "In submission 2026",
    abstract:
      "ESI-VLA strengthens VLM backbones with a 5M-scale embodied spatial dataset and RGB-derived spatial priors, improving spatial perception and zero-shot manipulation generalization.",
    image: "/esi-vla-teaser.jpg",
    imageAlt: "ESI-VLA dataset, model architecture, and evaluation overview",
    imageWidth: 3108,
    imageHeight: 1146,
    links: [],
  },
];

const navItems = [
  { label: "About", href: "#about" },
];

function HighlightedAuthors({ authors }: { authors: string }) {
  const [before, after = ""] = authors.split("Junhan Wang");
  return (
    <>
      {before}
      <u>Junhan Wang</u>
      {after}
    </>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [wechatOpen, setWechatOpen] = useState(false);
  const [openAbstracts, setOpenAbstracts] = useState<Set<string>>(
    () => new Set(publications.map(({ title }) => title)),
  );

  const toggleAbstract = (title: string) => {
    setOpenAbstracts((current) => {
      const next = new Set(current);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

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

  useEffect(() => {
    if (!wechatOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setWechatOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [wechatOpen]);

  return (
    <>
      <nav className="site-nav" aria-label="Primary navigation">
        <div className="nav-inner">
          <a className="brand" href="#about" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark" aria-hidden="true">W</span>
            <strong>Junhan Wang</strong>
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
            <Image
              className="hero-photo"
              src="/junhan.jpg"
              alt="Junhan Wang"
              width={4032}
              height={3024}
              priority
              unoptimized
            />
            <p className="caption">
              Shot in June 2026
              <br />
              In{" "}
              <a href="https://www.google.com/maps?q=43.14881116666667,120.6136383333333">
                Horqin Sandy Land
              </a>
            </p>
          </div>

          <div className="hero-copy">
            <h1>
              Junhan Wang <span className="chinese-name" lang="zh-CN">王俊翰</span>
            </h1>
            <p className="email">junhan.wang0805 [at] gmail [dot] com</p>
            <p>
              Currently, I am spending my gap year as a Research Assistant at the <a href="https://cfcs.pku.edu.cn/english/">Center on Frontiers of Computing Studies (CFCS)</a> at Peking University,
              advised by <a href="https://zsdonghao.github.io/">Prof. Hao Dong</a>. Prior to this, I received my bachelor&apos;s degree in Telecommunication Engineering from <a href="https://www.sysu.edu.cn/">Sun Yat-sen University</a>.
            </p>
            <p>
              My research interests lie in agentic robot learning, with a particular focus on generalist and dexterous manipulation.
            </p>
            <p className="opportunity-note">
              I am seeking Ph.D. or M.Phil. opportunities starting in Spring or Fall 2027.
            </p>
            <div className="profile-links" aria-label="Profile links">
              <a href="https://github.com/Haner-LiveInLove">GitHub</a>
              <span aria-hidden="true">/</span>
              <a href="mailto:junhan.wang0805@gmail.com">Email</a>
              <span aria-hidden="true">/</span>
              <a href="https://scholar.google.com/citations?hl=en&user=WQlEOv0AAAAJ" target="_blank" rel="noreferrer">Google Scholar</a>
              <span aria-hidden="true">/</span>
              <button type="button" onClick={() => setWechatOpen(true)}>WeChat</button>
            </div>
          </div>
        </section>

        <section className="container page-section" id="research">
          <header className="section-heading">
            <div>
              <h2>Research &amp; Publications</h2>
            </div>
          </header>
          <div className="rule" />
          <p className="subsection-label">Dexterous Manipulation · Policy Learning · VLA</p>

          <div className="publication-list">
            {publications.map((publication) => (
              <article className="publication" key={publication.title}>
                <div className="paper-visual-shell">
                  <button
                    className="paper-visual"
                    type="button"
                    aria-label={`View the complete ${publication.title} figure`}
                  >
                    <Image
                      className="paper-pan-image"
                      src={publication.image}
                      alt={publication.imageAlt}
                      width={publication.imageWidth}
                      height={publication.imageHeight}
                      unoptimized
                    />
                  </button>
                  <div className="paper-preview-overlay" aria-hidden="true">
                    <Image
                      className="paper-preview-image"
                      src={publication.image}
                      alt=""
                      width={publication.imageWidth}
                      height={publication.imageHeight}
                      unoptimized
                    />
                  </div>
                </div>

                <div className="paper-copy">
                  <h3>{publication.title}</h3>
                  <p className="authors"><HighlightedAuthors authors={publication.authors} /></p>
                  <p className="venue">
                    {publication.venue}
                  </p>
                  <div className="paper-actions">
                    <button
                      className="abstract-toggle"
                      type="button"
                      aria-expanded={openAbstracts.has(publication.title)}
                      aria-controls={`${publication.title.split(":")[0].toLowerCase()}-abstract`}
                      onClick={() => toggleAbstract(publication.title)}
                    >
                      [abstract]
                    </button>
                    {publication.links.map((link) => (
                      <a href={link.href} key={link.label} target="_blank" rel="noreferrer">[{link.label}]</a>
                    ))}
                    {openAbstracts.has(publication.title) && (
                      <p
                        className="abstract-copy"
                        id={`${publication.title.split(":")[0].toLowerCase()}-abstract`}
                      >
                        {publication.abstract}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="container page-section" id="experience">
          <h2>Experience</h2>
          <div className="rule" />
          <div className="experience-groups">
            <section className="experience-group" aria-labelledby="research-experience-heading">
              <h3 className="experience-category" id="research-experience-heading">Research</h3>
              <div className="timeline">
                <article className="timeline-item">
                  <div className="institution-mark university">
                    <Image src="/pku.png" alt="Peking University" width={58} height={58} unoptimized />
                  </div>
                  <div>
                    <h4>Peking University · Research Assistant</h4>
                    <p><a href="https://cfcs.pku.edu.cn/english/">CFCS</a> · Advised by <a href="https://zsdonghao.github.io/">Prof. Hao Dong</a></p>
                    <p className="timeline-date">Jul. 2025—Present · Beijing, China</p>
                  </div>
                </article>
              </div>
            </section>
            <section className="experience-group" aria-labelledby="education-heading">
              <h3 className="experience-category" id="education-heading">Education</h3>
              <div className="timeline">
                <article className="timeline-item">
                  <div className="institution-mark university">
                    <Image src="/sysu.png" alt="Sun Yat-sen University" width={58} height={58} unoptimized />
                  </div>
                  <div>
                    <h4>Sun Yat-sen University · B.Eng. in Telecommunication Engineering</h4>
                    <p><a href="https://seit.sysu.edu.cn/">SEIT</a> · GPA 3.94/4.0 · <strong>Rank 1/72</strong></p>
                    <p className="timeline-date">Sep. 2020—Jun. 2025 · Guangzhou, China</p>
                  </div>
                </article>
              </div>
            </section>
          </div>
        </section>

        <section className="container page-section" id="honors">
          <h2>Honors</h2>
          <div className="rule" />

          <ul className="honors-list">
            <li><span>2025</span><p><strong>Outstanding Graduate in SYSU, Top 5%</strong></p></li>
            <li><span>2025</span><p>Excellent Bachelor Thesis in SYSU, Top 5%</p></li>
            <li><span>2022, 2024</span><p><strong>National Scholarship ×2, Top 1%</strong></p></li>
            <li><span>2022, 2023, 2024</span><p>The First-Class Scholarship in SYSU ×3, Top 5%</p></li>
            <li className="honors-linked-item">
              <a
                className="honors-entry-link"
                href="https://www.sysu.edu.cn/news/info/1881/1150121.htm"
                target="_blank"
                rel="noreferrer"
              >
                <span>2023</span>
                <div>
                  <p>Lin Bin &amp; Liu Xiangdong Scholarship, Academic Rank: 1/248 in SEIT</p>
                  <p className="honors-note">Funded by Lin Bin, the co-founder of Xiaomi Corporation and an alumnus of SEIT</p>
                </div>
              </a>
            </li>
          </ul>

        </section>
      </main>

      {wechatOpen && (
        <div className="wechat-backdrop" role="presentation" onMouseDown={() => setWechatOpen(false)}>
          <section
            className="wechat-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="wechat-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="wechat-close" type="button" aria-label="Close WeChat QR code" onClick={() => setWechatOpen(false)}>×</button>
            <p className="section-kicker">Connect</p>
            <h2 id="wechat-title">WeChat</h2>
            <Image src="/wechat.jpg" alt="Junhan Wang WeChat QR code" width={888} height={1191} unoptimized />
            <p>Scan the QR code to add me on WeChat.</p>
          </section>
        </div>
      )}

      <footer>
        <p>© {new Date().getFullYear()} Junhan Wang</p>
        <a href="#about">Back to top ↑</a>
      </footer>
    </>
  );
}
