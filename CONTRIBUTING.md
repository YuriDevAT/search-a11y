## How to contribute

### Prerequisites

If you don't have git on your machine, [install it](https://help.github.com/articles/set-up-git/).
If you don't have node on your machine, [install it](https://nodejs.org/en/download/).

### Fork this repository

Fork this repository by clicking on the fork button on the top of this page.
This will create a copy of this repository in your account.

### Clone the repository

Now clone the forked repository to your machine. Go to your GitHub account, open the forked repository, click on the code button and then click the _copy to clipboard_ icon.

Open a terminal, go to the directory where you want the project to be saved and run the following git command:

```
git clone "url you just copied"
```

where "url you just copied" (without the quotation marks) is the url to this repository (your fork of this project). See the previous steps to obtain the url.

For example:

```
git clone https://github.com/this-is-you/dev-cv.git
```

where `this-is-you` is your GitHub username. Here you're copying the contents of the dev-cv repository on GitHub to your computer.

### Create a branch

Change to the repository directory on your computer (if you are not already there):

```
cd dev-cv
```

Open the project in Visual Studio Code (or your favorite code editor):

```
code .
```

Install the dependencies:

```
npm install
```

Run the project:

```
npm start
```

Now create a branch using the `git checkout -b` command:

```
git checkout -b your-new-branch-name
```

For example:

```
git checkout -b name-of-issue
```

### Make necessary changes and commit those changes

If you go to the project directory and execute the command `git status`, you'll see there are changes.

Add those changes to the branch you just created using the `git add` command:

```
git add filename
```

Now commit those changes using the `git commit` command:

```
git commit -m "Name of issue"
```

#### Commit message

There are different ways of writing a commit message. For more reference checkout the
article about [How to write a good commit message](https://dev.to/chrissiemhrk/git-commit-message-5e21).

For this project we are going to use following style:

**type-of-issue- + number-of-issue[action you took]**

Practical example:

`feature-11[Fix typo in README.md]`

### Push changes to GitHub

Push your changes using the command `git push`:

```
git push origin -u <add-your-branch-name>
```

replacing `<add-your-branch-name>` with the name of the branch you created earlier.

### Submit your changes for review

If you go to your repository on GitHub, you'll see a `Compare & pull request` button. Click on that button.

Now submit the pull request. Check out my article about [How to write a good Pull Request](https://dev.to/yuridevat/how-to-create-a-pull-request-18a1).

Soon I'll be merging all your changes into the master branch of this project. You will get a notification email once the changes have been merged.
