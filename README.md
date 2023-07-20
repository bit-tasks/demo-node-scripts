# Bit Node.js Tasks for Git CI/CD Pipelines
Node.js Tasks that you can use in Github Actions, AzureDevOps, GitLab and other CI/CD platforms.

**Note:** You may need to use variables (e.g envioronment, pipeline) to share state between tasks based on your CI platform.

## List of Scripts

- Initialize Bit - [bit-init.js](/scripts/bit-init.js)
- Bit Verify Components - [verify.js](/scripts/verify.js)
- Bit Tag and Export - [tag-export.js](/scripts/tag-export.js)
- Bit Pull Request Build - [pull-request.js](/scripts/pull-request.js)
- Commit Bitmap - [commit-bitmap.js](/scripts/commit-bitmap.js)
- Dependency Update - [dependency-update.js](/scripts/dependency-update.js)
- Branch Lane - [branch-lane.js](/scripts/branch-lane.js)

## Contributor Guide

Steps to create custom tasks in different CI/CD platforms.

```
git commit -m "Update task"
git tag -a -m "action release" v1 --force
git push --follow-tags
```

### GitHub Actions

For more information refer [Create a javascript action](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action)

### GitLab CI/CD

For more information refer [Specify a custom CI/CD file](https://docs.gitlab.com/ee/ci/pipelines/settings.html#specify-a-custom-cicd-configuration-file)

### Azure DevOps

For more information refer [Add build task](https://learn.microsoft.com/en-us/azure/devops/extend/develop/add-build-task?view=azure-devops)
