import { runScoringTests } from './scoring.test';
import { runNlpTests } from './nlp.test';
import { runNonFabricationTests } from './nonFabrication.test';
import { runExportTests } from './exports.test';

console.log('\n🧪 Running ResumeFlow AI Automated Verification Suite...\n');

const allResults = [
  ...runScoringTests().map(r => ({ ...r, suite: 'Deterministic Scoring & Formula' })),
  ...runNlpTests().map(r => ({ ...r, suite: 'NLP & Semantic Cosine Engine' })),
  ...runNonFabricationTests().map(r => ({ ...r, suite: 'Non-Fabrication & Privacy' })),
  ...runExportTests().map(r => ({ ...r, suite: 'Data Exports & Structure' })),
];

let passedCount = 0;
let failedCount = 0;

for (const r of allResults) {
  if (r.passed) {
    passedCount++;
    console.log(`  ✅ [${r.suite}] ${r.name}`);
  } else {
    failedCount++;
    console.error(`  ❌ [${r.suite}] ${r.name} — ERROR: ${r.error}`);
  }
}

console.log(`\n========================================`);
console.log(`Total Tests Executed: ${allResults.length}`);
console.log(`Passed: ${passedCount}`);
console.log(`Failed: ${failedCount}`);
console.log(`Status: ${failedCount === 0 ? '🎉 ALL TESTS PASSED' : '⚠️ FAILURES DETECTED'}`);
console.log(`========================================\n`);

if (failedCount > 0) {
  process.exit(1);
}
