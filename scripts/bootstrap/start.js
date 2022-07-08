// 启动
const path = require("path");
const { exec } = require("node:child_process");

const npm = exec("npm run dev", {
  windowsHide: true,
});

npm.stdout.on("data", (data) => {
  console.log(data.toString());
});
// npm.stdin.on("data", () => {});
npm.stderr.on("data", (err) => {
  console.log(err.toString());
});
