const { execSync } = require("child_process");

const run = async (laneName, wsdir) => {
  const org = process.env.ORG; // Bit components default Org
  const scope = process.env.SCOPE; // Bit components default Scope

  try {
    execSync(
      `bit lane remove ${org}.${scope}/${laneName} --remote --silent`,
      { cwd: wsdir, shell: '/bin/bash' }
    );
  } catch (error) {
    console.error(`Error while removing bit lane: ${error}. Lane may not exist`);
  }

  execSync("bit status --strict", { cwd: wsdir, shell: '/bin/bash' });
  execSync(`bit lane create ${laneName}`, { cwd: wsdir, shell: '/bin/bash' });
  execSync('bit snap -m "CI"', { cwd: wsdir, shell: '/bin/bash' });
  execSync("bit export", { cwd: wsdir, shell: '/bin/bash' });
};

module.exports = run;
