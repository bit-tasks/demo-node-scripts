const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function removeSchemeUrl(inputString) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return inputString.replace(urlRegex, '",');
}

function removeComments(jsonc) {
  return jsonc.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '');
}

const run = async (bitConfigUserToken, wsdir) => {
  const wsDirPath = path.resolve(wsdir);
  const wsFile = path.join(wsDirPath, "workspace.jsonc");
  const workspace = fs.readFileSync(wsFile).toString();
  const workspaceJson = removeComments(removeSchemeUrl(workspace));
  const workspaceObject = JSON.parse(workspaceJson);
  const defaultScope = workspaceObject['teambit.workspace/workspace'].defaultScope;
  const [org, scope] = defaultScope.split(".");
  process.env.ORG = org;
  process.env.SCOPE = scope;

  execSync("npx @teambit/bvm install", { shell: '/bin/bash' });
  process.env.PATH = `${process.env.HOME}/bin:` + process.env.PATH; // This step may change depending on your CI runner

  execSync("bit config set interactive false", { shell: '/bin/bash' });
  execSync("bit config set analytics_reporting false", { shell: '/bin/bash' });
  execSync("bit config set anonymous_reporting false", { shell: '/bin/bash' });
  execSync(`bit config set user.token ${bitConfigUserToken}`, { shell: '/bin/bash' });

  execSync("bit install", { cwd: wsdir, shell: '/bin/bash' });
};

module.exports = run;
