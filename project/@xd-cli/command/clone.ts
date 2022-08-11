import fs, { fdatasync } from 'fs'
import {clone} from '../utils/download'


export default class Clone{
  name ='clone'
  
  static async init(name:any){
    // 1. shell 给出友好反馈
    console.log( '🚀创建项目: ' + name)
    // 2.程序做哪些业务操作
    // 查找 创建项目是否同名
    if(fs.existsSync(`${name}`)) {
      console.log(__dirname,'文件存在')
    //  const url =  fs.readdirSync(`${name}`)
      // const stat = fs.statSync(name).isDirectory()
      // console.log(stat)
      this.deleteFile(`${name}`)  //todo 无法往上递归删除
      // fs.rmdirSync('./del')
    } 
    // await clone(`git@e.coding.net:llgroup/ll-base/ll-uni-app-vue2.git`,`${name}`)
    // console.log( '🚀创建成功: ' + '$ cd '+ name)
  }

  static deleteFile(url:string){
    if(fs.statSync(url).isDirectory()) {
       const urlArray:any = fs.readdirSync(url)
       if(urlArray.lenght === 0 ) fs.rmdirSync(url)
        urlArray.forEach((el:string) =>{
          if(el) this.deleteFile(`${url}/${el}`)
       })
    } else {
      fs.unlinkSync(url)
    }


    // const urlArray:any = fs.readdirSync(url)
    // console.log(urlArray)
    // if(urlArray.length === 0 )  fs.rmdirSync(url)
    // else  urlArray.forEach((el:string) =>{
    //   if(fs.statSync(`${url}/${el}`).isDirectory()) {
    //     this.deleteFile(`${url}/${el}`)
    //   } else {
    //     fs.unlinkSync(`${url}/${el}`)
    //   }
    // })
  }
}