const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const run = async (wsdir) => {
  var bitConfigUserToken = process.env.BIT_CONFIG_USER_TOKEN;
  execSync("npx @teambit/bvm install", { shell: '/bin/bash' });
  process.env.PATH = `${process.env.HOME}/bin:` + process.env.PATH; // This step may change depending on your CI runner

  execSync("bit config set interactive false", { shell: '/bin/bash' });
  execSync("bit config set analytics_reporting false", { shell: '/bin/bash' });
  execSync("bit config set anonymous_reporting false", { shell: '/bin/bash' });
  execSync(`bit config set user.token ${bitConfigUserToken}`, { shell: '/bin/bash' });

  execSync("bit install", { cwd: wsdir, shell: '/bin/bash' });
};

module.exports = run;
