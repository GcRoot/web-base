//todo: 子项目包管理类(基础数据)
import {PackageInfo} from './type'
import path from 'path'
import fs from 'fs'
import { runCmd } from './runnerCmd'

export class Package {
  private fullname:string
  private json:PackageInfo
  // private dir: string
 
  constructor(file:string,private dir:string){
    this.fullname = path.resolve(dir, file)
    const _json:any = fs.readFileSync(this.fullname, 'utf-8')
    this.json = _json
  }

  public async openCmd(cmd:string,envs:any = {}){
   await runCmd(cmd,{
      env:{
        ...process.env,
        ...envs
      },
      cwd: this.dir
    })
  }

  public async runInstall(){
    // 执行命令 （当前工程的 不跨项目）
  await this.openCmd('yarn install')
  }
}