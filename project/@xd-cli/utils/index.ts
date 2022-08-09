import {exec,ExecOptions} from "child_process"


export function runCmd(command:string,options:ExecOptions){
  return new Promise((resolve,reject) =>{
    try {
     const process =  exec(command,options)
    
    //  输入
      // console.log(process.stdin)  //未连接上
      //  输出
      process.stdout.on("data",(chunk:string) =>{
        console.log(chunk)
      })
      process.stderr.on("data", (chunk:string) => {
        console.log(chunk)
      })
      console.log(process.connected)
      process.on('close',() =>{
        resolve(null)
      })
    } catch (error) {
     console.log(error.message)
     reject(error)
    }
  })
}

