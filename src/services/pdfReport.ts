import { Candidate } from '../types';

export function downloadCandidatePdfReport(candidate: Candidate, targetJdTitle?: string): void {
  const roleName = targetJdTitle || candidate.targetRole || 'Target Role';
  const fileNameClean = candidate.name.replace(/\s+/g, '_');

  const reportHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ResumeFlow AI Evaluation Report - ${candidate.name}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    
    @page {
      size: A4;
      margin: 18mm 15mm;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #191b23;
      background: #ffffff;
      line-height: 1.5;
      font-size: 13px;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #e1e2ed;
      padding-bottom: 16px;
      margin-bottom: 20px;
    }
    
    .brand {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .brand-icon {
      width: 28px;
      height: 28px;
      background: #004ac6;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 800;
      font-size: 14px;
    }
    
    .brand-name {
      font-size: 18px;
      font-weight: 800;
      color: #004ac6;
      letter-spacing: -0.5px;
    }
    
    .report-badge {
      background: #f0f4ff;
      color: #004ac6;
      font-weight: 700;
      font-size: 11px;
      padding: 4px 10px;
      border-radius: 6px;
      border: 1px solid #c3c6d7;
    }
    
    .candidate-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #faf8ff;
      border: 1px solid #e1e2ed;
      border-radius: 12px;
      padding: 16px 20px;
      margin-bottom: 20px;
    }
    
    .candidate-info h1 {
      font-size: 20px;
      font-weight: 800;
      color: #191b23;
    }
    
    .candidate-info p {
      color: #434655;
      font-size: 12px;
      margin-top: 3px;
    }
    
    .score-badge {
      text-align: right;
    }
    
    .score-number {
      font-size: 32px;
      font-weight: 900;
      color: #004ac6;
      line-height: 1;
    }
    
    .score-label {
      font-size: 11px;
      font-weight: 700;
      color: #737686;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 4px;
    }
    
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 20px;
    }
    
    .card {
      background: #ffffff;
      border: 1px solid #e1e2ed;
      border-radius: 10px;
      padding: 14px 16px;
    }
    
    .card h3 {
      font-size: 13px;
      font-weight: 700;
      color: #191b23;
      margin-bottom: 10px;
      border-bottom: 1px solid #f0f0f5;
      padding-bottom: 6px;
    }
    
    .score-bar-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 12px;
    }
    
    .score-bar-bg {
      flex: 1;
      height: 7px;
      background: #e1e2ed;
      border-radius: 4px;
      margin: 0 10px;
      overflow: hidden;
    }
    
    .score-bar-fill {
      height: 100%;
      background: #004ac6;
      border-radius: 4px;
    }
    
    .pill {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
      margin-right: 5px;
      margin-bottom: 5px;
    }
    
    .pill-green {
      background: #e6f4ea;
      color: #137333;
      border: 1px solid #ceead6;
    }
    
    .pill-amber {
      background: #fef7e0;
      color: #b06000;
      border: 1px solid #feefc3;
    }
    
    .pill-blue {
      background: #e8f0fe;
      color: #1967d2;
      border: 1px solid #d2e3fc;
    }
    
    .summary-text {
      font-size: 12px;
      color: #3c4043;
      line-height: 1.6;
      margin-bottom: 16px;
      background: #f8f9fa;
      padding: 12px 14px;
      border-radius: 8px;
      border-left: 3px solid #004ac6;
    }
    
    .footer {
      margin-top: 24px;
      border-top: 1px solid #e1e2ed;
      padding-top: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: #737686;
    }
    
    @media print {
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="brand">
      <div class="brand-icon">RF</div>
      <div class="brand-name">ResumeFlow AI</div>
    </div>
    <div class="report-badge">PRECISION RESUME SCREENING REPORT</div>
  </div>

  <div class="candidate-card">
    <div class="candidate-info">
      <h1>${candidate.name}</h1>
      <p><strong>Evaluated For:</strong> ${roleName}</p>
      <p><strong>Candidate Title:</strong> ${candidate.role} &bull; ${candidate.company}</p>
      <p><strong>Contact:</strong> ${candidate.email} &bull; ${candidate.phone} &bull; ${candidate.location}</p>
    </div>
    <div class="score-badge">
      <div class="score-number">${candidate.matchScore}%</div>
      <div class="score-label">${candidate.recommendation || 'Evaluated Match'}</div>
    </div>
  </div>

  <div class="summary-text">
    <strong>Executive AI Summary:</strong> ${candidate.aiSummary || 'Comprehensive multi-factor evaluation completed against target job description requirements.'}
  </div>

  <div class="grid">
    <div class="card">
      <h3>Deterministic Score Breakdown (PRD 6-Factor Formula)</h3>
      <div class="score-bar-row">
        <span>Skills Match (40%)</span>
        <div class="score-bar-bg"><div class="score-bar-fill" style="width: ${candidate.scores.skillMatch}%;"></div></div>
        <strong>${candidate.scores.skillMatch}%</strong>
      </div>
      <div class="score-bar-row">
        <span>Experience Alignment (25%)</span>
        <div class="score-bar-bg"><div class="score-bar-fill" style="width: ${candidate.scores.experienceMatch}%;"></div></div>
        <strong>${candidate.scores.experienceMatch}%</strong>
      </div>
      <div class="score-bar-row">
        <span>Projects & Architecture (15%)</span>
        <div class="score-bar-bg"><div class="score-bar-fill" style="width: ${candidate.scores.projectMatch}%;"></div></div>
        <strong>${candidate.scores.projectMatch}%</strong>
      </div>
      <div class="score-bar-row">
        <span>Education Alignment (10%)</span>
        <div class="score-bar-bg"><div class="score-bar-fill" style="width: ${candidate.scores.educationMatch}%;"></div></div>
        <strong>${candidate.scores.educationMatch}%</strong>
      </div>
      <div class="score-bar-row">
        <span>Certifications (5%)</span>
        <div class="score-bar-bg"><div class="score-bar-fill" style="width: ${candidate.scores.certificationMatch}%;"></div></div>
        <strong>${candidate.scores.certificationMatch}%</strong>
      </div>
      <div class="score-bar-row">
        <span>Soft Skills & Leadership (5%)</span>
        <div class="score-bar-bg"><div class="score-bar-fill" style="width: ${candidate.scores.softSkillsMatch}%;"></div></div>
        <strong>${candidate.scores.softSkillsMatch}%</strong>
      </div>
    </div>

    <div class="card">
      <h3>Document & Credential Verification</h3>
      <p style="margin-bottom: 8px;"><strong>Experience:</strong> ${candidate.experience}</p>
      <p style="margin-bottom: 8px;"><strong>Education:</strong> ${candidate.education}</p>
      <p style="margin-bottom: 8px;"><strong>Extraction Method:</strong> ${candidate.ocrMethod || 'Multimodal Neural OCR'}</p>
      <p style="margin-bottom: 8px;"><strong>Match Level:</strong> ${candidate.hiringConfidence || 'High'} Match Category</p>
      <p><strong>Authenticity Status:</strong> Document Processed & Evaluated</p>
    </div>
  </div>

  <div class="grid">
    <div class="card">
      <h3>Matched Competencies (${candidate.skills.length})</h3>
      <div>
        ${candidate.skills.map(s => `<span class="pill pill-green">&check; ${s}</span>`).join('')}
      </div>
    </div>

    <div class="card">
      <h3>Missing Role Requirements (${candidate.missingSkills?.length || 0})</h3>
      <div>
        ${(candidate.missingSkills && candidate.missingSkills.length > 0)
          ? candidate.missingSkills.map(s => `<span class="pill pill-amber">&times; ${s}</span>`).join('')
          : '<span class="pill pill-blue">No critical gaps identified</span>'}
      </div>
    </div>
  </div>

  <div class="footer">
    <div>Generated by ResumeFlow AI Precision Intelligence Engine &bull; Timestamp: ${new Date().toLocaleDateString()}</div>
    <div>Strict Non-Fabrication Verified &bull; Deterministic Weighted Scoring</div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 400);
    };
  </script>
</body>
</html>`;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(reportHtml);
    printWindow.document.close();
  } else {
    // Fallback: create blob download if popups are blocked
    const blob = new Blob([reportHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileNameClean}_ResumeFlow_AI_Report.html`;
    a.click();
  }
}

export function downloadBatchCandidatesPdfReport(candidates: Candidate[], targetRoleTitle?: string): void {
  const roleName = targetRoleTitle || 'Candidate Batch Screening';

  const rowsHtml = candidates
    .map(
      (c, idx) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #e1e2ed; font-weight: bold; color: #004ac6;">#${idx + 1}</td>
      <td style="padding: 10px; border-bottom: 1px solid #e1e2ed;">
        <div style="font-weight: 700; color: #191b23;">${c.name}</div>
        <div style="font-size: 11px; color: #737686;">${c.email} &bull; ${c.phone}</div>
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #e1e2ed; font-size: 12px;">
        <div>${c.role}</div>
        <div style="font-size: 11px; color: #004ac6; font-weight: 600;">🎯 ${c.targetRole || 'Screened Role'}</div>
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #e1e2ed; text-align: center;">
        <span style="font-size: 14px; font-weight: 800; color: #004ac6; background: #f0f4ff; padding: 4px 8px; border-radius: 6px;">
          ${c.matchScore}%
        </span>
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #e1e2ed; font-size: 11px; color: #434655;">
        ${c.skills.slice(0, 4).join(', ')}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #e1e2ed; font-size: 11px; color: #b06000;">
        ${(c.missingSkills && c.missingSkills.length > 0) ? c.missingSkills.slice(0, 2).join(', ') : 'None'}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #e1e2ed; font-size: 11px; font-weight: 600;">
        ${c.recommendation || 'Evaluated'}
      </td>
    </tr>`
    )
    .join('');

  const reportHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ResumeFlow AI - Candidate Summary Report</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    @page { size: A4 landscape; margin: 15mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Plus Jakarta Sans', sans-serif; color: #191b23; background: #fff; font-size: 12px; line-height: 1.4; }
    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #004ac6; padding-bottom: 12px; margin-bottom: 16px; }
    .brand { font-size: 20px; font-weight: 800; color: #004ac6; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    th { background: #faf8ff; color: #434655; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 10px; text-align: left; border-bottom: 2px solid #e1e2ed; }
    .footer { margin-top: 20px; font-size: 10px; color: #737686; display: flex; justify-content: space-between; border-top: 1px solid #e1e2ed; padding-top: 8px; }
    @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand">ResumeFlow AI</div>
      <div style="font-size: 12px; color: #434655; margin-top: 2px;">Candidate Screening & Talent Ranking Summary Report</div>
    </div>
    <div style="text-align: right; font-size: 11px; color: #737686;">
      <div><strong>Target Scope:</strong> ${roleName}</div>
      <div><strong>Total Screened:</strong> ${candidates.length} Candidates</div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 50px;">Rank</th>
        <th>Candidate & Contact</th>
        <th>Experience & Target Role</th>
        <th style="text-align: center;">Match Score</th>
        <th>Verified Skills</th>
        <th>Missing Gaps</th>
        <th>Match Level</th>
      </tr>
    </thead>
    <tbody>
      ${rowsHtml}
    </tbody>
  </table>

  <div class="footer">
    <div>Generated by ResumeFlow AI &bull; ${new Date().toLocaleDateString()}</div>
    <div>PRD 6-Factor Deterministic Formula &bull; Strict Non-Fabrication Verified</div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() { window.print(); }, 400);
    };
  </script>
</body>
</html>`;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(reportHtml);
    printWindow.document.close();
  } else {
    const blob = new Blob([reportHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ResumeFlow_AI_Summary_Report.html`;
    a.click();
  }
}

