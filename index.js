const core = require("@actions/core");
const github = require("@actions/github");

async function main() {
    try {
      const owner = process.env.GITHUB_REPOSITORY_OWNER;
      const repo = process.env.GITHUB_REPOSITORY.split("/").slice(1).join("");
      const token = core.getInput("token", { required: true });
      const issue_number = core.getInput("issue_number", { required: true});
      const body = 'Me too';

      const octokit = new github.getOctokit(token);

      // await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
      //   owner: owner,
      //   repo: repo,
      //   issue_number: issueNumber,
      //   body: 'Me too',
      //   headers: {
      //     'X-GitHub-Api-Version': '2022-11-28'
      //   }
      // })

      const { data: issue } = await octokit.rest.issues.createComment({
        owner,
        repo,
        issue_number,
        body,
      });
      
      core.notice('Success')
    } catch (error) {
        console.error(error);
        core.setFailed(error.message);
    }

}

main();