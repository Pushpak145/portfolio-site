"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

const profile = {
  name: "Pushpak Jaju",
  title: "Software / Full-Stack / Data Engineer",
  headline:
    "I'm a full stack and data engineer who loves turning complex requirements into practical, scalable solutions.",
  location: "San Jose, CA, USA",
  email: "pushpak145@gmail.com",
  availability: "Open to full-time software, full-stack, and data engineer roles.",
};

const experiences = [
  {
    role: "Software Engineer Intern",
    company: "MyAscend AI (startup)",
    period: "July 2025 — Dec 2025",
    description:
      "Built scalable authentication and onboarding with Next.js, Supabase, and Temporal — enabling passwordless login, smoother invitations, and reliable member data consistency.",
  },
  {
    role: "Software Engineer",
    company: "Arizona State University (EOSS Tech Team)",
    period: "June 2024 — May 2025",
    description:
      "Developed and enhanced a campus ride scheduling app in React/TypeScript, adding ride filtering, rescheduling, and admin tools to cut search time and increase student engagement.",
  },
  {
    role: "Data Engineer",
    company: "Cognizant",
    period: "Aug 2021 — Jul 2022",
    description:
      "Improved ETL workflows and stored procedures (~25% faster) and built APIs to sync SQL Server with Google BigQuery, reducing data errors with stronger validation and testing.",
  },
  {
    role: "Software Engineer Intern",
    company: "Cognizant",
    period: "Jan 2021 — Jul 2021",
    description:
      "Streamlined ETL with Informatica PowerCenter and overhauled an employee database system, improving query mechanisms for ~35% faster profile retrieval and better scalability.",
  },
];

const education = [
  {
    school: "Arizona State University",
    degree: "M.S. Computer Science",
    period: "Aug 2023 — May 2025",
    detail:
      "GPA: 3.93/4.0\nCoursework: Distributed Database Systems, Cloud Computing, Software Design, Foundations of Algorithms, Software Security, Statistical Machine Learning, Data Mining.",
  },
  {
    school: "Visvesvaraya Technological University",
    degree: "B.E. Computer Science",
    period: "Aug 2017 — Sept 2021",
    detail:
      "GPA: 3.6/4.0\nCoursework: Operating Systems, Database Management Systems, Computer Networks, Machine Learning, Cloud Computing Platform.",
  },
];

const projects = [
  {
    name: "Serverless Video Analysis Platform",
    headline: "PaaS-based video analysis pipeline (final version).",
    description: "Upload video → process → face insights & metadata.",
    details:
      "This project is a cloud based face recognition system that processes user uploaded images or videos, extracts frames when needed, and identifies faces using a deep learning model. It stores both inputs and results in S3 for persistence, and uses scalable cloud compute to handle multiple requests efficiently without performance loss. The design ensures end to end automation, from receiving media to producing recognition output, while maintaining reliability and responsiveness under varying workloads.",
    tech: ["AWS Lambda", "Amazon S3", "Python", "REST APIs", "Serverless Architecture", "AWS IAM"],
    link: "#",
  },
  {
    name: "Swarm Intelligence-Based Distributed Database System",
    headline: "Self-optimizing distributed database using swarm intelligence.",
    description: "Self-optimizing distributed database using swarm intelligence.",
    details:
      "Designed and implemented a swarm intelligence–based distributed database system for large-scale IoT workloads. Built a MongoDB sharded cluster integrated with Kafka for real-time ingestion, where an Ant Colony Optimization (ACO) algorithm dynamically rebalanced data across shards based on system load, query latency, and resource utilization. Prometheus metrics were continuously monitored to guide optimization decisions, improving load distribution, fault tolerance, and query performance under changing workloads.",
    tech: ["Python", "MongoDB", "Apache Kafka", "Ant Colony Optimization (ACO)", "Prometheus", "Grafana", "Docker"],
    link: "#",
  },
  {
    name: "From Bean to Brew",
    headline: "Interactive data story of coffee's global journey.",
    description: "Production, trade, consumption, and U.S. brand presence.",
    details:
      "Built an interactive data visualization project that tells the story of coffee from producing countries to global trade and consumption. The project includes animated and interactive visualizations such as a bubble chart for coffee production by country, a Sankey diagram for exporter–importer trade flows, a world map with a time slider to explore consumption trends, and a U.S. map showing coffee store distribution by brand. My primary contribution was the U.S. coffee store distribution view, built with interactive maps, brand filtering, and hover-based insights, integrated into a cohesive narrative-driven UI.",
    tech: ["React", "TypeScript", "JavaScript"],
    link: "#",
  },
  {
    name: "Mobile Health Monitoring App",
    headline: "Android app for heart rate, breathing rate, and symptom tracking.",
    description: "Camera + accelerometer based vital sign monitoring.",
    details:
      "Built an Android application that measures heart rate using the phone camera and flash, and respiratory rate using accelerometer data. Implemented video frame analysis with OpenCV to detect fingertip color variations for heart rate calculation, and a custom peak-detection algorithm for breathing rate estimation. Added symptom logging with a structured local database, enabling users to track vitals and symptoms over time through a clean, multi-screen Material Design UI.",
    tech: ["Android", "Java", "OpenCV", "SQLite", "Android Studio"],
    link: "#",
  },
  {
    name: "Phenotype Prediction using Genomic Data",
    headline: "ML-based phenotype prediction on yeast, rice, and wheat datasets.",
    description: "Predict traits from genotype markers using ML.",
    details:
      "Implemented a machine learning workflow to predict organism phenotypes using genotype datasets from yeast, rice, and wheat. Preprocessed genetic markers, applied multiple ML models, and benchmarked them to identify top-performing algorithms for trait prediction. Demonstrated that standard ML methods can outperform classical statistical genetics approaches using real-world datasets.",
    tech: ["Python", "Machine Learning", "Scikit-learn", "Data Visualization"],
    link: "#",
  },
];

const skillGroups = [
  { title: "Frontend", items: ["TypeScript", "JavaScript", "React", "Angular", "HTML", "CSS"] },
  {
    title: "Backend",
    items: ["Python", "Java", "Node.js", "Django", "Flask", "Spring Boot", "REST APIs", "CI/CD Pipelines", "Jenkins", "SQL", "PostgreSQL", "MongoDB"],
  },
  { title: "Data Engineering", items: ["Apache Spark", "Hadoop", "Kafka", "ETL", "Data Pipelines", "Tableau", "Power BI"] },
  { title: "AI/ML", items: ["Pytorch", "Pandas", "Numpy", "Data Science", "Web Scraping"] },
  { title: "Cloud & DevOps", items: ["Google Cloud", "AWS", "Kubernetes", "Docker", "Git", "Jira"] },
];

// ── Section wrapper (used for Skills, Experience, Projects, Education, Contact) ──
type SectionProps = { id: string; title: string; eyebrow?: string; children: ReactNode };

function Section({ id, title, eyebrow, children }: SectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-20 md:snap-start md:min-h-[100svh] flex items-center justify-center px-4 py-8 md:py-14 lg:py-16"
    >
      <div className="w-full space-y-4 rounded-2xl border border-white/5 bg-white/5 bg-gradient-to-br from-white/5 to-white/0 p-4 sm:p-6 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.7)] backdrop-blur">
        <div className="space-y-1">
          {eyebrow && (
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">{eyebrow}</p>
          )}
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
        </div>
        <div className="text-sm text-[var(--muted)] leading-relaxed">{children}</div>
      </div>
    </section>
  );
}

// ── Project card: tap-to-expand on mobile, hover on desktop ──
function ProjectCard({ project, isOpen, onToggle }: {
  project: typeof projects[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="group relative overflow-hidden rounded-xl border border-white/5 bg-black/25 p-4 text-left transition hover:-translate-y-[2px] hover:border-white/20 w-full"
    >
      {/* hover glow overlay bg */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
      </div>

      {/* Default view */}
      <div className={`relative space-y-3 transition ${isOpen ? "opacity-0 md:opacity-100" : "opacity-100"}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white leading-snug">{project.name}</h3>
            <p className="text-sm text-[var(--muted)] mt-0.5">{project.description}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-[var(--muted)]">
              {tech}
            </span>
          ))}
        </div>
        <p className="text-xs text-white/30 md:hidden">Tap to read more ↓</p>
      </div>

      {/* Detail overlay */}
      <div
        className={`
          absolute inset-0 flex flex-col justify-between p-4
          bg-black/80 backdrop-blur transition-opacity duration-200
          ${isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none md:group-hover:opacity-100 md:group-hover:pointer-events-auto"
          }
        `}
      >
        <div className="space-y-2 overflow-y-auto">
          <p className="text-sm leading-relaxed text-white/90">{project.details}</p>
        </div>
        <p className="md:hidden pt-3 flex-shrink-0 text-xs text-white/40">Tap to close</p>
      </div>
    </button>
  );
}

// ── Main page ──
export default function Home() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [profilePreviewOpen, setProfilePreviewOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");
  const [openProject, setOpenProject] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const [scrolledPastLanding, setScrolledPastLanding] = useState(false);
  const shouldShowStickyNav = scrolledPastLanding;
  const navItems = useMemo(
    () => [
      { id: "skills", label: "Skills" },
      { id: "experience", label: "Experience" },
      { id: "projects", label: "Projects" },
      { id: "education", label: "Education" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileNavOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Track active section via IntersectionObserver
  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;
    const ids = ["about", "skills", "experience", "projects", "education", "contact"];
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (best?.target?.id) setActiveSection(best.target.id);
      },
      { root, threshold: [0.35, 0.5, 0.65, 0.8] }
    );
    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Show nav once user scrolls past the Welcome+About snap-page
  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    const handler = () => {
      setScrolledPastLanding(main.scrollTop > main.clientHeight * 0.85);
    };
    main.addEventListener("scroll", handler, { passive: true });
    return () => main.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const handler = () => setMobileNavOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [mobileNavOpen]);

  return (
    <div className="relative isolate overflow-hidden">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[10%] top-[8%] h-64 w-64 rounded-full bg-[rgba(122,215,240,0.08)] blur-3xl" />
        <div className="absolute right-[5%] top-[2%] h-72 w-72 rounded-full bg-[rgba(159,122,234,0.08)] blur-3xl" />
        <div className="absolute bottom-[-10%] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[rgba(122,215,240,0.06)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.04),_transparent_40%)]" />
      </div>

      <main
        ref={mainRef}
        className="mx-auto flex h-[100svh] max-w-6xl flex-col gap-0 overflow-y-auto px-4 sm:px-6 scroll-smooth md:snap-y md:snap-mandatory"
      >
        {/* ── Sticky Nav ── */}
        <div className="sticky top-0 z-40 flex justify-center pt-4">
          <div
            className={`mt-0 w-full rounded-2xl border border-white/5 bg-black/50 px-3 sm:px-4 py-3 backdrop-blur-md will-change-transform
transition-[opacity,transform,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${shouldShowStickyNav
                ? "opacity-100 translate-y-0 blur-0 pointer-events-auto"
                : "opacity-0 -translate-y-1.5 blur-[2px] pointer-events-none"
              }`}
          >
            <div className="flex items-center justify-between gap-2">
              {/* Name */}
              <button
                type="button"
                onClick={() => handleNavClick("about")}
                className="text-sm font-semibold text-white truncate max-w-[120px] sm:max-w-none"
              >
                {profile.name}
              </button>

              {/* Desktop nav pills */}
              <div className="hidden sm:flex flex-wrap items-center gap-2 text-sm">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`rounded-full border px-3 py-1 transition ${activeSection === item.id
                        ? "border-white/25 bg-white/15 text-white"
                        : "border-white/10 bg-white/5 text-[var(--muted)] hover:border-white/20 hover:text-white"
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setResumeOpen(true)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[var(--muted)] transition hover:border-white/20 hover:text-white"
                >
                  Resume
                </button>
              </div>

              {/* Mobile: Resume + hamburger */}
              <div className="flex sm:hidden items-center gap-2">
                <button
                  type="button"
                  onClick={() => setResumeOpen(true)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--muted)]"
                >
                  Resume
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setMobileNavOpen((v) => !v); }}
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-[var(--muted)]"
                  aria-label="Open navigation"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect y="2" width="16" height="1.5" rx="0.75" fill="currentColor" />
                    <rect y="7.25" width="16" height="1.5" rx="0.75" fill="currentColor" />
                    <rect y="12.5" width="16" height="1.5" rx="0.75" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile nav dropdown */}
            {mobileNavOpen && (
              <div
                className="sm:hidden mt-3 pt-3 border-t border-white/10 flex flex-wrap gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`rounded-full border px-3 py-1.5 text-sm transition ${activeSection === item.id
                        ? "border-white/25 bg-white/15 text-white"
                        : "border-white/10 bg-white/5 text-[var(--muted)]"
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ══ Welcome + About — one snap-page on desktop, flex-col centred ══ */}
        <div className="md:snap-start md:min-h-[100svh] flex flex-col justify-center py-10 md:py-0">

          {/* Welcome banner */}
          <div className="mb-6 md:mb-10 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-[0.35em] uppercase">
              Welcome
            </h1>
            <p className="mt-3 text-sm md:text-base text-[var(--muted)]">
              Actively job hunting, passively manifesting.
            </p>
          </div>

          {/* About section card */}
          <section id="about" className="scroll-mt-20 w-full">
            <div className="w-full space-y-4 rounded-2xl border border-white/5 bg-white/5 bg-gradient-to-br from-white/5 to-white/0 p-4 sm:p-6 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.7)] backdrop-blur">
              <div className="space-y-1">
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">Intro</p>
                <h2 className="text-2xl font-semibold text-white">About</h2>
              </div>
              <div className="text-sm text-[var(--muted)] leading-relaxed">
                <div className="grid items-start grid-cols-1 gap-6 md:grid-cols-[2fr_1fr]">

                  {/* Left column */}
                  <div className="space-y-4">
                    {/* Name / title / badges card */}
                    <div className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-black/20 p-4 sm:p-6 shadow-[0_10px_40px_-30px_rgba(0,0,0,0.7)]">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch sm:justify-between">
                        <div className="space-y-2">
                          <p className="text-sm uppercase tracking-[0.25em] text-[var(--muted)]">Portfolio</p>
                          <h2 className="text-2xl sm:text-3xl font-semibold text-white">Hi, I&apos;m {profile.name}.</h2>
                          <p className="text-sm sm:text-base text-[var(--muted)]">{profile.title}</p>
                          <div className="flex flex-col sm:flex-row flex-wrap gap-2 text-xs text-[var(--muted)]">
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-1.5">
                              <span className="h-2 w-2 flex-shrink-0 rounded-full bg-emerald-400 shadow-[0_0_0_6px_rgba(16,185,129,0.16)]" />
                              <span className="leading-snug">Open to work</span>
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-1.5">
                              <span className="h-2 w-2 flex-shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_0_6px_rgba(122,215,240,0.16)]" />
                              {profile.location}
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-1.5">
                              <span className="h-2 w-2 flex-shrink-0 rounded-full bg-[var(--accent-strong)] shadow-[0_0_0_6px_rgba(159,122,234,0.16)]" />
                              {profile.email}
                            </span>
                          </div>
                        </div>

                        {/* Profile photo */}
                        <div className="flex justify-center sm:justify-end sm:self-stretch">
                          <button
                            type="button"
                            onClick={() => setProfilePreviewOpen(true)}
                            className="group relative h-48 sm:h-full w-36 sm:w-40 flex-shrink-0 rounded-3xl bg-gradient-to-br from-[var(--accent)]/30 via-white/10 to-[var(--accent-strong)]/30 p-[3px] shadow-[0_20px_60px_-35px_rgba(0,0,0,0.7)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-black cursor-zoom-in"
                          >
                            <div className="relative h-full w-full overflow-hidden rounded-3xl bg-black/40">
                              <Image
                                src="/profile-new.jpg"
                                alt="Pushpak Jaju"
                                fill
                                className="object-cover object-bottom transition-transform duration-300 group-hover:scale-[1.03]"
                                sizes="(max-width: 640px) 144px, 160px"
                                priority
                              />
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* About me card */}
                    <div className="space-y-3 rounded-2xl border border-white/5 bg-black/20 p-4 shadow-[0_10px_40px_-30px_rgba(0,0,0,0.7)]">
                      <div className="space-y-1">
                        <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">What I&apos;m looking for</p>
                        <p className="text-base text-white">Open to full-time software, full-stack, and data engineer roles.</p>
                      </div>
                      <div className="space-y-2 text-sm text-[var(--muted)] leading-relaxed">
                        <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">About me</p>
                        <p>
                          I&apos;m a passionate Software Engineer with hands-on experience building backend systems, scalable pipelines, and full-stack applications.
                          Always learning and pushing toward bigger challenges, I&apos;m motivated by turning ideas into practical, reliable solutions.
                          Currently exploring new opportunities, sharpening my craft, and growing every day.

                          When I&apos;m not coding, you&apos;ll probably catch me experimenting in the kitchen, binge-watching anime, watching football(GGMU),
                          or grinding competitive matches in Valorant.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Desktop-only sidebar nav */}
                  <div className="hidden h-fit flex-col self-start md:self-center gap-4 rounded-2xl border border-white/5 bg-black/20 p-6 shadow-[0_10px_40px_-30px_rgba(0,0,0,0.7)] md:flex">
                    <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">Navigate</p>
                    <div className="flex flex-col gap-4 items-stretch">
                      {navItems.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleNavClick(item.id)}
                          className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-base font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>
        </div>
        {/* ══ end Welcome + About ══ */}

        {/* ── Skills ── */}
        <Section id="skills" title="Skills" eyebrow="Toolbox">
          <div className="space-y-4">
            {skillGroups.map((group) => (
              <div key={group.title} className="space-y-2">
                <p className="text-sm font-semibold text-white">{group.title}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span key={skill} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--muted)]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Experience ── */}
        <Section id="experience" title="Experience" eyebrow="Track record">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {experiences.map((job) => (
              <div
                key={`${job.company}-${job.role}`}
                className="group relative overflow-hidden rounded-xl border border-white/5 bg-black/25 p-4 transition hover:-translate-y-[2px] hover:border-white/20"
              >
                <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                </div>
                <div className="relative space-y-2">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">{job.period}</p>
                  <div>
                    <h3 className="text-base font-semibold text-white">{job.role}</h3>
                    <p className="text-sm text-[var(--muted)]">{job.company}</p>
                  </div>
                  <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-3">{job.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Projects ── */}
        <Section id="projects" title="Projects" eyebrow="Selected work">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {projects.slice(0, 2).map((project) => (
                <ProjectCard
                  key={project.name}
                  project={project}
                  isOpen={openProject === project.name}
                  onToggle={() => setOpenProject(openProject === project.name ? null : project.name)}
                />
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {projects.slice(2).map((project) => (
                <ProjectCard
                  key={project.name}
                  project={project}
                  isOpen={openProject === project.name}
                  onToggle={() => setOpenProject(openProject === project.name ? null : project.name)}
                />
              ))}
            </div>
          </div>
        </Section>

        {/* ── Education ── */}
        <Section id="education" title="Education" eyebrow="Foundations">
          <div className="space-y-4">
            {education.map((edu) => (
              <div
                key={edu.school}
                className="rounded-xl border border-white/5 bg-black/20 p-4 shadow-[0_10px_40px_-30px_rgba(0,0,0,0.7)] transition hover:-translate-y-[2px] hover:border-white/20"
              >
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">{edu.period}</p>
                <h3 className="text-base sm:text-lg font-semibold text-white mt-1">{edu.school}</h3>
                <p className="text-sm text-[var(--muted)]">{edu.degree}</p>
                <p className="mt-1 whitespace-pre-line text-sm text-[var(--muted)]">{edu.detail}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Contact ── */}
        <Section id="contact" title="Contact" eyebrow="Let's talk">
          <div className="flex flex-col gap-4 text-base text-[var(--muted)]">
            <p>
              Have a role, project, or idea in mind? Send a quick note with a bit of context and how I can help.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={`https://mail.google.com/mail/?view=cm&to=${profile.email}`} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/25 hover:-translate-y-[1px]">
                Email me
              </a>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); setResumeOpen(true); }}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-white/25 hover:-translate-y-[1px]"
              >
                View resume
              </a>
              <a href="tel:+16232210674" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-white/25 hover:-translate-y-[1px]">
                Call me
              </a>
              <a href="https://www.linkedin.com/in/pushpak-jaju/" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-white/25 hover:-translate-y-[1px]">
                LinkedIn
              </a>
              <a href="https://github.com/Pushpak145" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-white/25 hover:-translate-y-[1px]">
                GitHub
              </a>
            </div>
          </div>
        </Section>
      </main>

      {/* ── Resume Modal ── */}
      {resumeOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 px-0 sm:px-4 py-0 sm:py-8 backdrop-blur"
          role="dialog"
          aria-modal="true"
          aria-label="Resume"
          onClick={() => setResumeOpen(false)}
        >
          <div
            className="relative w-full sm:max-w-5xl rounded-t-2xl sm:rounded-2xl border border-white/10 bg-[#0c1225] p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Resume</p>
                <p className="text-base font-semibold text-white">Pushpak Jaju</p>
              </div>
              <div className="flex items-center gap-2">
                <a href="/resume.pdf" download className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-slate-950 transition hover:-translate-y-[1px] hover:brightness-110">
                  Download PDF
                </a>
                <button type="button" onClick={() => setResumeOpen(false)} className="rounded-full border border-white/10 px-3 py-2 text-sm text-white transition hover:border-white/30">
                  Close
                </button>
              </div>
            </div>
            {/* Mobile: download prompt */}
            <div className="block sm:hidden rounded-xl border border-white/10 bg-black/40 p-6 text-center space-y-4">
              <p className="text-sm text-[var(--muted)]">PDF preview isn&apos;t great on mobile. Download to view the full resume.</p>
              <a href="/resume.pdf" download className="inline-block rounded-full bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-slate-950">
                Download Resume PDF
              </a>
            </div>
            {/* Desktop: iframe */}
            <div className="hidden sm:block h-[80vh] overflow-hidden rounded-xl border border-white/10 bg-black/40">
              <iframe title="Resume PDF" src="/resume.pdf#toolbar=0&navpanes=0" className="h-full w-full" />
            </div>
          </div>
        </div>
      )}

      {/* ── Profile Photo Modal ── */}
      {profilePreviewOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-6"
          onClick={() => setProfilePreviewOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Profile photo"
        >
          <div
            className="relative max-w-sm w-full max-h-[80vh] rounded-3xl overflow-hidden border border-white/10 bg-black/40"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src="/profile-new.jpg" alt="Pushpak Jaju" width={900} height={900} className="h-full w-full object-cover" priority />
            <button
              type="button"
              onClick={() => setProfilePreviewOpen(false)}
              className="absolute top-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white border border-white/20 hover:bg-black/90"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
