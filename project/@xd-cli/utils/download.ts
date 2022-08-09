// import {promisify} from 'util'

import {promisify} from 'util'


export const clone = async (repo,desc) =>{
    const download = promisify(require('download-git-repo'))
    const ora = await require('ora')
    const procsess = ora(`下载...${repo}`)
    procsess.start()
    await download(repo,desc)
    procsess.succeed()
}