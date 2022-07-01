// todo 项目整合工具
import {Packages} from './packages'
import  {Package} from './package'
import  path from 'path';
import fs from 'fs'

let filesarray = []
// 根据指令 还是固定？来获取子项目路径数据
function diffPath(pattern: RegExp,dir:string,exclude:RegExp){
  // const pathdir:string = cmd || 'project'
  // const dir = resolve(__dirname,`../../${pathdir}`)
 
  const files = fs.readdirSync(dir)

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const fullname =  path.resolve(dir,file)
    
    if(fullname.match(exclude) ){
      continue
    }
    if(fullname.match(pattern)){
      filesarray.push([file,dir])
    }
    if(fs.statSync(fullname).isDirectory()){
      diffPath(pattern,fullname,exclude)
    }
  
  }

  return filesarray
}

// 根路径
const dirroot= path.resolve(__dirname,'../../')


// const result = [...diffPath(/package\.json$/, dirroot , /(node_modules|\.git|\.history)/)]
// console.log(result)

export function initProject() : Packages{
  const result = [...diffPath(/package\.json/,dirroot, /(node_modules|\.git)/)]
  // 去固定路径找子项目，然后返回自己能力的packages
  return new Packages(result.map(([file,dir]) => new Package(file,dir)))
}