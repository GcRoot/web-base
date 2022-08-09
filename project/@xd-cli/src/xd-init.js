#!usr/bin/env node

// xd init 命令 做哪些操作

const program = require('commander')
const {clone} = require('../lib/download')
program.action(async ({args}) => {
    // 1. shell 给出友好反馈
    console.log(args)
    console.log( '🚀创建项目: ' + args[0])
    // 2.程序做哪些业务操作
    // 查找 创建项目是否同名
    
    await clone(`github:${args[1]}`,args[0]) // 去拉去指定仓库内容到本地并自定义目录名称
})
program.parse(process.argv)


