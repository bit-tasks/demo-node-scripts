const { execSync } = require("child_process");

const run = (wsdir) => {
  const options = { cwd: wsdir, shell: "/bin/bash" };

  execSync('bit tag -m "CI" --build', options); // add --persist flag for soft tagging workflow
  execSync("bit export", options);
};

module.exports = run;
