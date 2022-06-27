
//todo: 管理所有子项目包工具类(行为控制)
import {Package} from './package'
import { resolve } from 'path';


export class Packages {
  packages: Array<Package>
  package: Package
  constructor(packages:Array<Package>){
    // packages.filter()
    this.package = new Package('package.json', resolve(__dirname,'../../') )
  }
  public start(){}
  public install(){}
}