
//todo: 管理所有子项目包工具类(行为控制)
import {Package} from './package'
import { resolve } from 'path';
import fs from 'fs'

/**
 * 
 * 行为边界问题：
 * 1.安装后下次安装 缓存问题
 * 2.运行的时候，保证依赖安装完成，or 关联关系已生成好 
*/
export class Packages {
  packages: Array<Package>
  package: Package
  marks: object  //行为边界控制状态
  constructor(packages:Array<Package>){
    this.packages = packages
    this.package = new Package('package.json', resolve(__dirname,'../../') )
  }

  public setMarks(){
    fs.writeFileSync(resolve(__dirname,'../../.xd'),JSON.stringify(this.marks,null，2),'utf-8')
  }

  public start(){}
  public install(){
    this.packages.map((pake:Package) => pake.runInstall())
    // 标记状态
    this.marks['installed'] = true
    // 写入
    this.setMarks()
  }
}