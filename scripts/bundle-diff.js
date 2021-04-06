const { exec } = require("child_process");
const argv = require("minimist")(process.argv.slice(2));

// token user repo pr
console.log(argv);
console.log(process.env.github);

let command =
  'yarn statistician github-pull-request --file "./files-main.json,./files.json" --bundle "./stats-main.json,./dist/stats.json"';
for (const arg in argv) {
  if (arg === "_") continue;
  command += ` --${arg} ${argv[arg]}`;
}

console.log(command);
exec(command, handleError);

function handleError(error, stderr) {
  if (stderr) {
    console.log(error);
    return;
  }
  if (error) {
    throw error;
  }
}
