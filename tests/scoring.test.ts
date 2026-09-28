import { calculateEnforcedOverallScore } from '../src/services/nlpEngine';

export function runScoringTests() {
  const results: { name: string; passed: boolean; error?: string }[] = [];

  const test = (name: string, fn: () => void) => {
    try {
      fn();
      results.push({ name, passed: true });
    } catch (err: any) {
      results.push({ name, passed: false, error: err.message });
    }
  };

  test('Calculates exact 6-factor weighted formula correctly', () => {
    const scores = {
      skillMatch: 100,      // 40% -> 40
      experienceMatch: 80,  // 25% -> 20
      projectMatch: 80,     // 15% -> 12
      educationMatch: 90,   // 10% -> 9
      certificationMatch: 100, // 5% -> 5
      softSkillsMatch: 80,  // 5% -> 4
    };
    const overall = calculateEnforcedOverallScore(scores);
    // Expected: 40 + 20 + 12 + 9 + 5 + 4 = 90
    if (overall !== 90) throw new Error(`Expected 90, got ${overall}`);
  });

  test('Clamps score between 0 and 100', () => {
    const minScores = {
      skillMatch: 0,
      experienceMatch: 0,
      projectMatch: 0,
      educationMatch: 0,
      certificationMatch: 0,
      softSkillsMatch: 0,
    };
    const minOverall = calculateEnforcedOverallScore(minScores);
    if (minOverall !== 0) throw new Error(`Expected 0, got ${minOverall}`);

    const maxScores = {
      skillMatch: 100,
      experienceMatch: 100,
      projectMatch: 100,
      educationMatch: 100,
      certificationMatch: 100,
      softSkillsMatch: 100,
    };
    const maxOverall = calculateEnforcedOverallScore(maxScores);
    if (maxOverall !== 100) throw new Error(`Expected 100, got ${maxOverall}`);
  });

  test('Handles asymmetric weights properly (Skills 40% vs Certs 5%)', () => {
    const highSkill = calculateEnforcedOverallScore({
      skillMatch: 100,
      experienceMatch: 50,
      projectMatch: 50,
      educationMatch: 50,
      certificationMatch: 0,
      softSkillsMatch: 50,
    });
    // 40 + 12.5 + 7.5 + 5 + 0 + 2.5 = 67.5 -> 68

    const highCert = calculateEnforcedOverallScore({
      skillMatch: 0,
      experienceMatch: 50,
      projectMatch: 50,
      educationMatch: 50,
      certificationMatch: 100,
      softSkillsMatch: 50,
    });
    // 0 + 12.5 + 7.5 + 5 + 5 + 2.5 = 32.5 -> 33

    if (highSkill <= highCert) {
      throw new Error(`Skills (40%) must impact score substantially more than Certifications (5%). HighSkill: ${highSkill}, HighCert: ${highCert}`);
    }
  });

  return results;
}
