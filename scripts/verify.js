const { execSync } = require("child_process");

const run = (wsdir) => {
  const options = { cwd: wsdir, shell: "/bin/bash" };

  execSync("bit status --strict", options);
  execSync("bit build", options);
};

module.exports = run;
