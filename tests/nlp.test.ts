import {
  calculateCosineSimilarity,
  normalizeSkill,
  extractCanonicalSkills,
  evaluateResumeAgainstJD
} from '../src/services/nlpEngine';

export function runNlpTests() {
  const results: { name: string; passed: boolean; error?: string }[] = [];

  const test = (name: string, fn: () => void) => {
    try {
      fn();
      results.push({ name, passed: true });
    } catch (err: any) {
      results.push({ name, passed: false, error: err.message });
    }
  };

  test('Calculates positive cosine similarity for semantically related texts', () => {
    const jd = 'Looking for an experienced React TypeScript engineer building frontend web applications with REST APIs.';
    const resume = 'Senior Frontend Developer with 5 years building scalable web applications in React and TypeScript with REST microservices.';
    const unrelated = 'Experienced accountant specialized in tax compliance, audit management, and corporate bookkeeping.';

    const simRelated = calculateCosineSimilarity(jd, resume);
    const simUnrelated = calculateCosineSimilarity(jd, unrelated);

    if (simRelated <= 0.2) throw new Error(`Expected high cosine similarity for related texts, got ${simRelated}`);
    if (simRelated <= simUnrelated) throw new Error(`Related text (${simRelated}) must score higher than unrelated text (${simUnrelated})`);
  });

  test('Canonicalizes skill synonyms and variations', () => {
    if (normalizeSkill('react.js') !== 'React') throw new Error('Failed to normalize react.js');
    if (normalizeSkill('reactjs') !== 'React') throw new Error('Failed to normalize reactjs');
    if (normalizeSkill('k8s') !== 'Kubernetes') throw new Error('Failed to normalize k8s');
    if (normalizeSkill('nodejs') !== 'Node.js') throw new Error('Failed to normalize nodejs');
    if (normalizeSkill('postgres') !== 'PostgreSQL') throw new Error('Failed to normalize postgres');
  });

  test('Extracts canonical skills from document text', () => {
    const resume = 'Extensive experience deploying microservices on k8s and aws using docker, written in python and ts.';
    const skills = extractCanonicalSkills(resume);

    if (!skills.includes('Kubernetes')) throw new Error('Failed to extract Kubernetes from k8s');
    if (!skills.includes('AWS')) throw new Error('Failed to extract AWS');
    if (!skills.includes('Docker')) throw new Error('Failed to extract Docker');
    if (!skills.includes('Python')) throw new Error('Failed to extract Python');
    if (!skills.includes('TypeScript')) throw new Error('Failed to extract TypeScript from ts');
  });

  test('Identifies missing required skills vs matched skills', () => {
    const jd = 'Required Skills: React, TypeScript, GraphQL, Docker, Kubernetes.';
    const resume = 'Frontend Engineer with React and TypeScript background.';
    
    const evalResult = evaluateResumeAgainstJD(resume, jd, 'candidate.pdf', ['React', 'TypeScript', 'GraphQL', 'Docker', 'Kubernetes']);

    if (!evalResult.matchedSkills.includes('React')) throw new Error('Missing React in matched');
    if (!evalResult.matchedSkills.includes('TypeScript')) throw new Error('Missing TypeScript in matched');
    if (!evalResult.missingRequiredSkills.includes('Docker')) throw new Error('Docker should be flagged as missing');
    if (!evalResult.missingRequiredSkills.includes('Kubernetes')) throw new Error('Kubernetes should be flagged as missing');
  });

  test('Yields different scores, missing skills, and recommendations when same resume is evaluated for different roles', () => {
    const designerResume = `
      Alex Chen - Staff Product Designer
      Experience: 8+ years designing design systems, Figma tokens, UI/UX architecture, user research, wireframing.
      Skills: Figma, Design Systems, UI/UX, Prototyping, Design Tokens, HTML, CSS.
      Education: Bachelor of Design & HCI.
    `;

    const designJd = `
      Senior Product Designer & AI Systems Lead
      Required Skills: Figma, Design Systems, UI/UX, Prototyping, HCI, Design Tokens.
      Responsibilities: Lead design systems, token architecture, and UX frameworks.
    `;

    const mlJd = `
      Senior Machine Learning & NLP Engineer
      Required Skills: PyTorch, TensorFlow, NLP, LLM, Transformers, RAG, CUDA, Python.
      Responsibilities: Build and fine-tune large language models and distributed ML pipelines.
    `;

    const evalForDesign = evaluateResumeAgainstJD(designerResume, designJd, 'Alex_Chen.pdf', ['Figma', 'Design Systems', 'UI/UX', 'Prototyping']);
    const evalForML = evaluateResumeAgainstJD(designerResume, mlJd, 'Alex_Chen.pdf', ['PyTorch', 'TensorFlow', 'NLP', 'LLM', 'Transformers', 'CUDA']);

    // The score for Design MUST be significantly higher than for ML
    if (evalForDesign.scores.overallScore <= evalForML.scores.overallScore) {
      throw new Error(`Design score (${evalForDesign.scores.overallScore}%) must be higher than ML score (${evalForML.scores.overallScore}%) for a Designer resume`);
    }

    if (evalForDesign.scores.overallScore < 85) {
      throw new Error(`Expected >= 85% for matching design role, got ${evalForDesign.scores.overallScore}%`);
    }

    if (evalForML.scores.overallScore > 65) {
      throw new Error(`Expected <= 65% for mismatched ML role, got ${evalForML.scores.overallScore}%`);
    }

    // Missing skills for ML should flag ML requirements (e.g. PyTorch, NLP, Transformers)
    if (!evalForML.missingRequiredSkills.some(s => ['PyTorch', 'TensorFlow', 'NLP', 'LLM'].includes(s))) {
      throw new Error('ML role evaluation should flag missing ML skills');
    }
  });

  return results;
}
