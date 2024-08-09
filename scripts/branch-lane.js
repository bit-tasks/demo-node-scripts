const { execSync } = require("child_process");

const run = async (laneName, wsdir) => {
  const options = { cwd: wsdir, shell: "/bin/bash" };

  execSync("bit status --strict", options);
  execSync(`bit lane create "${laneName}"`, options);
  execSync('bit snap -m "CI" --build', options);
  execSync("bit export", options);
};

module.exports = run;
