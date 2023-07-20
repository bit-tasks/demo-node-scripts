const { execSync } = require('child_process');

const run = (gName, gEmail, wsdir) => {
  execSync(`git config --global user.name "${gName}"`, { cwd: wsdir, shell: '/bin/bash' });
  execSync(`git config --global user.email "${gEmail}"`, { cwd: wsdir, shell: '/bin/bash' });
  execSync('git add .bitmap', { cwd: wsdir, shell: '/bin/bash' });

  try {
    execSync('git commit -m "update .bitmap with new component versions (automated). [skip-ci]"', { cwd: wsdir, shell: '/bin/bash' });
  } catch (error) {
    console.error(`Error while committing changes`);
  }
  execSync('git push', { cwd: wsdir, shell: '/bin/bash' });
}

module.exports = run;
