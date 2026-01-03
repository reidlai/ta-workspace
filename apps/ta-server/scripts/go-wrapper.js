const { spawnSync } = require('child_process');

// Determine command based on script name or input arg
// Usage: node go-wrapper.js <build|test>
const mode = process.argv[2];

let cmd = 'go';
let args = [];

if (mode === 'test') {
    args = ['test', './...'];
} else if (mode === 'build') {
    args = ['build', '-o', 'ta-server.exe', '.'];
} else {
    console.error('Usage: node go-wrapper.js <build|test>');
    process.exit(1);
}

// Execute go command, explicitly IGNORING any additional arguments passed to this script
// (This swallows the phantom "run test" args from Moon/NPM)
console.log(`> go ${args.join(' ')}`);
const result = spawnSync(cmd, args, { stdio: 'inherit', shell: true });

process.exit(result.status ?? 1);
