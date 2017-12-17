#!/usr/bin/env node
const meow = require("meow");
const chalk = require("chalk");
const clipboardy = require("clipboardy");
const titlecase = require("titlecase");

const { classic, abs, butt, leg, arm, sleepy } = require("./data");

const cli = meow(
  chalk`
{yellow.bold Usage}
	$ workout <name>

{yellow.bold Examples}
	$ workout abs
	Abs Workout copied to clipboard 🤸‍
	
{yellow.bold API}
	{white name}
	Values: {dim classic | abs | butt | leg | arm | sleepy}
`
);

let workouts;
const workout = cli.input[0] || "";

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

let result = `/workout `;

workouts.forEach(name => {
  result += `30 secs ${titlecase(name)}\n`;
});

clipboardy.writeSync(result);

console.log(
  chalk.yellow.bold(`\n${titlecase(workout)} Workout copied to clipboard 🤸‍\n`)
);
