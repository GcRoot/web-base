#!/usr/bin/env node

// 指定命令行命令 该干哪些事 相当于是命令指引 --help 命令的架子
const program = require("commander");

const { version } = require("../package.json");

program
  .version(version, "-v", "--version")
  .command("init <name> <gitRepository>", "init project")
  .command("refresh", "refresh routes...");

program.parse(process.argv);
