import fetch from 'node-fetch'
import { MessageEmbed } from 'discord.js'
import { CommandType } from '../../types'
import { JSDOM } from 'jsdom'

const Melonchart: CommandType = {
    name: 'melonchart',
    aliases: ['멜론차트', '멜차', 'melcha', 'ㅡ디촘', 'ㅡ디ㅐㅜ촘ㄳ', 'apffhsckxm', 'apfck'],
    run: async (_, message) => {
        const html = await (await fetch('http://www.melon.com/chart/')).text()

        const { document } = (new JSDOM(html)).window
        const result: Array<{ title: string | null | undefined }> = []

        document.querySelectorAll('div.wrap > div.wrap_song_info > div.ellipsis.rank01').forEach(el => result.push({ title: el.querySelector('span > a')?.textContent }))

        message.channel.send(new MessageEmbed().setTitle('멜론 차트 1위 ~ 10위').setColor(0x00ff00).setAuthor('Melon', undefined, 'https://melon.com/').setDescription(result.slice(0, 10).map((result, i) => `${++i}위 ${result.title}`).join('\n')).setFooter(`${document.querySelector('div.calendar_prid > span.yyyymmdd > span.year')?.textContent} ${document.querySelector('span.hhmm > span.hour')?.textContent} 업데이트`))
    }
}

export default Melonchart