import {
  extractContactInformation,
  extractExperienceDetails,
  extractEducationDetails,
  evaluateResumeAgainstJD
} from '../src/services/nlpEngine';

export function runNonFabricationTests() {
  const results: { name: string; passed: boolean; error?: string }[] = [];

  const test = (name: string, fn: () => void) => {
    try {
      fn();
      results.push({ name, passed: true });
    } catch (err: any) {
      results.push({ name, passed: false, error: err.message });
    }
  };

  test('Does not fabricate email or phone when absent from resume', () => {
    const bareResume = 'Software Engineer skilled in React and TypeScript. Delivered high-scale frontends.';
    const contact = extractContactInformation(bareResume);

    if (contact.email !== 'Not provided') {
      throw new Error(`Email must be 'Not provided' when missing, but got: ${contact.email}`);
    }
    if (contact.phone !== 'Not provided') {
      throw new Error(`Phone must be 'Not provided' when missing, but got: ${contact.phone}`);
    }
  });

  test('Extracts genuine email and phone when present', () => {
    const resume = 'Jane Doe\nEmail: jane.doe@example.org\nPhone: (415) 555-0199\nLocation: San Francisco, CA';
    const contact = extractContactInformation(resume);

    if (contact.email !== 'jane.doe@example.org') {
      throw new Error(`Expected jane.doe@example.org, got ${contact.email}`);
    }
    if (!contact.phone.includes('555-0199')) {
      throw new Error(`Expected phone containing 555-0199, got ${contact.phone}`);
    }
  });

  test('Does not fabricate location when absent', () => {
    const bareResume = 'Backend Engineer working on distributed systems.';
    const contact = extractContactInformation(bareResume);

    if (contact.location !== 'Not provided') {
      throw new Error(`Location must be 'Not provided' when missing, got: ${contact.location}`);
    }
  });

  test('Does not fabricate degrees when education section is missing', () => {
    const bareResume = 'Freelance developer building mobile applications.';
    const edu = extractEducationDetails(bareResume);

    if (edu.description !== 'Not determinable from resume') {
      throw new Error(`Education must state 'Not determinable from resume' when absent, got: ${edu.description}`);
    }
  });

  test('Does not fabricate years when experience tenure is missing', () => {
    const bareResume = 'Passionate developer interested in web technology.';
    const exp = extractExperienceDetails(bareResume);

    if (exp.years !== null) {
      throw new Error(`Years should be null when not explicitly mentioned, got: ${exp.years}`);
    }
  });

  return results;
}
