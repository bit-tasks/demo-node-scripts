const { execSync } = require('child_process');

const run = (wsdir) => {
  execSync('bit tag -m "CI"', { cwd: wsdir, shell: '/bin/bash' });
  execSync('bit export', { cwd: wsdir, shell: '/bin/bash' });
}

module.exports = run;
