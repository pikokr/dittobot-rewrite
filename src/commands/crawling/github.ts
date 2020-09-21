import { CommandType } from '../../types'
import fetch from 'node-fetch'
import { MessageEmbed } from 'discord.js'

type res = {
    login: string
    avatar_url: string
    html_url: string
    type: 'User' | 'Organization'
    location: string | null
    blog: string
    created_at: Date
    bio: string | null
    followers: number
    following: number
    email: string | null
    public_repos: number
    public_gists: number
}

const Github: CommandType = {
    name: 'github',
    aliases: ['깃허브', '깃헙', '햐소ㅕㅠ', 'rltgjqm', 'rltgjq'],
    async run(_, message, args, { formatTime }) {
        if (!args.join(' ')) return

        const { login, avatar_url, location, created_at, followers, following, email, blog, html_url, bio, public_repos, public_gists, type }: res = await (await fetch(`https://api.github.com/users/${encodeURI(args.join(''))}`)).json()
    
        if (!login) return message.channel.send(`\`${args.join(' ')}\` (이)라는 유저를 찾을 수 없습니다...`)

        message.channel.send(new MessageEmbed().setTitle(`${login}님의 정보`).setURL(html_url).setColor(0x000000).setAuthor('Github', 'https://github.githubassets.com/favicons/favicon.png', 'https://github.com/').setFooter(login, avatar_url).setThumbnail(avatar_url)
        .addFields([
            { name: '이름', value: login },
            { name: '상태 메세지', value: bio || '없음' },
            { name: '지역', value: location || '없음' },
            { name: '계정', value: accountTypes[type], inline: true },
            { name: '레포지토리', value: public_repos ? `${public_repos}개` : '없음', inline: true },
            { name: 'Gist', value: public_gists ? `${public_gists}개` : '없음', inline: true },
            { name: '블로그', value: blog || '없음', inline: true },
            { name: '이메일', value: email || '없음', inline: true },
            { name: '팔로워', value: followers ? `${followers}명` : '없음', inline: true },
            { name: '팔로잉', value: following ? `${following}명` : '없음', inline: true },
            { name: '가입 날짜', value: formatTime(created_at), inline: true }
        ]))
    }
}

const accountTypes = {
    User: '유저',
    Organization: '조직'
}

export default Github