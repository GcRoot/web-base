
//todo 不同类型项目集合
export interface PackageInfo {
  name: string,
  version: Array<number>,
  main: string,
  xCli?:{
    type?: 'service'| 'app' | 'lib' | 'cli',
    port?: number
  },
  dependencies :{
    [dep:string] :string
  }
  devDependencies :{
    [dev: string] :string
  }
}