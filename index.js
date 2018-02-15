#!/usr/bin/env node
const meow = require("meow");
const chalk = require("chalk");
const clipboardy = require("clipboardy");
const titlecase = require("titlecase");

const { classic, abs, butt, leg, arm, sleepy } = require("./data");

const cli = meow(
  chalk`
{yellow.bold Usage}
	$ workout <name>|<random>

{yellow.bold Examples}
	$ workout abs
  Abs Workout copied to clipboard 🤸‍
  
	$ workout 2
	Abs & Leg
	
{yellow.bold API}
  {white name}
  Values: {dim classic | abs | butt | leg | arm | sleepy}
  
  {white random}
  Values: {dim min = 1, max = 6}
`
);

let workouts;
const workout = cli.input[0] || "";

const randomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

if (workout && workout == +workout) {
  if (workout > 0 && workout < 7) {
    const workoutsName = ["classic", "abs", "butt", "leg", "arm", "sleepy"];
    let randomWorkouts = `\n`,
      random;
    for (let index = 0; index < workout - 1; index++) {
      random = randomInt(0, workoutsName.length - 1);
      randomWorkouts += `${titlecase(workoutsName[random])} & `;
      workoutsName.splice(random, 1);
    }
    random = randomInt(0, workoutsName.length - 1);
    randomWorkouts += titlecase(workoutsName[random]);
    console.log(chalk.yellow.bold(`${randomWorkouts}\n`));
  } else {
    console.log(chalk.red.bold(`\nWorkout number should be between 1 & 6\n`));
  }
  process.exit(0);
}

switch (workout.toLowerCase()) {
  case "classic":
    workouts = classic;
    break;
  case "abs":
    workouts = abs;
    break;
  case "butt":
    workouts = butt;
    break;
  case "leg":
    workouts = leg;
    break;
  case "arm":
    workouts = arm;
    break;
  case "sleepy":
    workouts = sleepy;
    break;
  default:
    cli.showHelp([(code = 2)]);
    break;
}

let result = `/workout ${titlecase(workout)} Workout \n`;

workouts.forEach(name => {
  result += `30 secs ${titlecase(name)}\n`;
});

clipboardy.writeSync(result);

console.log(
  chalk.yellow.bold(`\n${titlecase(workout)} Workout copied to clipboard 🤸‍\n`)
);
