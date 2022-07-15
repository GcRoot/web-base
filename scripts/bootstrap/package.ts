//todo: 子项目包管理类(基础数据)
import {PackageInfo} from './type'
import path from 'path'
import fs from 'fs'
import { exec } from 'child_process';
import { runCmd } from './runnerCmd'

export class Package {
  private fullname:string
  private json:PackageInfo
  // private dir: string
 
  constructor(file:string,private dir:string){
    this.fullname = path.resolve(dir, file)
    const _json:any = fs.readFileSync(this.fullname, 'utf-8')
    // todo: 子项目更新迭代，加入版本控制
    _json.version =_json.version?.split('.')?.map((x:string) => parseInt(x))
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

  public async link(){
    if(this.getPackType() !== 'cli') {
      await this.openCmd('yarn unlink')
      await this.openCmd('yarn link')
    }else {
      await this.openCmd('npm link --force')
    }
  }

  public async runInstall(){
    // 执行命令 （当前工程的 不跨项目）
  await this.openCmd('yarn install')
  }

  public async runStart() {
    //todo 需要线程管理工具协助管理不同类型项目启动
    let productType:string = this.getPackType()
    let productName:string = this.getName()
    const script = path.resolve(__dirname, './start.js')
    switch(productType){
      case 'app':
        await this.openCmd(`pm2 start --name ${productName} --watch=true --exp-backoff-restart-delay=10000 ${script}`)
        break
      case 'service':
        if(!this.json.xCli?.port){
          console.error('启动服务需要自定义接口')
          break
        }
        await this.openCmd(`pm2 start --name ${productName} --exp-backoff-restart-delay=10000 ${script}`, {
          POPT: this.json.xCli.port
        } )
        await this.openCmd('pm2 list')
        break
      case 'lib':
        break
      case 'cli':
        break
      default:
        console.error('未定义package type')
        break
    }
  }
  public async linkDev(){
    for(let link of this.getDevLinks()){
      await this.openCmd(`yarn link ${link}`)
    }
  }
  public getPackType(){
    return this.json.xCli?.type
  }
  public getName(){
    return this.json.name
  }
  public getVers(){
    return this.json.version
  }
  public getDevLinks(){
    return this.json.xCli?.devLinks||[]
  }
}