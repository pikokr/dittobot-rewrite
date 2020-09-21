import { CommandType } from '../../utils'
import fetch from 'node-fetch'
import { MessageEmbed } from 'discord.js'

type releases = {
    upload_time: string
}

type resp = {
    info: {
        name: string
        package_url: string
        summary: string
        version: string
        license: string
        author: string
    }
    releases: Array<releases>
}

const Pypi: CommandType = {
    name: 'pypi',
    async run(_, message, args) {
        if (!args.join(' ')) return

        let res: resp

        try {
            res = await (await fetch(`https://pypi.org/pypi/${encodeURI(args.join(' '))}/json`)).json()
        } catch (err) {
            return message.channel.send(`${args.join(' ')} (이)라는 패키지를 찾을 수 없습니다.\n${err}`)
        }

        message.channel.send(new MessageEmbed().setAuthor('PyPi', undefined, 'https://pypi.org/')
            .setTitle(res.info.name)
            .setURL(res.info.package_url)
            .setDescription(res.info.summary.length > 500 ? `${res.info.summary.substr(0, 495)}...` : res.info.summary || '설명 없음')
            .addFields([
                { name: '버전', value: res.info.version, inline: true },
                { name: '라이센스', value: res.info.license || '없음', inline: true },
                { name: '제작', value: res.info.author, inline: true },
                /*{ name: '만들어진 시간', value: formatTime(res.releases[Object.keys(res.releases)[0]][0].upload_time), inline: true },
                { name: '업데이트 시간', value: formatTime(res.releases[Object.keys(res.releases).pop()][0].upload_time), inline: true }*/
            ])
        )
    }
}

export default Pypi