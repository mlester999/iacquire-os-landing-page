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
          title="Systems & Products We’ve Built"
          description="AI systems, automations, and digital products we’ve built for previous and ongoing clients/businesses. Browse the full project archive and open each detailed case study."
        />
        <div className="portfolio-note"><span className="note-mark"><CheckIcon /></span><p>Project examples and status are from the Automate with Marky portfolio. They are not iAcquireOS product screenshots or performance claims. Case-study links open the full project write-up.</p></div>
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
                <span className="project-status">{project.status}</span>
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
              <span className="eyebrow">{selectedProject.category} · {selectedProject.status}</span>
              <h3 id="project-dialog-title">{selectedProject.name}</h3>
              <p>{selectedProject.description}</p>
              <div className="project-result"><span className="eyebrow">Result</span><p>{selectedProject.result}</p></div>
              <div className="tag-row dialog-tags">
                {[...new Set([...selectedProject.sourceCategories, ...selectedProject.tags])].map((tag) => <span className="tag" key={tag}>{tag}</span>)}
              </div>
              <a className="project-case-study-link" href={selectedProject.caseStudyUrl} target="_blank" rel="noreferrer">
                Read the full case study <ArrowUpRightIcon />
              </a>
              <p className="dialog-note">This project is separate from the iAcquireOS demo.</p>
            </div>
          ) : null}
        </dialog>
      </div>
    </section>
  );
}
