import {  resolve } from 'path';

// todo 项目整合工具
import {Packages} from './packages'


// 根据指令 还是固定？来获取子项目数据
function diffPath(cmd?:string){
  const pathdir:string = cmd || 'project'
  const paths = resolve(__dirname,`../../${pathdir}`)
}

export function initProject(cmd?:string) : Packages{
  // 去固定路径找子项目，然后返回自己能力的packages
  return new Packages()
}