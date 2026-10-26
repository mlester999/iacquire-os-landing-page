import Image from "next/image";
import { ArrowUpRightIcon, CheckIcon, SparkIcon } from "@/components/icons";

const columns = [
  { name: "Find", count: "04", items: ["Northstar Labs", "Morrow Studio"] },
  { name: "Qualify", count: "02", items: ["Signal Works", "Arbor Cloud"] },
  { name: "Book", count: "01", items: ["Discovery call"] },
];

export function HeroPreview() {
  return (
    <div className="hero-art" role="group" aria-label="Illustrative iAcquireOS dashboard preview with sample data">
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
      <div className="dashboard-frame">
        <div className="dashboard-topbar">
          <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
          <span>iAcquireOS <b>/</b> Workspace</span>
          <span className="preview-label"><i /> Illustrative preview · sample data</span>
        </div>
        <div className="dashboard-body">
          <aside className="dashboard-sidebar" aria-label="Illustrative dashboard menu">
            <span className="dash-logo">iA</span>
            <span className="dash-nav active"><b>◈</b><small>Overview</small></span>
            <span className="dash-nav"><b>⌕</b><small>Prospects</small></span>
            <span className="dash-nav"><b>▤</b><small>Pipeline</small></span>
            <span className="dash-nav"><b>◷</b><small>Calendar</small></span>
            <span className="dash-nav"><b>⌘</b><small>AI team</small></span>
          </aside>
          <div className="dashboard-main">
            <div className="dashboard-greeting">
              <div><span className="dash-caption">MONDAY · SAMPLE WORKSPACE</span><h3>Acquisition overview</h3></div>
              <span className="dash-date">Sample view <ArrowUpRightIcon /></span>
            </div>
            <div className="metric-row">
              <div className="metric-card"><span>New prospects <i>sample</i></span><b>12</b><small><span className="metric-dot blue-dot" /> Across 3 source lists</small></div>
              <div className="metric-card"><span>Needs review <i>sample</i></span><b>04</b><small><span className="metric-dot amber-dot" /> Human approval</small></div>
              <div className="metric-card"><span>Meetings <i>sample</i></span><b>02</b><small><span className="metric-dot green-dot" /> In this preview</small></div>
            </div>
            <div className="preview-workspace">
              <div className="pipeline-panel">
                <div className="panel-heading"><div><b>Pipeline</b><small>Sample opportunity flow</small></div><span className="subtle-action">View stages <ArrowUpRightIcon /></span></div>
                <div className="pipeline-columns">
                  {columns.map((column) => (
                    <div className="pipeline-column" key={column.name}>
                      <div className="pipeline-title"><span>{column.name}</span><b>{column.count}</b></div>
                      {column.items.map((item, index) => (
                        <div className="lead-row" key={item}>
                          <span className={`lead-avatar lead-avatar-${index}`}>{item.charAt(0)}</span>
                          <span><b>{item}</b><small>{index === 0 ? "Review fit" : "Sample record"}</small></span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="activity-panel">
                <div className="panel-heading"><div><b>Activity</b><small>Sample events</small></div><span className="activity-live">Illustrative</span></div>
                <div className="activity-list">
                  <div><span className="activity-icon icon-blue"><SparkIcon /></span><p><b>Lead Hunter</b><small>Prepared a source-checked record</small></p><time>09:42</time></div>
                  <div><span className="activity-icon icon-amber"><CheckIcon /></span><p><b>Human review</b><small>Approval requested before outreach</small></p><time>09:30</time></div>
                  <div><span className="activity-icon icon-green"><ArrowUpRightIcon /></span><p><b>Appointment Setter</b><small>Meeting time selected by prospect</small></p><time>09:18</time></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-footnote"><span><i /> People approve sensitive actions and customer commitments.</span><span>Illustrative UI · not a live product screenshot</span></div>
      </div>
      <div className="founder-float">
        <Image src="/images/argel-platon-portrait.jpg" width={56} height={56} alt="Argel Platon, founder of iAcquireOS" priority sizes="56px" />
        <div><small>Founder-led</small><b>Argel Platon</b></div>
        <span className="founder-online" aria-label="Based in the Philippines" title="Based in the Philippines" />
      </div>
      <div className="hero-side-note"><span className="note-icon"><CheckIcon /></span><span><b>One connected flow</b><small>Find · qualify · book · follow up</small></span></div>
    </div>
  );
}
