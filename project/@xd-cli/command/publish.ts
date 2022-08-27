import inquirer  from 'inquirer'
import path from 'path'
import fs from 'fs'
export default class Publish{
  async run(par?:any){
    const choicesDir = this.getPath(/(node_modules|src|command|utils)/)
    let answer =  await this.questions(choicesDir)
    console.log(answer)
  }
  private async questions(choicesDir?:string[]){
    const result  = await inquirer.prompt([
      {
        message: "select a dir to publish",
        choices: choicesDir,
        type: "list",
        name: "publishPath",
      },
      {
          message: "select a framework template",
          choices: ['vue','react'],
          type: "list",
          name: "framework",
      },
    ])
    return result
  }
  getPath(exclude:RegExp){
    const rootpath = path.resolve(__dirname,'../')
    const dirArr =  fs.readdirSync(rootpath)
   
    const chooiseArr =  dirArr.filter(el => {
      if(fs.statSync(el).isDirectory()) {
        return !el.match(exclude)
      }
      return false
    })
    return chooiseArr
  } 
}