import { MessageEmbed } from 'discord.js'
import fetch from 'node-fetch'
import { CommandType } from '../../types'
import { JSDOM } from 'jsdom'

const Covid19: CommandType = {
    name: 'covid19',
    aliases: ['코로나', '코로나바이러스', '코로나현황', '신종코로나바이러스', '코로나19', 'corona', 'covid-19', '우한폐렴', 'zhfhsk'],
    async run(_, message) {
        const { confirmed: { value: confirmed }, recovered: { value: recovered }, deaths: { value: deaths } } = await (await fetch('https://covid19.mathdro.id/api')).json()
        const covid19Page = await (await fetch('http://ncov.mohw.go.kr/')).text()

        const { document } = (new JSDOM(covid19Page)).window

        const description = [...document.querySelectorAll('ul.liveNum > li')].map(el => `${el.querySelector('.tit')?.textContent?.trim().replace(/\(격리[^]*/, '')}: **${el.querySelector('.num')?.textContent?.trim().replace('(누적)', '')} ${el.querySelector('.before')?.textContent?.trim().replace('전일대비 ', '')}**`).join('\n')
        const embed = new MessageEmbed()
            .setTitle('국내 코로나19 현황')
            .setColor('RANDOM')
            .setDescription(description)
            .setFooter(`질병관리청 / ${document.querySelector('div.liveNumOuter > h2 > a > span.livedate')?.textContent?.replace(/\(|\)/g, '')} / 지차체에서 수집한 결과와 다를 수 있습니다.`)

        document.querySelectorAll('#main_maplayout > button').forEach(el => embed.addField(el.querySelector('.name')?.textContent, `${el.querySelector('.num')?.textContent} ${el.querySelector('.before')?.textContent}`, true))

        message.channel.send(embed)
        message.channel.send(new MessageEmbed()
            .setTitle('전세계 코로나19 현황')
            .setColor('RANDOM')
            .setDescription(`확진환자: **${parseInt(confirmed).toLocaleString()}명**\n완치: **${parseInt(recovered).toLocaleString()}명**\n사망: **${parseInt(deaths).toLocaleString()}명**`)
        )
    }
}

export default Covid19