#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
let secretNumber: number = Math.trunc(Math.random() * 20) + 1;
let chances: number = 10;

const welcome = async () => {
  const rainbowTitle = chalkAnimation.rainbow(
    "Welcome to GUESS-MY-NUMBER Game\n"
  );
  await sleep();
  rainbowTitle.stop();
  console.log(`
    ${chalk.bgBlue("HOW TO PLAY")} \n
    I am a process on your computer.
    You have to guess a number between 1 to 20
    If your ${chalk.bgGreen("PREDICTED NUMBER")} is equal to the ${chalk.bgBlue(
    "SECRET NUMBER"
  )}\n\n
    yay you won!!!\n
    ${chalk.bgMagenta("r̳u̳l̳e̳s̳")}\n\n
    1.  You will be given 10 chances (to predict)
    2.  On every wrong prediction your score will ${chalk.bgRed(
      "decrease by 1"
    )}.
    So good luck...
  `);
};
console.clear();
await welcome();

const validateInput = (input: string) => {
  const valid = !isNaN(parseFloat(input));
  return valid || "Please valid number between 1 to 20";
};

const filterInput = (input: string) => {
  return Number.isNaN(input) || Number(input) <= 0 || Number(input) > 20
    ? ""
    : Number(input);
};
const promptQuestions = async () => {
  const result = await inquirer.prompt([
    {
      type: "number",
      name: "guess_num",
      message: "Enter your guess number:",
      default() {
        return null;
      },
      validate: validateInput,
      filter: filterInput,
    },
  ]);
  return result;
};
do {
  const { guess_num } = await promptQuestions();
  if (guess_num === secretNumber) {
    console.log(`
      ${chalk.bgBlue("Yahoo! you win")}
    `);
    break;
  } else if (chances == 0) {
    console.log(`${chalk.bgRed("💀💀💀 Game over, you lose!")}`);
    process.exit(1);
  } else {
    chances--;
  }
} while (chances >= 0);
