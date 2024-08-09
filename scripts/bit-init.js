const { execSync } = require("child_process");

const run = async (wsdir) => {
  const options = { cwd: wsdir, shell: "/bin/bash" };
  const bitVersion = "0.2.8"; // Leave empty for latest version
  
  // Install bvm globally
  await execSync("npm i -g @teambit/bvm", options);
  
  // Install the specified Bit version or the latest version
  const installCommand = bitVersion ? `bvm install ${bitVersion} --use-system-node` : `bvm install --use-system-node`;
  await execSync(installCommand, options);
  
  // Update PATH environment variable
  process.env.PATH = `${process.env.HOME}/bin:` + process.env.PATH; // This step may change depending on your CI runner

  // Run bit install
  execSync("bit install", options);
};

module.exports = run;
