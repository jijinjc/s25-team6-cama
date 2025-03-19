# Git Workflow(s)

## Working on an issue...

1.  **Create a branch** - Create a new branch from the `main` branch for your work. If you're not sure what to name your branch, use the following convention: `issue-<issue number>-<short description>`. For example, if you're working on issue #16 and you're styling the vector tiles on your map, you might name your branch `issue-16-vector-tile-styling`.

    ```bash
    git checkout main
    git pull
    git checkout -b issue-16-vector-tile-styling
    ```

    > The `-b` flag creates a new branch from the code in the current branch if it doesn't already exist.

2.  **Work on your code** - Make your changes and commit them to your branch.


    ```bash
    git add .
    git commit -m "Add vector tile styling to map"
    ```

    > The `-m` flag lets you write a commit message in the command line. If you don't use the flag, Git will open your default text editor for you to write a commit message.
    
    Be sure to write good commit messages that explain what you did. A good commit message should at the very least describe the changes you made and why. For _great_ commit messages, check out **_The seven rules of a great Git commit message_** at https://cbea.ms/git-commit/
    
    Be careful keep the following kinds of files and folders out of your commits:
    - `node_modules` or other build artifacts, as these create a lot of unnecessary clutter in your repository and can make it harder to review what's actually changed on a branch
    - environment variable files, like `.env`, which can contain sensitive information such as API keys

    You can add those kinds of files to your `.gitignore` file to keep them out of your commits.

3.  **Push your branch** - Push your branch to the remote repository so that others can see your work.

    ```bash
    git push origin issue-16-vector-tile-styling
    ```

4.  **Create a pull request** - Create a pull request from your branch to the `main` branch. Be sure to include a good description of what you did in the pull request, and mention the issue number that you're working on in the description.

5.  **Get a code review** - After you create the pull request, ask someone else to review your code. They can leave comments on your pull request if they see anything that needs to be changed.

6.  **Get your changes merged** - After your code has been reviewed and any necessary changes have been made, you can merge your changes into the `main` branch. Mention the pull request number in the merge commit.

7.  **Delete your branch** - After your changes have been merged, you can delete your branch.

    ```bash
    git checkout main
    git pull
    git branch -d issue-16-vector-tile-styling
    ```

    > The `-d` flag deletes the branch from your local repository.

## Fixing a bug...

If you find a bug in the code, create an issue on GitHub describing what's wrong. Be sure to include a good description of the bug and steps to reproduce it.

_Then follow the steps above for working on an issue..._

## Fixing a small thing...

There are some things (like **a typo** in some text, or a mistakenly committed **merge conflict marker**) that don't need a whole issue to fix.

For these small things, just create a new branch from the `main` branch, and name it something like `fix-<short description>`. For example, if you're fixing a typo in the README, you might name your branch `fix-readme-typo`.

```bash
git checkout main
git pull
git checkout -b fix-readme-typo
```

_Then follow from step 2 above for working on an issue..._

## Reviewing someone else's code...

When you're reviewing someone else's code, you should look for the following things:

- **Code quality** - Is the code well-organized and easy to read? Does it pass all the linters? Are there any parts of the code that could be refactored to make them easier to understand?
- **Functionality** - Does the code do what it's supposed to do? Are there any edge cases that the code doesn't handle?

When you're reviewing someone else's code, don't think of your role as figuring out what's wrong with the code, but rather as helping the author make it even better.

You're working with the code's author to get to "yes". Ask the author questions if you need to. Be sure to leave comments on the pull request if you see anything that needs to be changed. Be kind and constructive in your comments, and remember that the goal is to get the best possible code into the repository.
