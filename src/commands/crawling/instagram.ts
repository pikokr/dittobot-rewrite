import { MessageEmbed } from 'discord.js'
import fetch from 'node-fetch'
import { CommandType } from '../../types'

const Instagram: CommandType = {
    name: 'instar',
    aliases: ['인스타', 'insta', 'instargram', '인스타그램'],
    async run (_, message, args) {
        if (!args.join(' ')) return message.reply('검색할 인스타그램 유저를 입력해 주세요!')

        let res: {
            graphql: {
                user: {
                    biography: string
                    external_url_linkshimmed: string
                    edge_followed_by: {
                        count: number
                    }
                    edge_follow: {
                        count: number
                    }
                    full_name: string
                    is_private: boolean
                    profile_pic_url_hd: string
                    username: string
                    edge_owner_to_timeline_media: {
                        count: number
                    }
                }
            }
        }

        try {
            res = await (await fetch(`https://www.instagram.com/${encodeURI(args.join(' '))}/?__a=1`)).json()
            if (!res.graphql) return message.channel.send(`${args.join(' ')} (이)라는 유저를 찾을 수 없습니다.`)
        } catch (e) {
            return message.channel.send(`알 수 없는 오류가 발생하였습니다.\n${e}`)
        }

        const { user } = res.graphql

        message.channel.send(new MessageEmbed().setAuthor('Instagram', 'https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png', 'https://www.instagram.com/').setColor(0xff00bd)
            .setFooter(user.username, user.profile_pic_url_hd)
            .setTitle(`${user.full_name}님의 정보`)
            .setURL(user.external_url_linkshimmed)
            .setThumbnail(user.profile_pic_url_hd)
            .setDescription(`**[들어가기](https://www.instagram.com/${user.username})**`)
            .addFields([
                { name: '계정 이름', value: user.username },
                { name: '닉네임', value: user.full_name },
                { name: '소개글', value: user.biography || '없음' },
                { name: '비공개 여부', value: user.is_private ? '비공개 🔐' : '공개 🔓' },
                { name: '계정 게시글 수', value: `${user.edge_owner_to_timeline_media.count.toLocaleString()}개`, inline: true },
                { name: '계정 팔로워 수', value: `${user.edge_followed_by.count.toLocaleString()}명`, inline: true },
                { name: '계정 팔로우 수', value: `${user.edge_follow.count.toLocaleString()}명`, inline: true }
            ])
        )
    }
}

export default Instagram