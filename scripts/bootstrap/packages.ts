
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
  ver:[number,number,number]
  marks: object  //行为边界控制状态
  constructor(packages:Array<Package>){
    this.packages = packages
    this.package = new Package('package.json', resolve(__dirname,'../../') )
    // 永远保持最新版本号
    const vers:any = packages.map( x => x.getVers()).sort((x,y) => (x[0] - y[0])*1000000 + (x[1] - y[1])*1000 + (x[2] - y[2]))
    this.ver= vers[0]
    this.initMarks()
  }

  public setMarks(){
    fs.writeFileSync(resolve(__dirname,'../../.xd'),JSON.stringify(this.marks,null,2),'utf-8')
  }

  public initMarks(){
    const filestr = fs.readFileSync(resolve(__dirname,'../../.xd'),'utf-8')
    const json = JSON.parse(filestr)
    this.marks = json
  }
 /**
  *  边界考虑：
  * 基座更新了版本号记录在了线程列表中，而子项目更新版本号问题？？ 需要吗？
  * 
 */

  public start(){
    //todo 支持不同类型项目启动
    this.packages.forEach(x => x.runStart())
  }

  public install(){
    this.packages.map((pake:Package) => pake.runInstall())
    // 标记状态
    this.marks['installed'] = true
    // 写入
    this.setMarks()
  }
}