const { execSync } = require("child_process");

const run = (laneName, branchName, wsdir) => {
  // Change to working directory before running the commands
  const options = { cwd: wsdir, shell: "/bin/bash" };

  // Run the commands
  execSync("bit import -x", options);
  execSync(`bit lane import "${laneName}"`, options);
  execSync("bit init --reset-lane-new", options);

  // Set git configuration
  execSync(`git config --global user.name "${process.env.GIT_USER_NAME}"`, options);
  execSync(`git config --global user.email "${process.env.GIT_USER_EMAIL}"`, options);

  // Git operations
  execSync(`git checkout -b "${branchName}"`, options);
  execSync("git add .", options);
  
  try {
    execSync(
      `git commit -m "Committing the latest updates from lane: ${laneName} to the Git branch (automated) [skip-ci]"`,
      options
    );
  } catch (error) {
    console.error("Error while committing changes");
  }

  execSync(`git push origin "${branchName}" -f`, options);
};

module.exports = run;
