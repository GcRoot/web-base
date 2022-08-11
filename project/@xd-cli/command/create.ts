import inquirer from 'inquirer'
import fs from 'fs'
import Clone from './clone'

// const inquirer = require('inquirer')

export default class Create {
  name:string ="create"
  // private argv:any
  async run(argv:any) { 
    // this.argv = argv
    // const sourceFile = argv.source
		// if(!sourceFile)  {
		// 	throw new Error("you should specify component source code file.")
		// }
		// if(!fs.existsSync(sourceFile)) {
		// 	 throw new Error(`file ${sourceFile} not found.`)
		// }
    const answer = await this.questions()
    // answer.src = sourceFile
    await this.create(answer)
  }

  private async questions(){
    const result  = await inquirer.prompt([
      {
        message: "select a group",
        choices: ["vue", "react"],
        type: "list",
        name: "group",
      },
      {
        message:"项目名称？",
        type: "input",
        name:"name"
      }
    ])
    return result
  }
  
  async create(answer:any){
    if(!answer.name) return 
    const config = {...answer}
    console.log(config)
    await Clone.init(config.name)
    // fs.mkdirSync('./' + config.name)
  }
}