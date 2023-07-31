const { execSync } = require("child_process");

const run = async (laneName, wsdir) => {
  execSync("bit status --strict", { cwd: wsdir, shell: "/bin/bash" });
  execSync(`bit lane create ${laneName}`, { cwd: wsdir, shell: "/bin/bash" });
  execSync('bit snap -m "CI"', { cwd: wsdir, shell: "/bin/bash" });
  execSync("bit export", { cwd: wsdir, shell: "/bin/bash" });
};

module.exports = run;
