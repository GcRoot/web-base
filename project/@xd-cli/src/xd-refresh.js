#!usr/bin/env node

const program = require("commander");
const symbols = require("log-symbols");
const chalk = require("chalk");

// 执行 refresh 命令

program.action(() => {
  //  命令开始执行时 shell 反馈信息
  console.log("refresh ....");
});

program.parse(process.argv);

// 程序执行逻辑

// 读取文件
const fs = require("fs");
const handlebars = require("handlebars");
const list = fs
  .readdirSync("./src/views")
  .filter((v) => v !== "Home.vue")
  .map((v) => ({
    name: v.replace(".vue", "").toLowerCase(),
    file: v,
  }));
console.log(list);
compile({ list }, "./src/router.js", "./template/router.js.hbs");
compile({ list }, "./src/App.vue", "./template/App.vue.hbs");

// 根据
function compile(meta, filePath, templatePath) {
  //判断模版路径在不在
  if (fs.existsSync(templatePath)) {
    // 读取模版内容替换模版引擎内容并预编译
    const content = fs.readFileSync(templatePath).toString();
    console.log(content);
    const result = handlebars.compile(content)(meta);
    fs.writeFileSync(filePath, result);
  }
  console.log(symbols.success, chalk.green(`🚀${filePath} 创建成功`));
}
