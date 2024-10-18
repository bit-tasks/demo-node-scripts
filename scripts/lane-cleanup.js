const { execSync } = require("child_process");
const fetch = require('node-fetch');

const run = (org, scope, lane, wsdir, archive = false) => {
  const options = { cwd: wsdir, shell: "/bin/bash" };

  if (archive) {
    // Soft Delete
    archiveLane(`${org}.${scope}/${lane}`, process.env.BIT_CONFIG_USER_TOKEN)
      .catch(error => console.error(`Failed to archive lane via GraphQL: ${error.message}`));
  } else {
    // Hard Delete
    try {
      execSync(`bit lane remove "${org}.${scope}/${lane}" --remote --silent --force`, options);
    } catch (error) {
      console.error(`Error while removing bit lane: ${error}. Lane may not exist.`);
    }
  }
};

const archiveLane = (id, token) => {
  const query = `
    mutation DELETE_LANE($id: String!) {
      deleteLane(id: $id)
    }
  `;

  return fetch('https://api.v2.bit.cloud/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables: { id } }),
  }).then(response => response.json());
};

module.exports = run;
