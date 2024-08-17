import * as core from "@actions/core";
import { context } from "@actions/github";
import * as fs from "node:fs/promises";

try {
	// `who-to-greet` input defined in action metadata file
	const nameToGreet = core.getInput("who-to-greet");
	console.log(`Hello ${nameToGreet}!`);
	const time = new Date().toTimeString();
	core.setOutput("time", time);
	// Get the JSON webhook payload for the event that triggered the workflow
	const payload = JSON.stringify(context.payload, undefined, 2);
	console.log(`The event payload: ${payload}`);

	const filepath = core.getInput("file-to-show");
	const data = await fs.readFile(filepath);
	console.log("file data\n", data.toString());
} catch (error) {
	core.setFailed(error.message);
}
