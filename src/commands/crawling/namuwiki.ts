import { MessageEmbed } from 'discord.js'
import fetch from 'node-fetch'
import { JSDOM } from 'jsdom'
import { CommandType } from '../../types'

const Namuwiki: CommandType = {
    name: 'namuwiki',
    aliases: ['나무위키', '꺼무위키', 'ㅜ므ㅕ쟈ㅏㅑ', 'skandnlzl'],
    async run(_, message, args) {
        if (!args.join(' ')) return

        const res = await (await fetch(`https://namu.wiki/Search?q=${encodeURI(args.join(' '))}`)).text()
        const { document } = new JSDOM(res).window

        const resp: Array<string> = []

        document.querySelectorAll('div.search-item').forEach(el => resp.push(`[${el.querySelector('h4 > a')?.textContent?.trim()}](https://namu.wiki${el.querySelector('h4 > a')?.getAttribute('href')})`))

        if (!resp[0]) return message.channel.send('검색 결과가 없습니다')

        message.channel.send(new MessageEmbed().setTitle('나무위키 검색 결과').setDescription(resp.slice(0, 10).join('\n')).setColor(0x008275))
    }
}

export default Namuwiki