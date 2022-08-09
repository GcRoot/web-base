import parser  from 'yargs-parser';

const  pars = parser(process.argv)

const arg = pars._[2] 
const dirname= pars._[3]

// async function cmd(command){
//   await runCmd(command,{
//     env:{
//       ...process.env
//     },
//   })
// }

// let a = spawn(`vue create ${dirname}`)

// switch(arg) {
//   case "create" :
//     console.log(dirname)
//     cmd( `vue create ${dirname}`)
//     break;
//   default:
//     // 读取help文件
//     console.log("--help")
// }

async function run(){
  // const commandModule = '../command/' + arg

  const CmdClass = await require('../command/' + arg).default

  const cmd = new CmdClass()

  try{

    await cmd.run(pars)

  }catch(e){
    console.error(e)
  }
}


run()