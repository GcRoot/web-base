//todo: 子项目包管理类(基础数据)
import {PackageInfo} from './type'
import path from 'path'
import fs from 'fs'
export class Package {
  private fullname:string
  private json:PackageInfo
  // private dir: string
 
  constructor(file:string,private dir:string){
    this.fullname = path.resolve(dir, file)
    const _json:any = fs.readFileSync(this.fullname, 'utf-8')
    this.json = _json
  }
}