
import inquirer  from 'inquirer'
import path from 'path'
import fs from 'fs'
import Clone from './clone'
import { runCmd } from '../utils/index'

export default class Publish{
  async run(par?:any){

    const choicesDir = this.getPath(undefined,/(node_modules|src|command|utils|template)/)
    let answer =  await this.questions(choicesDir,"")
    this.init(answer)
  }
  private async questions(choicesDir?:string[],temp?:any){
    const result  = await inquirer.prompt([
      // 指定项目中的组件发布
      {
        message: "select a dir to publish",
        choices: choicesDir,
        type: "list",
        name: "publishPath",
      },
    
    ])
    let compResult = {
      publishFile: undefined,
      mode:false
    }
    let compFileResult = {}
        console.log(path.resolve(__dirname,`../${result.publishPath}`))
        // 选中 去找子文件夹
        const selectPath:string[] = this.getPath(path.resolve(__dirname,`../${result.publishPath}`),false, /src/) 
        const choicesFile = this.getChildDir(selectPath[0])
        compResult= await inquirer.prompt([
          {
            message: "select a file/dir to publish",
            choices: choicesFile,
            type: "list",
            name: "publishFile",
          },
          {
            message: "Is this for publish",
            choices: ["dir", "file"],
            type: "confirm",
            name: "mode"
        }  
        ])
        if(!compResult.mode) {
          const compsFilesPath = `${selectPath[0]}/${compResult.publishFile}`
          if(fs.statSync(compsFilesPath).isDirectory()){
            const cFiles =this.getChildDir(compsFilesPath)
            compFileResult= await inquirer.prompt([
              {
                message: "select a files to publish",
                choices: cFiles,
                type: "checkbox",
                name: "files",
              }
            ])
          }
        }
    const compTempResult  = await inquirer.prompt([
      {
        message: "select a framework template",
        choices: ['vue','react'],
        type: "list",
        name: "framework",
      },
    ])
    return {...result,...compResult,...compTempResult,...compFileResult}
  }
  private async init(config:any){
    console.log(config)
    // 拉取发布脚手架（react/vue）
      //1. 获取仓库信息
        Clone.readJson()
        const gitDepot = Clone.gitAddress
        const gitUrl = gitDepot[config.framework]
      // 2. 拉取模版
        await Clone.init({name:`${config.framework}-template`,gitUrl})
      // 3. 获取待发布项目信息
        const pubPath = path.resolve(__dirname,`../${config.publishPath}/src/${config.publishFile}`) 
        console.log(pubPath)
    // 编译指定项目的文件生成 符合组件的文件
    if(config.mode) runCmd(`gulp build --gulpfile utils/gulpmove.js --option ${pubPath}`,{})
    else {
      const filesPath = config.files.map(el => path.resolve(__dirname,`../${config.publishPath}/src/${config.publishFile}/${el}`) )
      runCmd(`gulp build --gulpfile utils/gulpmove.js --option ${filesPath}`,{})
    }
    // 发布 （文档） 代码发布到git   
    //Todo: 版本号能力取上级能力？ 待考虑

  }
  getPath(root?:string | undefined,exclude?:RegExp | boolean,include?:RegExp ){
    const rootpath = root || path.resolve(__dirname,'../')
    const dirArr =  fs.readdirSync(rootpath)
  
    const chooiseArr =  dirArr.filter(el => {
      if(fs.statSync(el).isDirectory()) {
        if(!exclude) return el.match(include)
        return !el.match(exclude as RegExp)
      }
      return false
    }).map(el => {
      if(root)  return `${root}/${el}`
      return el
    })
    return chooiseArr
  } 

  getChildDir(path:string){
    const dirs = fs.readdirSync(path)
    return dirs
  }
  // getChildFiles(path:string){
  //   const files = fs.readFileSync()
  // }
  public publish(){
    //  oss 
  }
  public gitcmd(){

  }
}