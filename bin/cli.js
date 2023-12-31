#!/usr/bin/env node

const { execSync } = require("child_process");
const chalk = require("chalk");
const path = require("path");

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
    return true;
  } catch (err) {
    console.log(`Failed to run ${command}`);
    console.log(err);
    return false;
  }
};

const repoUrl = "https://github.com/nickherious/nick-react-boilerplate";
const dirName = process.argv[2];

if (!dirName) {
  console.error("Usage: ./cli.mjs <directory-name>");
  process.exit(1);
}

const gitCheckoutCommand = `git clone --depth 1 ${repoUrl} ${dirName}`;
const yarnInstallCommand = `cd ${dirName} && yarn install && rm -rf .git* bin`;

// Create new React app
console.log(
  chalk.blueBright(`Cloning Git repository from`),
  chalk.magentaBright.bold.italic.underline(repoUrl),
  chalk.blueBright(`into`),
  chalk.magentaBright.bold.italic.underline(dirName),
);
const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) {
  process.exit(1);
}

// Install dependencies
console.log(
  chalk.blueBright.bold(`Installing dependencies for`),
  chalk.redBright.bold(`${dirName}`),
);
const installedDeps = runCommand(yarnInstallCommand);
if (!installedDeps) {
  process.exit(1);
}

// Inform success and commands to start, build, test, prettier, and lint
console.log(
  "\n",
  chalk.greenBright.bold.underline(`Success!`),
  `Created`,
  chalk.redBright.bold(`${dirName}`),
  `from Git repository`,
  chalk.magentaBright.bold.italic.underline(repoUrl),
  "\n\n",
  `Inside`,
  chalk.redBright.bold(`${dirName}`),
  `directory, you can run several`,
  chalk.blueBright.bold.underline(`commands`),
  `:`,
  "\n\n",
  chalk.yellowBright.bold("  yarn dev"),
  "\n",
  "    Starts the dev server",
  // (rest of the message remains the same)
);
