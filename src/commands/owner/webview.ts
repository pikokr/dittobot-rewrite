import { JSDOM } from 'jsdom'
import fetch from 'node-fetch'
import { CommandType } from '../../types'

const Webview: CommandType = {
    name: 'webview',
    category: 'owner',
    async run(_, message, args) {
        const page = await (await fetch(args[0])).text()
        const { window: { document }, window } = new JSDOM(page)

        console.log(window, document)
    }
}

export default Webview