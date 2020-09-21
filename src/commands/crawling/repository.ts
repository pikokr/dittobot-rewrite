import fetch from 'node-fetch'
import { MessageEmbed } from 'discord.js'
import { CommandType } from '../../types'

type res = {
    html_url: string
    description: string
    created_at: Date
    owner: {
        login: string
        avatar_url: string
    }
    name: string
    homepage: string
    language: string
    stargazers_count: number
    forks_count: number
    license: {
        name: string | null
    } | null
}

const Repository: CommandType = {
    name: 'repository',
    aliases: ['레포지토리', '레포', 'repo', 'ㄱ데ㅐ', 'fpvh', 'fpvhwlxhfl', 'ㄱ데ㅐ냐새교'],
    async run(_, message, args, { formatTime }) {
        if (!args[0]) return message.channel.send('유저 이름을 입력해 주세요')
        if (!args[1]) return message.channel.send('레포지토리 이름을 입력해 주세요')

        const { html_url, description, created_at, owner, name, homepage, language, stargazers_count, forks_count, license }: res = await (await fetch(`https://api.github.com/repos/${encodeURI(args[0])}/${encodeURI(args[1])}`)).json()

        if (!html_url) return message.channel.send(`${args[0]} (이)라는 유저의 ${args[1]} (이)라는 레포지토리를 찾을 수 없습니다...`)

        message.channel.send(new MessageEmbed().setTitle(name).setURL(html_url).setColor(0x000000).setAuthor('Github', 'https://github.githubassets.com/favicons/favicon.png', 'https://github.com/').setFooter(owner.login, owner.avatar_url)
            .addFields([
                { name: '이름', value: name },
                { name: '설명', value: description || '없음' },
                { name: '홈페이지', value: homepage || '없음', inline: true },
                { name: '주요 언어', value: language || '없음', inline: true },
                { name: '스타 수', value: `${stargazers_count}개`, inline: true },
                { name: 'Fork 수', value: forks_count, inline: true },
                { name: '라이선스', value: license ? license.name : '없음', inline: true } ,
                { name: '생성 시간', value: formatTime(created_at) }
            ])
        )
    }
}

export default Repository