
 // import {promisify} from 'util'

// declare var require:any

import {promisify} from 'util'


export const clone = async (repo,desc) =>{
    const download = promisify(require('download-git-repo'))
    const ora = await require('ora')
    const procsess = ora(`下载...${repo}`)
    procsess.start()
  // await download(repo,desc)
    await download(`${repo}`, desc,{ clone: true })
    procsess.succeed()
}