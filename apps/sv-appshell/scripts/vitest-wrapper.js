const { spawnSync } = require('child_process');

// Run vitest, explicitly IGNORING any additional arguments passed to this script
// (This swallows the phantom "run test" args from Moon/NPM)
console.log('> vitest run --passWithNoTests');
const result = spawnSync('npx', ['vitest', 'run', '--passWithNoTests'], { stdio: 'inherit', shell: true });

process.exit(result.status ?? 1);
