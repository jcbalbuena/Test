const core = require("@actions/core");
const github = require("@actions/github");
const fetch = require("node-fetch");


async function createComment(octokit, token) {


  await octokit.request('GET /repos/{owner}/{repo}/issues/comments', {
    owner: 'OWNER',
    repo: 'REPO',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
}

async function main() {
    try {
      const owner = process.env.GITHUB_REPOSITORY_OWNER;
      const repo = process.env.GITHUB_REPOSITORY.split("/").slice(1).join("");
      const token = core.getInput("token", { required: true });
      const issueNumber = core.getInput("issue_number", { required: true});

      const octokit = new github.getOctokit(token);

      await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
        owner: owner,
        repo: repo,
        issue_number: issueNumber,
        body: 'Me too',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })
      

    } catch (error) {
        console.error(error);
        core.setFailed(error.message);
    }

}