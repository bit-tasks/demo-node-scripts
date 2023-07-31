const { execSync } = require("child_process");

const run = async (gitUserName, gitUserEmail, wsdir) => {
  const branchName = "bit-dependency-update";

  execSync("bit checkout head --all", { cwd: wsdir, shell: "/bin/bash" }); // update workspace components
  execSync("bit envs update", { cwd: wsdir, shell: "/bin/bash" }); // update envs
  execSync("bit update -y", { cwd: wsdir, shell: "/bin/bash" }); // update external dependencies

  const options = {
    stdio: "pipe",
    encoding: "utf8",
    cwd: wsdir,
    shell: "/bin/bash",
  };

  const statusOutput = execSync("git status --porcelain", options);

  if (statusOutput) {
    execSync(`git config --global user.name "${gitUserName}"`, {
      cwd: wsdir,
      shell: "/bin/bash",
    });
    execSync(`git config --global user.email "${gitUserEmail}"`, {
      cwd: wsdir,
      shell: "/bin/bash",
    });
    execSync(`git checkout -b ${branchName}`, {
      cwd: wsdir,
      shell: "/bin/bash",
    });
    execSync("git add .", { cwd: wsdir, shell: "/bin/bash" });
    execSync(`git commit -m "Update Bit envs and outdated dependencies"`, {
      cwd: wsdir,
      shell: "/bin/bash",
    });
    execSync(`git push origin ${branchName} --force`, {
      cwd: wsdir,
      shell: "/bin/bash",
    });

    // Todo: Create a Pull Request using the API/CLI of your CI platform
  }
};

module.exports = run;
