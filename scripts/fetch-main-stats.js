const { exec } = require("child_process");

const S3Bucket = "s3://bundle-stats-example";

exec(`aws s3 cp ${S3Bucket}/stats-main.json .`, handleError);

exec(`aws s3 cp ${S3Bucket}/files-main.json .`, handleError);

function handleError(error, stderr) {
  if (stderr) {
    console.log(error);
    return;
  }
  if (error) {
    throw error;
  }
}
