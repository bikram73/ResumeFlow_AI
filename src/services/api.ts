import { Candidate, JobDescription } from '../types';

export async function parseJobDescription(text?: string, fileData?: { name: string; mimeType: string; base64: string }): Promise<{ jd: JobDescription; rawText: string }> {
  try {
    const res = await fetch('/api/parse-jd', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, fileData }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || 'Failed to parse Job Description');
    }

    const data = await res.json();
    return {
      jd: data.jd,
      rawText: data.rawText || text || '',
    };
  } catch (err: any) {
    console.error('API parseJobDescription error:', err);
    throw err;
  }
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

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || 'Failed to analyze resumes');
    }

    const data = await res.json();
    return data.candidates || [];
  } catch (err: any) {
    console.error('API analyzeResumes error:', err);
    throw err;
  }
}

export async function exportCSV(candidates: Candidate[]): Promise<void> {
  try {
    const res = await fetch('/api/export/csv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ candidates }),
    });

    if (!res.ok) throw new Error('Failed to generate CSV');

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume_screening_report_${Date.now()}.csv`;
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
    const res = await fetch('/api/export/json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ candidates }),
    });

    if (!res.ok) throw new Error('Failed to generate JSON');

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume_screening_report_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (err: any) {
    console.error('JSON Export Error:', err);
    alert('Failed to export JSON: ' + err.message);
  }
}
