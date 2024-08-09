const { execSync } = require("child_process");

const run = async (wsdir) => {
  const branchName = "bit-dependency-update";
  const options = {
    stdio: "pipe",
    encoding: "utf8",
    cwd: wsdir,
    shell: "/bin/bash",
  };

  // Run the Bit commands
  execSync("bit checkout head --all", options); // update workspace components
  execSync("bit envs update", options); // update envs
  execSync("bit update -y", options); // update external dependencies

  // Check for changes in the Git workspace
  const statusOutput = execSync("git status --porcelain", options);

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
