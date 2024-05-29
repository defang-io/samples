const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

/**
 * This function returns the value of the client payload from the context.
 *
 * @param {Object} args - The arguments object.
 * @param {Object} args.github - The GitHub object.
 * @param {import('@octokit/rest').Octokit} args.github.rest - The GitHub SDK instance.
 * @param {import('@actions/github').Context} args.context - The context of the GitHub action.
 * @param {import('@actions/core')} args.core - The context of the GitHub action.
 * @returns {any} The value of the client payload.
 */
module.exports = async ({ github, context, core }) => {
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

    // console log the current working directory
    console.log('@@ cwd: ', process.cwd());

    // console log the contents of the current directory
    console.log('@@ ls: ', fs.readdirSync(process.cwd()));

    // read the modified samples
    let modified = fs.readFileSync(path.join('modified.txt'), 'utf8').trim();

    console.log('@@ modified: ', modified);

    if (!modified) {
        return;
    }

    exec(`git config --global user.name 'GitHub Actions'`, (err, stdout, stderr) => {
        if (err) {
            throw new Error(`exec error: ${err}`);
        }
    });
    exec(`git config --global user.email 'actions@github.com'`, (err, stdout, stderr) => {
        if (err) {
            throw new Error(`exec error: ${err}`);
        }
    });

    const repos = await getAllReposForOrg('DefangLabs');
    const repoNames = repos.map(r => r.name);
    console.log('@@ repos: ', repoNames);

    const modifiedSamples = modified.split('\n').map(s => s.split('/')?.[1])

    // for each sample, create or update the template repo
    for (const sample of modifiedSamples) {
        const templateRepo = `sample-${sample}-template`;
        if (!repoNames.includes(templateRepo)) {
            console.log(`Creating template repo: ${templateRepo}`);
            await github.rest.repos.createInOrg({
                name: templateRepo,
                org: 'DefangLabs',
                private: false,
                is_template: true,
            });
        }

        console.log(`Pushing to template repo: ${templateRepo}`);

        const currentBranch = process.env.GITHUB_REF.split('/').pop();
        const isMain = currentBranch === 'main';
        const branch = isMain ? 'main' : `test-${currentBranch}`;

        exec(`git subtree push --prefix samples/${sample} git@github.com:DefangLabs/${templateRepo}.git ${branch} --squash`, (err, stdout, stderr) => {
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            if (err) {
                throw new Error(`exec error: ${err}`);
            }
        });
    }

    return {
        modifiedSamples,
        repos
    }
}