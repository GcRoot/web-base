import inquirer from 'inquirer'
import fs from 'fs'
import Clone from './clone'

// const inquirer = require('inquirer')

export default class Create {
  name:string ="create"
  private argv:any
  async run(argv:any) { 
    this.argv = argv
    // const sourceFile = argv.source
		// if(!sourceFile)  {
		// 	throw new Error("you should specify component source code file.")
		// }
		// if(!fs.existsSync(sourceFile)) {
		// 	 throw new Error(`file ${sourceFile} not found.`)
    // }
    const gitname = Clone.readJson()
    const answer = await this.questions(gitname)
    // answer.src = sourceFile
    await this.create(answer)
  }

  private async questions(gitname?: string[]){
    let questions = [
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
      },
      {
        message:"选择已有仓库",
        type:'list',
        choices: gitname,
        name:'gitUrl'
      }
    ]
  
    if(this.argv._[3]) {
      questions = [  {
        message: "select a group",
        choices: ["vue", "react"],
        type: "list",
        name: "group",
      },
      {
        message:"项目名称？",
        type: "input",
        name:"name"
      }]
    }
    const result  = await inquirer.prompt(questions)
    return result
  }
  
  async create(answer:any){
    if(!answer.name) return 
    let config = {...answer}
    console.log(config)
    if(!config.gitUrl) config.gitUrl = this.argv._[3]
    await Clone.init(config)
    // fs.mkdirSync('./' + config.name)
  }
}