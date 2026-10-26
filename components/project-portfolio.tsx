"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRightIcon, CheckIcon } from "@/components/icons";
import { portfolioProjects, type PortfolioProject } from "@/lib/projects";
import { SectionHeading } from "@/components/section-heading";

const categories = ["All", "AI Automation", "AI Agents", "SaaS", "Shopify", "Workflow"] as const;
type Filter = (typeof categories)[number];

export function ProjectPortfolio() {
  const [filter, setFilter] = useState<Filter>("All");
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const filteredProjects = useMemo(
    () => filter === "All" ? portfolioProjects : portfolioProjects.filter((project) => project.category === filter),
    [filter],
  );
  const visibleProjects = filter === "All" && !showAll ? filteredProjects.slice(0, 6) : filteredProjects;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selectedProject && !dialog.open) {
      dialog.showModal();
      closeButtonRef.current?.focus();
    } else if (!selectedProject && dialog.open) {
      dialog.close();
    }
  }, [selectedProject]);

  const changeFilter = (next: Filter) => {
    setFilter(next);
    setShowAll(false);
  };

  return (
    <section className="section-pad section-portfolio" id="work">
      <div className="container">
        <SectionHeading
          eyebrow="Selected work"
          title={<>Systems and products <span className="gradient-text">we’ve built.</span></>}
          description="A selection of AI systems, automations, and digital products from previous and ongoing projects. Each example is attributed to its own product."
        />
        <div className="portfolio-note"><span className="note-mark"><CheckIcon /></span><p>Project examples are shown as portfolio work. They are not iAcquireOS product screenshots or performance claims.</p></div>
        <div className="portfolio-filters" role="group" aria-label="Filter project examples">
          {categories.map((category) => (
            <button
              className={`filter-chip${filter === category ? " is-active" : ""}`}
              type="button"
              key={category}
              aria-pressed={filter === category}
              onClick={() => changeFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <p className="portfolio-count" aria-live="polite">
          Showing {visibleProjects.length} of {filteredProjects.length} {filter === "All" ? "project examples" : `${filter} examples`}
        </p>
        <div className="project-grid">
          {visibleProjects.map((project, index) => (
            <button
              type="button"
              key={project.name}
              className="project-card"
              aria-haspopup="dialog"
              onClick={() => setSelectedProject(project)}
            >
              <span className={`project-emblem emblem-${index % 4}`} aria-hidden="true">
                <span>{project.name.slice(0, 1)}</span>
                <small>{project.category}</small>
              </span>
              <span className="project-content">
                <span className="project-title-row"><b>{project.name}</b><ArrowUpRightIcon /></span>
                <span className="project-summary">{project.summary}</span>
                <span className="tag-row">{project.tags.slice(0, 3).map((tag) => <span className="tag" key={tag}>{tag}</span>)}</span>
              </span>
            </button>
          ))}
        </div>
        {filter === "All" && filteredProjects.length > 6 ? (
          <div className="portfolio-more-wrap">
            <button className="button button-outline" type="button" onClick={() => setShowAll((shown) => !shown)}>
              {showAll ? "Show fewer projects" : `View all ${filteredProjects.length} projects`}
            </button>
          </div>
        ) : null}
        <dialog
          className="project-dialog"
          ref={dialogRef}
          aria-labelledby="project-dialog-title"
          onCancel={() => setSelectedProject(null)}
          onClose={() => setSelectedProject(null)}
          onClick={(event) => {
            if (event.target === dialogRef.current) setSelectedProject(null);
          }}
        >
          {selectedProject ? (
            <div className="dialog-inner">
              <button ref={closeButtonRef} className="dialog-close" type="button" aria-label="Close project details" onClick={() => setSelectedProject(null)}>×</button>
              <span className="eyebrow">{selectedProject.category} · selected build</span>
              <h3 id="project-dialog-title">{selectedProject.name}</h3>
              <p>{selectedProject.summary}</p>
              <ul className="dialog-details">
                {selectedProject.details.map((detail) => <li key={detail}><CheckIcon />{detail}</li>)}
              </ul>
              <div className="tag-row dialog-tags">{selectedProject.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
              <p className="dialog-note">This project example is separate from the iAcquireOS demo.</p>
            </div>
          ) : null}
        </dialog>
      </div>
    </section>
  );
}
