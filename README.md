# Geek Collector's Network
&nbsp;
## Getting Started

The project's workflow is designed to accommodate developers who prefer working in a Docker environment or locally on their machines.

### Prerequisites
Before starting, install the following tools:
 - Node v18+
 - [Docker](https://docs.docker.com/get-docker/) - We use Docker to develop and package our applications.
 - GNU Make - Make provides developers with an interface to interact with projects and their tools, allowing the project to scale without requiring developers to relearn commands.

### Setup
Simply install dependencies across all projects by running:

```shell
make install
```

### Launching Projects
1. In all app projects, there is a `.env.example` file. **COPY** this file, name it `.env`, and customize it. You should only have to change the ports to make it runnable on your machine.


2. Choose how you want to run the applications.

You may choose to run all applications in Docker using:
```
make dev
```

**OR** launch each manually by changing the directory to each project in "apps/" and running:
```
npm run start:dev
```

&nbsp;
## Development
All development will be done in projects located under `apps/` and `packages/`.

Adding new files to projects must be done within the respective project folder. In most cases, you will never have to add or modify files in the root directory.

### Feature Branches
In [Issues](#Issues), the branch naming convention is described but you can ignore that if you follow the instructions in this section.

1. Open an issue you want to work on.
2. Click "Create a Branch" on the right-side panel.
3. Accept the defaults, optionally change the short description if it bothers you.
4. Copy the commands to open the branch locally.
5. Paste the commands in your terminal.

You've now linked an issue/task to your branch and your Pull Request (PR) will automatically close your issue when it is merged!

### Installing Node Dependencies
Besides running Make/Docker commands, you only need to run commands in the root directory when installing new Node dependencies.

To install a new dependency for a project, you have to add a `-w [path/to/project]` option:
```shell
npm install -w ./apps/frontend -P react react-dom
npm install -w ./apps/api -D @types/helmet
```

&nbsp;
## Contribution Guidelines
### Commits
This project uses the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) and [Angular Convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines) as our method of writing meaningful commits with some minor adjustments.

Here are some modified rules:
1. Commit titles **MUST** be 72 characters or lower.
2. Commit bodies **MUST** be 100 characters or lower.

Choosing between commit types can be challenging and seem mostly subjective, especially if you're new. If you're unsure, ask!

#### Types
- **build**: Script or configuration changes that effect how the application is built (compiled, transpiled) or packaged (docker).
- **chore**: Non-code changes not covered in build, docs, or ci, such as dependency updates, tool configurations, and file renaming; serves as a 'miscellaneous' type.
- **ci**: CI/CD changes.
- **docs**: Code or document changes that adds documentation or edits existing documentation.
- **feat**: Code changes that adds functionality.
- **fix**: Code changes that fix a bug.
- **perf**: Code changes that optimizes a system's performance.
- **refactor**: Code changes that restructure, reorganize, or simplify existing code **without altering functionality**.
- **style**: Any changes that involve code style or formatting enhancements.
- **test**: Code-testing changes.

##### What type do I use if I need to remove a feature?
If you need to **remove** a feature, it's been argued for a long time to be a _refactor_ but I believe you should use [feat](https://stackoverflow.com/questions/48075169/semantic-commit-type-when-remove-something/73944665#73944665), as answered by [Fernando](https://stackoverflow.com/users/1401341/fernando).

> Use feat when you add or remove a feature. <br/><br/>
> According to wikipedia, "code refactoring is the process of restructuring existing computer code without changing its external behavior". <br/><br/>
> If you remove a feature you change code behavior so it can not be a refactor.

An example of a remove commit:
```
feat: remove price filtering

Removed price filtering functionality from the web app and api because blah blah blah.
```

#### Scope
Some valid scope names include:
 - api
 - frontend
 - npm
 - docker

If a single commit must change functionality across multiple scopes, the scope can be left empty.

If a scope cannot be determined, then the scope can be left empty. It's better to have empty scopes than to clutter up the namespaces.

### GitHub
#### Issues
The branching convention that should be used is `[iss-number]-[description]`. The iss-number should be the number/id of the issue it's based on, without the hashtag (#). The description should be a short description with dashes in-between instead of spaces. The description should begin with a scope to make it more clear.

`367-frontend-implement-user-profiles`

#### Pull Requests
When creating your PR, you should link your issue to the PR if it hasn't done so automatically. This will automatically close the issue when the PR is merged and it doubles as documentation as well.

When it comes time to merge, make sure to select the "Merge Commit". The other merge options make bug-hunting harder or cause merge issues later down the line.
