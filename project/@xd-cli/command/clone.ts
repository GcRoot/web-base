
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
      console.log(__dirname,'文件存在')
    //  const url =  fs.readdirSync(`${name}`)
     if(fs.statSync(name).isDirectory()) {
        const urlArray:any = fs.readdirSync(name)
        this.deleteFile(urlArray,name) 
     }
    //todo 无法往上递归删除
      // fs.rmdirSync('./del')
    } 
    await clone(`https://gitlab.com/flippidippi/download-git-repo-fixture.git#my-branch`,`${name}`)
    console.log( '🚀创建成功: ' + '$ cd '+ name)
  }

  static deleteFile(arr:string[],dir){
    console.log(arr)
    // 收集被删路径目录
   let delDir:string[] = []
    arr.forEach(el => {
      if(fs.statSync(`${dir}/${el}`).isDirectory()){
        // 收集每一级被删路径目录（当前目录下的子目录/文件）
        this.url= this.url + `/` + el
        console.log(this.url)
        const urlArray:any = fs.readdirSync(this.url)
        if(urlArray.lenght === 0 ) fs.rmdirSync(this.url)
        else this.deleteFile(urlArray,this.url)
        delDir.push(this.url)
      }
      else {
        fs.unlinkSync(`${dir}/${el}`)
      }
      // 恢复根目录
      this.url = dir
    })

    console.log(delDir)
    fs.rmdirSync(dir)
    // if(fs.statSync(url).isDirectory()) {
    //    const urlArray:any = fs.readdirSync(url)
    //    if(urlArray.lenght === 0 ) fs.rmdirSync(url)
    //     urlArray.forEach((el:string) =>{
    //       if(el) this.deleteFile(`${url}/${el}`)
    //    })
    // } else {
    //   fs.unlinkSync(url)
    // }


    // const urlArray:any = fs.readdirSync(url)
    // console.log(urlArray)
    //  urlArray.forEach((el:string) =>{
    //   if(fs.statSync(`${url}/${el}`).isDirectory() ) {
        
    //     this.deleteFile(`${url}/${el}`)
    //   }
    //    else {
    //      const urlArray:any = fs.readdirSync(`${url}/${el}`)
    //     if(urlArray.lenght === 0 ) fs.rmdirSync(`${url}/${el}`)
    //     else fs.unlinkSync(`${url}/${el}`)
    //   }
    // })


  }
}