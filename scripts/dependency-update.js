const { execSync } = require("child_process");

const run = async (wsdir) => {
  // Define the branch name for dependency updates
  const branchName = "bit-dependency-update";
  
  // Options for running shell commands in the specified working directory
  const options = {
    stdio: "pipe",
    encoding: "utf8",
    cwd: wsdir,
    shell: "/bin/bash",
  };

  // Checkout the latest versions of all workspace components
  execSync("bit checkout head --all", options);

  // Update environment dependencies. You can optionally use a glob pattern to filter specific components if needed
  execSync("bit envs update", options);

  // Update external dependencies. You can optionally specify a version-update-policy (e.g., patch, minor, major, or semver)
  execSync("bit update -y", options);

  // Check for changes in the Git workspace
  const statusOutput = execSync("git status --porcelain", options);

  // If there are changes in the Git workspace, proceed to commit and push the changes
  if (statusOutput) {
    execSync(`git config --global user.name "${process.env.GIT_USER_NAME}"`, options);
    execSync(`git config --global user.email "${process.env.GIT_USER_EMAIL}"`, options);
    execSync(`git checkout -b "${branchName}"`, options);
    execSync("git add .", options);
    execSync(`git commit -m "Update Bit envs and outdated dependencies"`, options);
    execSync(`git push origin "${branchName}" --force`, options);

    // Todo: Create a Pull Request using the API/CLI of your CI platform
  }
};

module.exports = run;
