const { execSync } = require("child_process");

const run = (org, scope, lane, wsdir) => {
  const options = { cwd: wsdir, shell: "/bin/bash" };

  try {
    execSync(`bit lane remove "${org}.${scope}/${lane}" --remote --silent --force`, options);
  } catch (error) {
    console.error(`Error while removing bit lane: ${error}. Lane may not exist`);
  }
};

module.exports = run;
