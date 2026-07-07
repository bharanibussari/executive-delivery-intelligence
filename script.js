const portfolioData = {
  metrics: [
    { label: 'Portfolio health', value: '72%', note: 'Weighted delivery confidence', tone: 'amber' },
    { label: 'Active projects', value: '6', note: 'Strategic initiatives in flight', tone: 'green' },
    { label: 'Approved budget', value: '£42.8m', note: 'FY26 delivery envelope', tone: 'green' },
    { label: 'Open risks', value: '11', note: '4 high severity items', tone: 'red' }
  ],
  snapshots: [
    { title: 'Customer migration', value: '2 weeks behind', detail: 'Data reconciliation defects are delaying pilot cohort readiness.', tone: 'amber' },
    { title: 'Benefits outlook', value: '£8.4m forecast', detail: 'Automation and channel shift benefits remain on target for Q4.', tone: 'green' },
    { title: 'Decision latency', value: '5 pending', detail: 'Architecture and funding decisions need executive review this month.', tone: 'red' }
  ],
  projects: [
    { name: 'Claims Modernisation', sponsor: 'COO', rag: 'amber', budget: 8.6, spent: 5.9, progress: 68, milestone: 'Pilot launch', due: 'Jul 2026', risks: 2, decision: 'Confirm release scope' },
    { name: 'Digital Customer Portal', sponsor: 'Chief Digital Officer', rag: 'green', budget: 6.4, spent: 3.7, progress: 58, milestone: 'Beta readiness', due: 'Aug 2026', risks: 1, decision: 'Approve content model' },
    { name: 'Finance ERP Stabilisation', sponsor: 'CFO', rag: 'red', budget: 9.2, spent: 8.8, progress: 82, milestone: 'Cutover rehearsal', due: 'Jul 2026', risks: 3, decision: 'Extend hypercare funding' },
    { name: 'Data Governance Uplift', sponsor: 'Chief Data Officer', rag: 'green', budget: 4.8, spent: 2.2, progress: 46, milestone: 'Policy adoption', due: 'Sep 2026', risks: 1, decision: 'Nominate domain owners' },
    { name: 'Contact Centre AI Assist', sponsor: 'CX Director', rag: 'amber', budget: 5.1, spent: 3.4, progress: 64, milestone: 'Agent training', due: 'Aug 2026', risks: 2, decision: 'Agree quality thresholds' },
    { name: 'Cyber Resilience Programme', sponsor: 'CISO', rag: 'green', budget: 8.7, spent: 4.1, progress: 52, milestone: 'Recovery exercise', due: 'Oct 2026', risks: 2, decision: 'Prioritise supplier testing' }
  ],
  risks: [
    { title: 'ERP cutover capacity gap', owner: 'CFO', severity: 'red', detail: 'Business SMEs are overallocated during rehearsal and month-end close.' },
    { title: 'Claims data quality defects', owner: 'COO', severity: 'amber', detail: 'Legacy policy records need cleansing before pilot migration can start.' },
    { title: 'AI assist adoption risk', owner: 'CX Director', severity: 'amber', detail: 'Frontline training completion is below the threshold for controlled rollout.' },
    { title: 'Supplier recovery evidence', owner: 'CISO', severity: 'amber', detail: 'Critical suppliers have not all confirmed recovery test windows.' }
  ],
  decisions: [
    { title: 'Release scope for Claims Modernisation', owner: 'Executive Committee', due: '12 Jul 2026', impact: 'Unblocks pilot launch planning and resource booking.' },
    { title: 'ERP hypercare funding extension', owner: 'CFO / COO', due: '15 Jul 2026', impact: 'Maintains specialist support through first reporting cycle.' },
    { title: 'Portal content operating model', owner: 'Chief Digital Officer', due: '22 Jul 2026', impact: 'Confirms ownership before beta publishing freeze.' },
    { title: 'Cyber supplier test prioritisation', owner: 'Risk Committee', due: '29 Jul 2026', impact: 'Focuses testing on most critical operational dependencies.' }
  ],
  timeline: [
    { date: 'Jul 2026', title: 'ERP cutover rehearsal', detail: 'Validate finance close, integrations and operational support model.' },
    { date: 'Aug 2026', title: 'Customer portal beta', detail: 'Launch controlled beta for priority customer journeys.' },
    { date: 'Sep 2026', title: 'Data governance adoption', detail: 'Confirm domain ownership and publish executive data quality scorecards.' },
    { date: 'Oct 2026', title: 'Cyber recovery exercise', detail: 'Run cross-supplier recovery exercise and board-level lessons review.' }
  ]
};

const currency = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 1 });
const byId = (id) => document.getElementById(id);

function renderMetrics() {
  byId('summaryMetrics').innerHTML = portfolioData.metrics.map((metric) => `
    <article class="metric-card">
      <span class="status-pill ${metric.tone}">${metric.tone}</span>
      <div class="metric-value">${metric.value}</div>
      <div class="metric-label">${metric.label}</div>
      <p class="metric-note">${metric.note}</p>
    </article>
  `).join('');
}

function renderSnapshots() {
  byId('snapshotCards').innerHTML = portfolioData.snapshots.map((snapshot) => `
    <article class="snapshot-card">
      <span class="status-pill ${snapshot.tone}">${snapshot.tone}</span>
      <h3>${snapshot.title}</h3>
      <strong>${snapshot.value}</strong>
      <p>${snapshot.detail}</p>
    </article>
  `).join('');
}

function renderProjects(filter = 'all') {
  const projects = filter === 'all' ? portfolioData.projects : portfolioData.projects.filter((project) => project.rag === filter);
  byId('projectCards').innerHTML = projects.map((project) => `
    <article class="project-card" data-rag="${project.rag}">
      <div class="project-top">
        <div>
          <h3>${project.name}</h3>
          <p>${project.sponsor}</p>
        </div>
        <span class="rag-badge ${project.rag}">${project.rag}</span>
      </div>
      <div>
        <div class="project-top">
          <strong>Budget used</strong>
          <span>${currency.format(project.spent)} / ${currency.format(project.budget)}</span>
        </div>
        <div class="budget-track" aria-label="${project.progress}% budget progress">
          <div class="budget-fill" style="width: ${project.progress}%"></div>
        </div>
      </div>
      <div class="project-meta">
        <span><strong>${project.milestone}</strong><br />Next milestone</span>
        <span><strong>${project.due}</strong><br />Due date</span>
        <span><strong>${project.risks}</strong><br />Open risks</span>
        <span><strong>${project.decision}</strong><br />Decision need</span>
      </div>
    </article>
  `).join('');
}

function renderRisks() {
  byId('riskList').innerHTML = portfolioData.risks.map((risk) => `
    <article class="list-item">
      <header><strong>${risk.title}</strong><span class="rag-badge ${risk.severity}">${risk.severity}</span></header>
      <p>${risk.detail}</p>
      <small>Owner: ${risk.owner}</small>
    </article>
  `).join('');
}

function renderDecisions() {
  byId('decisionList').innerHTML = portfolioData.decisions.map((decision) => `
    <article class="list-item">
      <header><strong>${decision.title}</strong><span>${decision.due}</span></header>
      <p>${decision.impact}</p>
      <small>Owner: ${decision.owner}</small>
    </article>
  `).join('');
}

function renderTimeline() {
  byId('timelineList').innerHTML = portfolioData.timeline.map((item) => `
    <article class="timeline-item">
      <div class="timeline-date">${item.date}</div>
      <span class="timeline-dot" aria-hidden="true"></span>
      <div class="timeline-content"><h3>${item.title}</h3><p>${item.detail}</p></div>
    </article>
  `).join('');
}

function bindFilters() {
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach((item) => item.classList.remove('active'));
      tab.classList.add('active');
      renderProjects(tab.dataset.filter);
    });
  });
}

renderMetrics();
renderSnapshots();
renderProjects();
renderRisks();
renderDecisions();
renderTimeline();
bindFilters();
