"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

const profile = {
  name: "Pushpak Jaju",
  title: "Software / Full-Stack / Data Engineer",
  headline:
    "I’m a full stack and data engineer who loves turning complex requirements into practical, scalable solutions.",
  location: "San Jose, CA, USA",
  email: "pushpak145@gmail.com",
  availability: "Open to full-time software, full-stack, and data engineer roles.",
};

const experiences = [
  {
    role: "Software Engineer",
    company: "MyAscend AI (startup)",
    period: "July 2025 — Nov 2025",
    description:
      "Built scalable authentication and onboarding with Next.js, Supabase, and Temporal — enabling passwordless login, smoother invitations, and reliable member data consistency."
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
      "GPA: 3.93/4.\nCoursework: Distributed Database Systems, Cloud Computing, Software Design, Foundations of Algorithms, Software Security, Statistical Machine Learning, Data Mining.",
  },
  {
    school: "Visvesvaraya Technological University",
    degree: "B.E. Computer Science",
    period: "Aug 2017 — Sept 2021",
    detail:
      "GPA: 3.6/4.\nCoursework: Operating Systems, Database Management Systems, Computer Networks, Machine Learning, Cloud Computing Platform.",
  },
];

const projects = [
  {
    name: "Serverless Video Analysis Platform",
    headline: "PaaS-based video analysis pipeline (final version).",
    description: "Upload video → process → face insights & metadata.",
    details:
      "This project is a cloud based face recognition system that processes user uploaded images or videos, extracts frames when needed, and identifies faces using a deep learning model. It stores both inputs and results in S3 for persistence, and uses scalable cloud compute to handle multiple requests efficiently without performance loss. The design ensures end to end automation, from receiving media to producing recognition output, while maintaining reliability and responsiveness under varying workloads.",
    tech: [
    "AWS Lambda",
    "Amazon S3",
    "Python",
    "REST APIs",
    "Serverless Architecture",
    "AWS IAM"],
    link: "#",
  },
  {
    name: "Swarm Intelligence-Based Distributed Database System",
    headline: "Self-optimizing distributed database using swarm intelligence.",
    description: "Self-optimizing distributed database using swarm intelligence.",
    details:
      "Designed and implemented a swarm intelligence–based distributed database system for large-scale IoT workloads. Built a MongoDB sharded cluster integrated with Kafka for real-time ingestion, where an Ant Colony Optimization (ACO) algorithm dynamically rebalanced data across shards based on system load, query latency, and resource utilization. Prometheus metrics were continuously monitored to guide optimization decisions, improving load distribution, fault tolerance, and query performance under changing workloads.",
    tech: [
      "Python",
      "MongoDB",
      "Apache Kafka",
      "Ant Colony Optimization (ACO)",
      "Prometheus",
      "Grafana",
      "Docker"
    ],
    link: "#",
  },
  {
    name: "From Bean to Brew",
    headline: "Interactive data story of coffee’s global journey.",
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
    tech: [
      "Android",
      "Java",
      "OpenCV",
      "SQLite",
      "Android Studio"
    ],
    link: "#"
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
  {
    title: "Frontend",
    items: ["TypeScript", "JavaScript", "React", "Angular", "HTML", "CSS"],
  },
  {
    title: "Backend",
    items: [
      "Python",
      "Java",
      "Node.js",
      "Django",
      "Flask",
      "Spring Boot",
      "REST APIs",
      "CI/CD Pipelines",
      "Jenkins",
      "SQL",
      "PostgreSQL",
      "MongoDB",
    ],
  },
  {
    title: "Data Engineering",
    items: [
      "Apache Spark",
      "Hadoop",
      "Kafka",
      "ETL",
      "Data Pipelines",
      "Tableau",
      "Power BI",
    ],
  },
  {
    title: "AI/ML",
    items: ["Pytorch", "Pandas", "Numpy", "Data Science", "Web Scraping"],
  },
  {
    title: "Cloud & DevOps",
    items: ["Google Cloud", "AWS", "Kubernetes", "Docker", "Git", "Jira"],
  },
];

type SectionProps = {
  id: string;
  title: string;
  eyebrow?: string;
  children: ReactNode;
};

function Section({ id, title, eyebrow, children }: SectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-24 md:snap-start min-h-[100svh] flex items-center justify-center px-4 py-10 md:py-14 lg:py-16"
    >
      <div className="w-full space-y-4 rounded-2xl border border-white/5 bg-white/5 bg-gradient-to-br from-white/5 to-white/0 p-6 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.7)] backdrop-blur">
        <div className="space-y-1">
          {eyebrow ? (
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
        </div>
        <div className="text-sm text-[var(--muted)] leading-relaxed">{children}</div>
      </div>
    </section>
  );
}

export default function Home() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [profilePreviewOpen, setProfilePreviewOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");
  const [openProject, setOpenProject] = useState<string | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const shouldShowStickyNav = activeSection !== "about";
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
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;

    const ids = ["about", "skills", "experience", "projects", "education", "contact"];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (best?.target?.id) setActiveSection(best.target.id);
      },
      {
        root,
        threshold: [0.35, 0.5, 0.65, 0.8],
      }
    );

    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="relative isolate overflow-hidden">
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
        <div className="sticky top-0 z-40 flex justify-center pt-4">
          <div
            className={`mt-0 w-full rounded-2xl border border-white/5 bg-black/50 px-4 py-3 backdrop-blur-md will-change-transform
transition-[opacity,transform,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              shouldShowStickyNav
                ? "opacity-100 translate-y-0 blur-0 pointer-events-auto"
                : "opacity-0 -translate-y-1.5 blur-[2px] pointer-events-none"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleNavClick("about")}
                className="text-sm font-semibold text-white"
              >
                {profile.name}
              </button>
              <div className="flex flex-wrap items-center gap-2 text-sm overflow-x-auto whitespace-nowrap">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`rounded-full border px-3 py-1 transition ${
                      activeSection === item.id
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
            </div>
          </div>
        </div>

        <div className="mt-20 mb-1 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-[0.35em] uppercase">
            Welcome
          </h1>
          <p className="mt-3 text-sm md:text-base text-[var(--muted)]">
            Actively job hunting, passively manifesting.
          </p>
        </div>

        <div className="h-8"></div>

        <Section id="about" title="About" eyebrow="Intro">
          <div className="grid items-start grid-cols-1 gap-6 md:grid-cols-[2fr_1fr]">
            <div className="space-y-4">
              <div className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-black/20 p-6 shadow-[0_10px_40px_-30px_rgba(0,0,0,0.7)]">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-between">
                  <div className="space-y-1">
                    <p className="text-sm uppercase tracking-[0.25em] text-[var(--muted)]">
                      Portfolio
                    </p>
                    <h1 className="text-3xl font-semibold text-white">Hi, I&apos;m {profile.name}.</h1>
                    <p className="text-base text-[var(--muted)]">{profile.title}</p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
                      <span className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-1">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_6px_rgba(16,185,129,0.16)]" />
                        {profile.availability}
                      </span>
                      <span className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-1">
                        <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_0_6px_rgba(122,215,240,0.16)]" />
                        {profile.location}
                      </span>
                      <span className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-1">
                        <span className="h-2 w-2 rounded-full bg-[var(--accent-strong)] shadow-[0_0_0_6px_rgba(159,122,234,0.16)]" />
                        {profile.email}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center sm:justify-end sm:self-stretch">
                    <button
                      type="button"
                      onClick={() => setProfilePreviewOpen(true)}
                      className="group relative h-100 sm:h-full w-40 rounded-3xl bg-gradient-to-br from-[var(--accent)]/30 via-white/10 to-[var(--accent-strong)]/30 p-[3px] shadow-[0_20px_60px_-35px_rgba(0,0,0,0.7)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-black cursor-zoom-in"
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-3xl bg-black/40">
                        <Image
                          src="/profile-new.jpg"
                          alt="Pushpak Jaju"
                          fill
                          className="object-cover object-bottom transition-transform duration-300 group-hover:scale-[1.03]"
                          sizes="160px"
                          priority
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-3 rounded-2xl border border-white/5 bg-black/20 p-4 shadow-[0_10px_40px_-30px_rgba(0,0,0,0.7)]">
                <div className="space-y-1">
                  <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">
                    What I’m looking for
                  </p>
                  <p className="text-base text-white">
                    Open to full-time software, full-stack, and data engineer roles.
                  </p>
                </div>
                <div className="space-y-2 text-sm text-[var(--muted)] leading-relaxed">
                  <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">
                    About me
                  </p>
                  <p>
                    I’m a passionate Software Engineer with hands-on experience building backend systems, scalable pipelines, and full-stack applications. 
                    Always learning and pushing toward bigger challenges, I’m motivated by turning ideas into practical, reliable solutions. 
                    Currently exploring new opportunities, sharpening my craft, and growing every day.

                    When I’m not coding, you’ll probably catch me experimenting in the kitchen, binge-watching anime, watching football(GGMU), 
                    or grinding competitive matches in Valorant.
                  </p>
                </div>
              </div>
            </div>

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
        </Section>

        <Section id="skills" title="Skills" eyebrow="Toolbox">
          <div className="space-y-4">
            {skillGroups.map((group) => (
              <div key={group.title} className="space-y-2">
                <p className="text-sm font-semibold text-white">{group.title}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--muted)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience" eyebrow="Track record">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {experiences.map((job) => (
              <div
                key={`${job.company}-${job.role}`}
                className="group relative overflow-hidden rounded-xl border border-white/5 bg-black/25 p-4 transition hover:-translate-y-[2px] hover:border-white/20"
              >
                <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                </div>

                <div className="relative space-y-2">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                    {job.period}
                  </p>

                  <div>
                    <h3 className="text-base font-semibold text-white">{job.role}</h3>
                    <p className="text-sm text-[var(--muted)]">{job.company}</p>
                  </div>

                  <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-3">
                    {job.description}
                  </p>

                  {/* optional */}
                  {/* <button className="text-xs text-white/80 hover:text-white">More</button> */}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="projects" title="Projects" eyebrow="Selected work">
          <div className="space-y-4">
            {/* Row 1: 2 cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {projects.slice(0, 2).map((project) => {
                const isOpen = openProject === project.name;

                return (
                  <button
                    key={project.name}
                    type="button"
                    onClick={() =>
                      setOpenProject(isOpen ? null : project.name)
                    }
                    className="group relative overflow-hidden rounded-xl border border-white/5 bg-black/25 p-4 text-left transition hover:-translate-y-[2px] hover:border-white/20"
                  >
                    {/* subtle hover glow */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                    </div>

                    {/* Default view */}
                    <div
                      className={`relative space-y-3 transition ${
                        isOpen ? "opacity-0 md:opacity-100" : "opacity-100"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {project.name}
                          </h3>
                          <p className="text-sm text-[var(--muted)]">
                            {project.description}
                          </p>
                        </div>
                        {/* <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--muted)]">
                          View
                        </span> */}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-[var(--muted)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hover/Tap overlay */}
                    <div
                      className={`
                        absolute inset-0 flex flex-col justify-between p-4
                        bg-black/70 backdrop-blur
                        opacity-0 pointer-events-none transition
                        group-hover:opacity-100 group-hover:pointer-events-auto
                        ${
                          isOpen
                            ? "opacity-100 pointer-events-auto md:opacity-0 md:pointer-events-none"
                            : ""
                        }
                      `}
                    >
                      <div className="space-y-2">
                        {/* <p className="text-xs uppercase tracking-[0.18em] text-white/70">
                          About
                        </p> */}
                        <div className="max-h-40 overflow-y-auto pr-1">
                          <p className="text-sm leading-relaxed text-white/90">
                            {project.details}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <span className="text-xs text-white/60">
                          Tap to close
                        </span>
                        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white">
                          Open
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Row 2: 3 cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {projects.slice(2).map((project) => {
                const isOpen = openProject === project.name;

                return (
                  <button
                    key={project.name}
                    type="button"
                    onClick={() =>
                      setOpenProject(isOpen ? null : project.name)
                    }
                    className="group relative overflow-hidden rounded-xl border border-white/5 bg-black/25 p-4 text-left transition hover:-translate-y-[2px] hover:border-white/20"
                  >
                    {/* subtle hover glow */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                    </div>

                    {/* Default view */}
                    <div
                      className={`relative space-y-3 transition ${
                        isOpen ? "opacity-0 md:opacity-100" : "opacity-100"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {project.name}
                          </h3>
                          <p className="text-sm text-[var(--muted)]">
                            {project.description}
                          </p>
                        </div>
                        {/* <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--muted)]">
                          View
                        </span> */}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-[var(--muted)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hover/Tap overlay */}
                    <div
                      className={`
                        absolute inset-0 flex flex-col justify-between p-4
                        bg-black/70 backdrop-blur
                        opacity-0 pointer-events-none transition
                        group-hover:opacity-100 group-hover:pointer-events-auto
                        ${
                          isOpen
                            ? "opacity-100 pointer-events-auto md:opacity-0 md:pointer-events-none"
                            : ""
                        }
                      `}
                    >
                      <div className="space-y-2">
                        {/* <p className="text-xs uppercase tracking-[0.18em] text-white/70">
                          About
                        </p> */}
                        <div className="max-h-40 overflow-y-auto pr-1">
                          <p className="text-sm leading-relaxed text-white/90">
                            {project.details}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <span className="text-xs text-white/60">
                          Tap to close
                        </span>
                        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white">
                          Open
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <p className="mt-3 text-xs text-[var(--muted)] md:hidden">
            Tip: tap a card to read more.
          </p>
        </Section>

        <Section id="education" title="Education" eyebrow="Foundations">
          <div className="space-y-4">
            {education.map((edu) => (
              <div
                key={edu.school}
                className="rounded-xl border border-white/5 bg-black/20 p-4 shadow-[0_10px_40px_-30px_rgba(0,0,0,0.7)] transition hover:-translate-y-[2px] hover:border-white/20"
              >
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">
                  {edu.period}
                </p>
                <h3 className="text-lg font-semibold text-white">{edu.school}</h3>
                <p className="text-sm text-[var(--muted)]">{edu.degree}</p>
                <p className="mt-1 whitespace-pre-line text-sm text-[var(--muted)]">
                  {edu.detail}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Contact" eyebrow="Let’s talk">
          <div className="flex flex-col gap-4 text-base text-[var(--muted)]">
            <div className="space-y-2">
              <p>
                 Have a role, project, or idea in mind? Send a quick note with a bit of
                 context and how I can help.
              </p>
              {/* <p className="text-sm">
                Prefer async? Share context and I&apos;ll follow up with next steps and a
                quick availability window.
              </p> */}
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/25 hover:-translate-y-[1px]"
              >
                Email {profile.email}
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setResumeOpen(true);
                }}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-white/25 hover:-translate-y-[1px]"
              >
                View resume
              </a>
              <a
                href="tel:+16232210674"
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-white/25 hover:-translate-y-[1px]"
              >
                Phone: +1-6232210674
              </a>
              <a
                href="https://www.linkedin.com/in/pushpak-jaju/"
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-white/25 hover:-translate-y-[1px]"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/Pushpak145"
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-white/25 hover:-translate-y-[1px]"
              >
                GitHub
              </a>
            </div>
          </div>
        </Section>
      </main>

      {resumeOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 px-4 py-8 backdrop-blur"
          role="dialog"
          aria-modal="true"
          aria-label="Resume"
        >
          <div className="relative w-full max-w-5xl rounded-2xl border border-white/10 bg-[#0c1225] p-4 shadow-2xl">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                  Resume
                </p>
                <p className="text-base font-semibold text-white">Pushpak Jaju</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/resume.pdf"
                  download
                  className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-slate-950 transition hover:-translate-y-[1px] hover:brightness-110"
                >
                  Download PDF
                </a>
                <button
                  type="button"
                  onClick={() => setResumeOpen(false)}
                  className="rounded-full border border-white/10 px-3 py-2 text-sm text-white transition hover:border-white/30"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="h-[80vh] overflow-hidden rounded-xl border border-white/10 bg-black/40">
              <iframe
                title="Resume PDF"
                src="/resume.pdf#toolbar=0&navpanes=0"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      ) : null}

      {profilePreviewOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
          onClick={() => setProfilePreviewOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Profile photo"
        >
          <div
            className="relative max-w-lg w-full max-h-[80vh] rounded-3xl overflow-hidden border border-white/10 bg-black/40"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/profile-new.jpg"
              alt="Pushpak Jaju"
              width={900}
              height={900}
              className="h-full w-full object-cover"
              priority
            />

            <button
              type="button"
              onClick={() => setProfilePreviewOpen(false)}
              className="absolute top-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white border border-white/20 hover:bg-black/90"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
