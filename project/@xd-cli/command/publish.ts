
import inquirer  from 'inquirer'
import path from 'path'
import fs from 'fs'
import Clone from './clone'
import {clone} from '../utils/download'
export default class Publish{
  async run(par?:any){
    const choicesDir = this.getPath(/(node_modules|src|command|utils)/)
    let answer =  await this.questions(choicesDir)
    console.log(answer)
    this.init(answer)
  }
  private async questions(choicesDir?:string[]){
    const result  = await inquirer.prompt([
      // 指定项目中的组件发布
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
  private async init(config:any){
    // 拉取发布脚手架（react/vue）
      //1. 获取仓库信息
        Clone.readJson()
        const gitDepot = Clone.gitAddress
        const gitUrl = gitDepot[config.framework]
      // 2. 拉取模版
        await Clone.init({name:`${config.framework}-template`,gitUrl})
      // 3. 获取待发布项目信息
        const pubPath = path.resolve(__dirname,`../${config.publishPath}`) 
        console.log(pubPath)
    // 编译指定项目的文件生成 符合组件的文件
     
    // 发布
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

  public publish(){
    //  oss
  }
}