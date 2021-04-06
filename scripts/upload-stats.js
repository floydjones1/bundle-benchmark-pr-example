const { exec } = require("child_process");
var Parser = require("parse-listing");

const S3Bucket = "s3://bundle-stats-example";

exec(`aws s3 ls ${S3Bucket} --human-readable`, (error, stdout, stderr) => {
  if (error) {
    console.error(error);
    return;
  }
  if (stderr) {
    console.log(error);
    return;
  }

  let fileNames = [];
  Parser.parseEntries(stdout, function (err, entryArray) {
    entryArray.forEach(function (entry) {
      const name = entry.name
        .split(" ")
        .filter((name) => name.includes("main.json"));

      if (name.length) {
        fileNames.push(name);
      }
    });
  });

  if (fileNames.length === 0) {
    // skip
  } else if (fileNames.length == 2) {
    // rename previous files
    const ts = new Date().getTime();
    exec(
      `aws s3 mv ${S3Bucket}/stats-main.json ${S3Bucket}/stats-main-${ts}.json`,
      handleError
    );
    exec(
      `aws s3 mv ${S3Bucket}/files-main.json ${S3Bucket}/files-main-${ts}.json`,
      handleError
    );
  } else {
    throw `Here are the current files ${fileNames.join(" ")}`;
  }
  console.log("uploading");
  exec(`aws s3 cp ./dist/stats.json ${S3Bucket}/stats-main.json`, handleError);
  exec(`aws s3 cp ./files.json ${S3Bucket}/files-main.json`, handleError);
  console.log("done uploading");
});

function handleError(error, stderr) {
  if (stderr) {
    console.log(error);
    return;
  }
  if (error) {
    throw error;
  }
}
