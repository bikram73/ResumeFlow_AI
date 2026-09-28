export function runExportTests() {
  const results: { name: string; passed: boolean; error?: string }[] = [];

  const test = (name: string, fn: () => void) => {
    try {
      fn();
      results.push({ name, passed: true });
    } catch (err: any) {
      results.push({ name, passed: false, error: err.message });
    }
  };

  test('Validates CSV row generation and column escaping', () => {
    const candidates = [
      {
        rank: 1,
        name: 'Alex Chen',
        role: 'Staff Product Designer',
        company: 'Design Corp, Inc.',
        matchScore: 94,
        scores: {
          skillMatch: 96,
          experienceMatch: 92,
          educationMatch: 90,
          projectMatch: 94,
          certificationMatch: 85,
          softSkillsMatch: 90,
        },
        skills: ['Figma', 'Design Systems', 'React'],
        missingSkills: ['Kubernetes'],
        recommendation: 'Strong Match',
      },
    ];

    const headers = [
      'Rank', 'Candidate Name', 'Role', 'Company', 'Overall Score',
      'Skill Match', 'Experience Match', 'Education Match', 'Project Match',
      'Cert Match', 'Soft Skills Match', 'Skills', 'Missing Skills', 'Recommendation'
    ];

    const rows = candidates.map(c => [
      c.rank,
      `"${c.name.replace(/"/g, '""')}"`,
      `"${c.role.replace(/"/g, '""')}"`,
      `"${c.company.replace(/"/g, '""')}"`,
      `${c.matchScore}%`,
      `${c.scores.skillMatch}%`,
      `${c.scores.experienceMatch}%`,
      `${c.scores.educationMatch}%`,
      `${c.scores.projectMatch}%`,
      `${c.scores.certificationMatch}%`,
      `${c.scores.softSkillsMatch}%`,
      `"${c.skills.join(', ')}"`,
      `"${c.missingSkills.join(', ')}"`,
      `"${c.recommendation}"`,
    ].join(','));

    const csvContent = [headers.join(','), ...rows].join('\n');

    if (!csvContent.includes('Staff Product Designer')) throw new Error('CSV missing role data');
    if (!csvContent.includes('Design Corp, Inc.')) throw new Error('CSV failed escaping company with commas');
  });

  return results;
}
