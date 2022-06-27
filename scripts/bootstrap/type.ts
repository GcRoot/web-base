
export interface PackageInfo {
  name: string,
  version: Array<number>,
  main: string,
  dependencies :{
    [dep:string] :string
  }
  devDependencies :{
    [dev: string] :string
  }
}