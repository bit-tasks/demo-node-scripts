const { execSync } = require("child_process");

const run = (wsdir) => {
  const options = { cwd: wsdir, shell: "/bin/bash" };

  execSync(`git config --global user.name "${process.env.GIT_USER_NAME}"`, options);
  execSync(`git config --global user.email "${process.env.GIT_USER_EMAIL}"`, options);
  execSync("git add .bitmap", options);

  try {
    execSync(
      'git commit -m "update .bitmap with new component versions (automated). [skip-ci]"',
      options
    );
  } catch (error) {
    console.error("Error while committing changes");
  }
  
  execSync("git push", options);
};

module.exports = run;
