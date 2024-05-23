const path = require('path');
const fs = require('fs');

/**
 * This function returns the value of the client payload from the context.
 *
 * @param {Object} args - The arguments object.
 * @param {Object} args.github - The GitHub object.
 * @param {import('@octokit/rest').Octokit} args.github.rest - The GitHub SDK instance.
 * @param {import('@actions/github').Context} args.context - The context of the GitHub action.
 * @returns {any} The value of the client payload.
 */
module.exports = async ({ github, context }) => {
    async function getAllReposForOrg(org) {
        let repos = [];
        let page = 1;

        while (true) {
            const response = await github.rest.repos.listForOrg({
                org: org,
                type: 'public',
                per_page: 100,
                page: page
            });

            if (response.data.length === 0) break; // No more repos to retrieve

            repos = repos.concat(response.data);
            page++;
        }

        return repos;
    }

    // read the modified samples
    let modified = fs.readFileSync(path.join('..', 'modified.txt'), 'utf8').trim();

    console.log('@@ modified: ', modified);

    if (!modified) {
        return;
    }


    const repos = await getAllReposForOrg('DefangLabs');
    const repoNames = repos.map(r => r.name);
    console.log('@@ repos: ', repoNames);

    const modifiedSamples = modified.split('\n').map(s => s.split('/')?.[1])

    // for earch sample, create or update the template repo
    for (const sample of modifiedSamples) {
        const templateRepo = `sample-${sample}-template`;
        if (!repoNames.includes(templateRepo)) {
            console.log(`Creating template repo: ${templateRepo}`);
        } else {
            console.log(`Updating template repo: ${templateRepo}`);
        }
    }

    return context.payload.client_payload.value
}