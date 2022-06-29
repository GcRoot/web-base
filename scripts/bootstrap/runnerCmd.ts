import {exec,ExecOptions} from "child_process"
// import { } from "util"
export function runCmd(command:string,options:ExecOptions){
  return new Promise((resolve,reject) =>{
    try {
     const process =  exec(command,options)
    //  成功
      process.stdout.on("data",(chunk:string) =>{
        console.log(chunk)
      })
      process.stderr.on("data", (chunk:string) => {
        console.log(chunk)
      })
      process.on('close',() =>{
        resolve(null)
      })
    } catch (error) {
     console.log(error.message)
     reject(error)
    }
  })
}