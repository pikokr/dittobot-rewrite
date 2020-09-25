import fetch from 'node-fetch'
import { MessageEmbed } from 'discord.js'
import { CommandType } from '../../types'

type resp = {
    items: Array<{
        title: string
        subtitle: string
        link: string
        image: string
        pubDate: string
        director: string
        actor: string
        userRating: number
    }>
}

const Movie: CommandType = {
    name: 'movie',
    aliases: ['영화', 'dudghk', 'ㅡㅐ퍋'],
    async run(_, message, args) {
        if (!args.join(' ')) return

        const res: resp = await (await fetch(`https://openapi.naver.com/v1/search/movie.json?query=${encodeURI(args.join(' '))}`, {
            method: 'GET',
            headers: {
                'X-Naver-Client-Id': <string>process.env.NAVER_API_CLIENT_ID,
                'X-Naver-Client-Secret': <string>process.env.NAVER_API_CLIENT_SECRET
            }
        })).json()

        if (!res.items[0]) return message.channel.send(`${args.join(' ')} (이)라는 영화를 찾을 수 없습니다`)

        const { items: [ { title, subtitle, link, image, pubDate, director, actor, userRating } ] } = res

        message.channel.send(new MessageEmbed()
            .setAuthor('Naver Movie', 'https://www.naver.com/favicon.ico', 'https://movie.naver.com/')
            .setTitle('네이버 영화')
            .setURL(link)
            .setThumbnail(image)
            .setColor(0x00ff00)
            .setDescription(`**${title.replace(/<(\/)?b>/g, '')}**\n${subtitle && `(${subtitle.replace(/<(\/)?b>/g, '')})\n`}\n**제작연도**: ${pubDate}\n**감독**: ${director.split('|').slice(0, -1).join(', ') || '알 수 없음'}\n**배우**: ${actor.split('|').slice(0, -1).join(', ') || '알 수 없음'}\n**평점**: ${userRating || '알 수 없음'}`)
        )
    }
}

export default Movie