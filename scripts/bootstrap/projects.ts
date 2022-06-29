// todo 项目整合工具
import {Packages} from './packages'

export function initProject() : Packages{
  // 去固定路径找子项目，然后返回自己能力的packages
  return new Packages()
}