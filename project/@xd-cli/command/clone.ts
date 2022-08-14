
import fs, { fdatasync } from 'fs'
import {clone} from '../utils/download'


export default class Clone{
  name ='clone'
  static url:string  //删除根路径
  static async init(name:any){
    this.url = name
    // 1. shell 给出友好反馈
    console.log( '🚀创建项目: ' + name)
    // 2.程序做哪些业务操作
    // 查找 创建项目是否同名
    if(fs.existsSync(`${name}`)) {
      console.log('🚀文件存在: 正在删除文件... ')
    //  const url =  fs.readdirSync(`${name}`)
    //  if(fs.statSync(name).isDirectory()) {
    //     const urlArray:any = fs.readdirSync(name)
    //     this.deleteFile(urlArray,name) 
    //  }
     this.deleteFile([],name) 
    //todo 无法往上递归删除
      // fs.rmdirSync('./del')
    } else{
       await clone(`https://gitlab.com/flippidippi/download-git-repo-fixture.git#my-branch`,`${name}`)
       console.log( '🚀创建成功: ' + '$ cd '+ name)
    }
   
  }

  static deleteFile(arr?:string[],dir:string){
    // 参数为数组
  //   console.log(arr)
  //   // 收集被删路径目录
  //  let delDir:string[] = []
  //   arr.forEach(el => {
  //     if(fs.statSync(`${dir}/${el}`).isDirectory()){
  //       // 收集每一级被删路径目录（当前目录下的子目录/文件）
  //       this.url= this.url + `/` + el
  //       console.log(this.url)
  //       const urlArray:any = fs.readdirSync(this.url)
  //       if(urlArray.lenght === 0 ) fs.rmdirSync(this.url)
  //       else this.deleteFile(urlArray,this.url)
  //       delDir.push(this.url)
  //     }
  //     else {
  //       fs.unlinkSync(`${dir}/${el}`)
  //     }
  //     // 恢复根目录
  //     this.url = dir
  //   })

  //   console.log(delDir)
  //   fs.rmdirSync(dir)


    // 参数为 路径

    if(fs.statSync(dir).isDirectory()) {
       const urlArray:any = fs.readdirSync(dir)
           urlArray.forEach(el => {
      if(fs.statSync(`${dir}/${el}`).isDirectory()){
        // 收集每一级被删路径目录（当前目录下的子目录/文件）
        this.url= this.url + `/` + el
        console.log(this.url)
        const urlArray:any = fs.readdirSync(this.url)
        if(urlArray.lenght === 0 ) fs.rmdirSync(this.url)
        else this.deleteFile(urlArray,this.url)
        // delDir.push(this.url)
      }
      else {
        fs.unlinkSync(`${dir}/${el}`)
      }
      // 恢复根目录
      this.url = dir
    })
    } else {
      fs.unlinkSync(dir)
    }
    fs.rmdirSync(dir)

  }
}