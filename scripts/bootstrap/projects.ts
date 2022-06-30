// todo 项目整合工具
import {Packages} from './packages'
import { resolve } from 'path';
import fs from 'fs'

// 根据指令 还是固定？来获取子项目路径数据
function diffPath(pattern: RegExp,dir:string,exclude:RegExp){
  // const pathdir:string = cmd || 'project'
  // const dir = resolve(__dirname,`../../${pathdir}`)
  let filesarray = []
  const files = fs.readdirSync(dir)

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const fullname =  resolve(dir,file)
    console.log(fullname)
    if(fullname.match(exclude)){
      continue
    }
    if(fullname.match(pattern)){
      filesarray.push([file,dir])
    }
    if(fs.statSync(fullname).isDirectory){
      diffPath(pattern,fullname,exclude)
    }
  }
  console.log(filesarray)
  return filesarray
}

const result = [...diffPath(/package\.json$/,resolve(__dirname, '../../'), /(node_modules|\.git|\.xd|\.history|*\.md)/)]
console.log(result)

// export function initProject() : Packages{
//   const result = [...diffPath(/package\.json/,resolve(__dirname, '../../'), /(node_modules|\.git)/)]
//   // 去固定路径找子项目，然后返回自己能力的packages
//   return new Packages()
// }