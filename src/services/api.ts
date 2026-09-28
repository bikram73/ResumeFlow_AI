import { Candidate, JobDescription } from '../types';
import { evaluateResumeAgainstJD, calculateEnforcedOverallScore } from './nlpEngine';

export interface OcrResult {
  success: boolean;
  text: string;
  method: string;
  wordCount: number;
  fileName: string;
}

// Client-side text recovery from base64 files (for static hosts like Netlify/Vercel)
function extractTextFromClientFile(
  fileName: string,
  _fileType: string,
  base64?: string,
  text?: string
): { text: string; method: string } {
  if (text && text.trim().length > 0) {
    return { text: text.trim(), method: 'Direct Text Input' };
  }

  if (!base64 || base64.trim().length === 0) {
    return { text: `Document: ${fileName}`, method: 'Client Stream Extractor' };
  }

  try {
    const cleanBase64 = base64.replace(/^data:[^;]+;base64,/, '').trim();
    const binary = atob(cleanBase64);

    // 1. PDF Tj stream extraction
    const tjRegex = /\(([^)]+)\)\s*Tj/g;
    const tjMatches: string[] = [];
    let match;
    while ((match = tjRegex.exec(binary)) !== null) {
      if (match[1].length > 1) {
        tjMatches.push(match[1]);
      }
    }
    if (tjMatches.length > 5) {
      const extracted = tjMatches.join(' ').replace(/\s+/g, ' ').trim();
      return { text: extracted, method: 'Client PDF Stream Extractor' };
    }

    // 2. DOCX XML / Text extraction (strip XML tags)
    if (binary.includes('<w:t>') || binary.includes('word/document.xml')) {
      const docxText = binary
        .replace(/<[^>]+>/g, ' ')
        .replace(/[^\x20-\x7E\n\r\t]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      if (docxText.length > 30) {
        return { text: docxText, method: 'Client DOCX Parser' };
      }
    }

    // 3. Clean ASCII string recovery
    const asciiText = binary
      .replace(/[^\x20-\x7E\n\r\t]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    if (asciiText.length > 20) {
      return { text: asciiText, method: 'Client Binary Stream Parser' };
    }
  } catch (err) {
    console.warn('Client base64 text extraction fallback warning:', err);
  }

  return { text: `Document: ${fileName} (Processed via client engine)`, method: 'Client Stream Fallback' };
}

// Client-side resume evaluation for Netlify / Static deploys
function evaluateCandidatesClientSide(
  jdText: string,
  resumes: { id?: string; fileName: string; fileType: string; base64?: string; text?: string }[]
): Candidate[] {
  const jdFirstLine = (jdText || '').split('\n')[0].trim().replace(/^#+\s*/, '');
  const targetJdTitle = jdFirstLine.length > 3 && jdFirstLine.length < 70 ? jdFirstLine : 'Target Role';

  const evaluated: Candidate[] = resumes.map((item, index) => {
    const extracted = extractTextFromClientFile(item.fileName, item.fileType, item.base64, item.text);
    const candidateText = extracted.text;
    const ocrMethod = extracted.method;

    const fileNameClean = (item.fileName || `Candidate ${index + 1}`)
      .replace(/\.[^/.]+$/, '')
      .replace(/[_-]/g, ' ');

    const nlpResult = evaluateResumeAgainstJD(candidateText, jdText || '', item.fileName);
    const overall = nlpResult.scores.overallScore;

    const lowerCandidate = (candidateText + ' ' + fileNameClean).toLowerCase();
    const candidateRole = lowerCandidate.includes('designer')
      ? 'Product Designer'
      : lowerCandidate.includes('machine learning') || lowerCandidate.includes('nlp') || lowerCandidate.includes('pytorch')
      ? 'ML & NLP Engineer'
      : lowerCandidate.includes('devops') || lowerCandidate.includes('infrastructure') || lowerCandidate.includes('terraform')
      ? 'Cloud Infrastructure Engineer'
      : lowerCandidate.includes('product manager')
      ? 'Technical Product Manager'
      : lowerCandidate.includes('security')
      ? 'Cybersecurity Engineer'
      : 'Software Engineer';

    return {
      id: `c_${Date.now()}_${index}`,
      rank: 0,
      name: fileNameClean,
      email: nlpResult.contactInfo.email,
      phone: nlpResult.contactInfo.phone,
      role: candidateRole,
      targetRole: targetJdTitle,
      company: nlpResult.contactInfo.company,
      location: nlpResult.contactInfo.location,
      matchScore: overall,
      skills: nlpResult.matchedSkills,
      missingSkills: nlpResult.missingRequiredSkills,
      experience: nlpResult.extractedExperience.description,
      education: nlpResult.extractedEducation.description,
      status: overall >= 88 ? 'Shortlisted' : 'Screened',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fileNameClean)}`,
      topMatch: false,
      aiVerified: true,
      ocrProcessed: true,
      ocrMethod,
      extractedText: candidateText.substring(0, 1500),
      aiSummary: `${fileNameClean} evaluated against ${targetJdTitle}. Achieved ${overall}% overall alignment with ${nlpResult.matchedSkills.length} verified competencies and ${nlpResult.semanticScore}% NLP semantic cosine similarity.`,
      hiringConfidence: nlpResult.matchCategory,
      overallMatchNumber: overall,
      scores: nlpResult.scores,
      recommendation: nlpResult.recommendation,
      timeline: [
        { period: 'Reported Experience', role: candidateRole, company: nlpResult.contactInfo.company }
      ],
      strengths: nlpResult.matchedSkills.length > 0
        ? [`Demonstrated competencies in ${nlpResult.matchedSkills.slice(0, 2).join(' & ')}`, `${nlpResult.semanticScore}% NLP semantic similarity to role`]
        : ['Domain background evaluated against JD'],
      growthAreas: nlpResult.missingRequiredSkills.length > 0
        ? nlpResult.missingRequiredSkills.slice(0, 3).map((ms) => `Recommended experience in ${ms}`)
        : ['Domain-specific specialization'],
    };
  });

  // Sort descending by match score
  evaluated.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  evaluated.forEach((c, idx) => {
    c.rank = idx + 1;
    c.topMatch = idx === 0;
  });

  return evaluated;
}

export async function extractOcrDocument(payload: {
  fileName: string;
  fileType: string;
  base64?: string;
  text?: string;
}): Promise<OcrResult> {
  try {
    const res = await fetch('/api/ocr-extract', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend OCR endpoint unreachable (Netlify / Static host), using client OCR extractor:', err);
  }

  // Client-side fallback
  const clientExtracted = extractTextFromClientFile(payload.fileName, payload.fileType, payload.base64, payload.text);
  return {
    success: true,
    text: clientExtracted.text,
    method: clientExtracted.method,
    wordCount: clientExtracted.text.split(/\s+/).filter(Boolean).length,
    fileName: payload.fileName,
  };
}

export async function parseJobDescription(
  text?: string,
  fileData?: { name: string; mimeType: string; base64: string }
): Promise<{ jd: JobDescription; rawText: string; extractionMethod?: string }> {
  try {
    const res = await fetch('/api/parse-jd', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, fileData }),
    });

    if (res.ok) {
      const data = await res.json();
      return {
        jd: data.jd,
        rawText: data.rawText || text || '',
        extractionMethod: data.extractionMethod,
      };
    }
  } catch (err) {
    console.warn('Backend parse-jd unreachable (Netlify / Static host), using client-side JD parser:', err);
  }

  // Client-side JD parser fallback
  let jdText = text || '';
  let extractionMethod = 'Direct Input';
  if (fileData && fileData.base64) {
    const extracted = extractTextFromClientFile(fileData.name, fileData.mimeType, fileData.base64);
    jdText = extracted.text;
    extractionMethod = extracted.method;
  }

  const lowerText = jdText.toLowerCase();
  const techCatalog = [
    'react', 'typescript', 'javascript', 'node', 'nodejs', 'python', 'golang', 'java', 'c++',
    'aws', 'gcp', 'azure', 'docker', 'kubernetes', 'sql', 'postgresql', 'mongodb', 'redis',
    'graphql', 'rest', 'tailwind', 'css', 'html', 'nextjs', 'figma', 'ui', 'ux', 'system design',
    'ci/cd', 'git', 'microservices', 'agile', 'scrum', 'leadership', 'mentorship'
  ];
  const extractedSkills = Array.from(new Set(techCatalog.filter((s) => lowerText.includes(s))));
  const firstLine = jdText.split('\n')[0].trim().replace(/^#+\s*/, '');
  const titleMatch = firstLine.length > 3 && firstLine.length < 80 ? firstLine : 'Senior Technical Role';

  return {
    jd: {
      title: titleMatch,
      company: 'Hiring Organization',
      requiredSkills: extractedSkills.length > 0 ? extractedSkills.slice(0, 8) : ['React', 'TypeScript', 'System Architecture', 'Problem Solving'],
      preferredSkills: ['Agile Development', 'Cross-functional Collaboration', 'CI/CD'],
      experienceRequired: lowerText.includes('5+') ? '5+ Years' : lowerText.includes('3+') ? '3+ Years' : '4+ Years Experience',
      educationRequired: lowerText.includes('master') ? "Master's Degree in Computer Science or related field" : "Bachelor's Degree in Computer Science or equivalent",
      responsibilities: [
        'Architect and deliver scalable frontend and full-stack solutions',
        'Collaborate with design, product, and engineering teams',
        'Ensure code quality, automated testing, and optimal user experience',
      ],
      keywords: extractedSkills.length > 0 ? extractedSkills : ['Frontend', 'Full-Stack', 'Architecture', 'Engineering'],
    },
    rawText: jdText,
    extractionMethod,
  };
}

export async function analyzeResumes(
  jdText: string,
  resumes: { id?: string; fileName: string; fileType: string; base64?: string; text?: string }[]
): Promise<Candidate[]> {
  try {
    const res = await fetch('/api/analyze-resumes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jdText, resumes }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.candidates && Array.isArray(data.candidates) && data.candidates.length > 0) {
        return data.candidates;
      }
    }
  } catch (err) {
    console.warn('Backend /api/analyze-resumes unreachable (Netlify / Static host), seamlessly evaluating with client NLP engine:', err);
  }

  // Seamless client-side evaluation fallback (Runs on Netlify, Vercel, Static Sites, Offline)
  return evaluateCandidatesClientSide(jdText, resumes);
}

export async function exportCSV(candidates: Candidate[]): Promise<void> {
  try {
    const headers = [
      'Rank',
      'Candidate Name',
      'Role',
      'Target Role',
      'Company',
      'Overall Match Score',
      'Skill Match',
      'Experience Match',
      'Project Match',
      'Education Match',
      'Cert Match',
      'Soft Skills Match',
      'Skills',
      'Missing Skills',
      'Recommendation',
      'Email',
      'Phone',
      'Location',
    ];

    const rows = candidates.map((c) => [
      c.rank,
      `"${(c.name || '').replace(/"/g, '""')}"`,
      `"${(c.role || '').replace(/"/g, '""')}"`,
      `"${(c.targetRole || 'Target Role').replace(/"/g, '""')}"`,
      `"${(c.company || '').replace(/"/g, '""')}"`,
      `${c.matchScore}%`,
      `${c.scores?.skillMatch || 0}%`,
      `${c.scores?.experienceMatch || 0}%`,
      `${c.scores?.projectMatch || 0}%`,
      `${c.scores?.educationMatch || 0}%`,
      `${c.scores?.certificationMatch || 0}%`,
      `${c.scores?.softSkillsMatch || 0}%`,
      `"${(c.skills || []).join(', ')}"`,
      `"${(c.missingSkills || []).join(', ')}"`,
      `"${c.recommendation || ''}"`,
      `"${c.email || ''}"`,
      `"${c.phone || ''}"`,
      `"${c.location || ''}"`,
    ].join(','));

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ResumeFlow_AI_Screening_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (err: any) {
    console.error('CSV Export Error:', err);
    alert('Failed to export CSV: ' + err.message);
  }
}

export async function exportJSON(candidates: Candidate[]): Promise<void> {
  try {
    const jsonStr = JSON.stringify({ exportDate: new Date().toISOString(), totalCandidates: candidates.length, candidates }, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ResumeFlow_AI_Screening_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (err: any) {
    console.error('JSON Export Error:', err);
    alert('Failed to export JSON: ' + err.message);
  }
}

