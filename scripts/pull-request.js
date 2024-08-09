const { execSync } = require("child_process");

const run = (org, scope, lane, wsdir) => {
  const options = { cwd: wsdir, shell: "/bin/bash" };

  execSync("bit status --strict", options);
  execSync(`bit lane create "${lane}"`, options);
  execSync('bit snap -m "CI" --build', options);

  try {
    execSync(`bit lane remove "${org}.${scope}/${lane}" --remote --silent`, options);
  } catch (error) {
    console.error(`Error while removing bit lane: ${error}. Lane may not exist`);
  }
  
  execSync("bit export", options);
};

module.exports = run;
