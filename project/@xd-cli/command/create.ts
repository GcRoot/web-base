import inquirer from 'inquirer'
import fs from 'fs'

// const inquirer = require('inquirer')

export default class Create {
  name:string ="create"

  async run(argv:any) { 
    // const sourceFile = argv.source
		// if(!sourceFile)  {
		// 	throw new Error("you should specify component source code file.")
		// }
		// if(!fs.existsSync(sourceFile)) {
		// 	throw new Error(`file ${sourceFile} not found.`)
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
    fs.mkdirSync('./' + config.name)
  }
}