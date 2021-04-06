const { exec } = require("child_process");
var fs = require("fs");

exec(
  `yarn statistician files --dir './dist' --ignore '.map$' --ignore '.LICENSE.txt$' --ignore 'stats.json'`,
  (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    const start = stdout.indexOf("{");
    const end = stdout.indexOf("}");
    const data = stdout.slice(start, end + 1);

    fs.writeFile("files.json", data, function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
  }
);
