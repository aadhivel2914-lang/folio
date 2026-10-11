import { PortfolioData } from '../types/portfolio';
import { getCustomResume } from './storage';

export async function downloadResumeDocument(data: PortfolioData): Promise<void> {
  // 1. Check if user has uploaded a custom PDF in settings
  const customResume = await getCustomResume();
  if (customResume && customResume.data) {
    const url = URL.createObjectURL(customResume.data);
    const a = document.createElement('a');
    a.href = url;
    a.download = customResume.name || 'Aadhipradhap_V_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    return;
  }

  // 2. Otherwise generate a high-fidelity formatted resume document using printable HTML blob
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${data.personalInfo.name} - Resume</title>
  <style>
    @page {
      margin: 15mm 20mm;
      size: A4 portrait;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
      line-height: 1.45;
      margin: 0;
      padding: 24px;
      background: #ffffff;
      font-size: 13.5px;
    }
    .header {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 12px;
      margin-bottom: 16px;
    }
    .name {
      font-size: 26px;
      font-weight: 700;
      letter-spacing: -0.5px;
      color: #0f172a;
      margin: 0 0 4px 0;
    }
    .title {
      font-size: 14px;
      font-weight: 600;
      color: #059669;
      margin-bottom: 8px;
    }
    .contact-line {
      font-size: 12px;
      color: #475569;
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }
    .section-title {
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #0f172a;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 4px;
      margin-top: 16px;
      margin-bottom: 10px;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2px;
    }
    .item-title {
      font-weight: 600;
      color: #0f172a;
    }
    .item-sub {
      color: #334155;
      font-weight: 500;
    }
    .item-date {
      font-size: 12px;
      color: #64748b;
      font-variant-numeric: tabular-nums;
    }
    .item-score {
      font-size: 12px;
      color: #059669;
      font-weight: 600;
    }
    ul {
      margin: 4px 0 10px 0;
      padding-left: 20px;
    }
    li {
      margin-bottom: 3px;
      color: #334155;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: 140px 1fr;
      row-gap: 6px;
      column-gap: 12px;
      margin-top: 6px;
    }
    .skills-label {
      font-weight: 600;
      color: #0f172a;
    }
    .skills-content {
      color: #334155;
    }
    @media print {
      body { padding: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 class="name">${data.personalInfo.name}</h1>
    <div class="title">${data.personalInfo.title}</div>
    <div class="contact-line">
      <span><strong>Email:</strong> ${data.personalInfo.email}</span>
      <span><strong>Phone:</strong> ${data.personalInfo.phone}</span>
      <span><strong>Location:</strong> ${data.personalInfo.location}</span>
      <span><strong>LinkedIn:</strong> linkedin.com/in/aadhi-v-1468aa401</span>
    </div>
  </div>

  <div class="section-title">Professional Summary</div>
  <p style="margin: 4px 0 12px 0; color: #334155;">
    ${data.personalInfo.aboutStory}
  </p>

  <div class="section-title">Education</div>
  ${data.education.map(edu => `
    <div style="margin-bottom: 10px;">
      <div class="item-header">
        <span class="item-title">${edu.level}</span>
        <span class="item-date">${edu.period}</span>
      </div>
      <div class="item-header">
        <span class="item-sub">${edu.institution}</span>
        <span class="item-score">${edu.score}</span>
      </div>
      <p style="margin: 3px 0 0 0; font-size: 12px; color: #475569;">${edu.description}</p>
    </div>
  `).join('')}

  <div class="section-title">Internship Experience</div>
  <div>
    <div class="item-header">
      <span class="item-title">${data.internship.role}</span>
      <span class="item-date">${data.internship.period}</span>
    </div>
    <div class="item-header">
      <span class="item-sub">${data.internship.company} — ${data.internship.location}</span>
    </div>
    <ul>
      ${data.internship.highlights.map(h => `<li>${h}</li>`).join('')}
    </ul>
  </div>

  <div class="section-title">Key Projects</div>
  ${data.projects.map(p => `
    <div style="margin-bottom: 10px;">
      <div class="item-header">
        <span class="item-title">${p.title}</span>
        <span class="item-date">${p.technologies.join(', ')}</span>
      </div>
      <p style="margin: 2px 0 4px 0; color: #334155;">${p.description}</p>
      <ul>
        ${p.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
    </div>
  `).join('')}

  <div class="section-title">Technical Skills & Languages</div>
  <div class="skills-grid">
    <div class="skills-label">Languages:</div>
    <div class="skills-content">${data.skills.map(s => s.name).join(', ')}</div>
    <div class="skills-label">Human Languages:</div>
    <div class="skills-content">${data.personalInfo.languages.map(l => `${l.name} (${l.proficiency})`).join(', ')}</div>
    <div class="skills-label">Core Strengths:</div>
    <div class="skills-content">${data.strengths.map(s => s.title).join(', ')}</div>
  </div>

  <div class="section-title">Certifications</div>
  ${data.certifications.map(c => `
    <div style="margin-bottom: 6px;">
      <div class="item-header">
        <span class="item-title">${c.title} — ${c.issuer}</span>
        <span class="item-date">${c.issuePeriod}</span>
      </div>
      <p style="margin: 2px 0 0 0; font-size: 12px; color: #475569;">${c.description}</p>
    </div>
  `).join('')}

</body>
</html>
  `;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  // Open print dialogue or direct download
  const printWindow = window.open(url, '_blank');
  if (printWindow) {
    printWindow.onload = () => {
      printWindow.print();
    };
  } else {
    // If popups blocked, download as printable HTML resume
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.personalInfo.name.replace(/\s+/g, '_')}_Resume.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
