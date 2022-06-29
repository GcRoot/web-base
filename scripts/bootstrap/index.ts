// todo: 集成cmd 命令转接执行

import parser from 'yargs-parser'
import fs from 'fs'
import {initProject} from './projects'
import {Packages} from './packages'

const argv = parser(process.argv[2])
console.log(process.argv)
const cmd = argv._[0]

const projects = initProject()

async function run () {
  switch(cmd){
    case 'start' :
      projects.start()
     break
    case 'install' :
      projects.install()
      break
  }
}