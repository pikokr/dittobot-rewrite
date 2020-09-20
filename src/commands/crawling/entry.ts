import fetch from 'node-fetch'
import { MessageEmbed } from 'discord.js'
import { CommandType } from '../../types'

type ProjectData = {
    likeCnt: number
    visit: number
    comment: number
    childCnt: number
}

type resp = {
    username: string
    description: string
    _id: string
    role: 'member' | 'student' | 'teacher' | 'admin'
    avatarImage: string
    blogImage: string
    isBlocked: boolean
}

type Project = {
    data: Array<ProjectData>
    count: number
}

type Discuss = {
    count: number
}

const Command: CommandType = {
    name: 'entry',
    aliases: ['엔트리', '엔1트리', 'dpsxmfl', '둣교', '엔틜', 'dpsxmlf', '망트리', 'akdxmfl'],
    async run(_, message, args) {
        if (!args.join(' ')) return message.channel.send('검색할 엔1트리 유저 닉네임을 입력해 주세요!')

        let res: resp

        try {
            res = await (await fetch(`https://playentry.org/api/getUserByUsername/${encodeURI(args.join(' '))}`)).json()
            if (!res) return message.channel.send(`${args.join(' ')}(이)라는 유저를 찾을 수 없습니다.\n1. 탈퇴한 유저\n2. 존재하지 않는 유저`)
        } catch (err) {
            return message.channel.send(`알 수 없는 에러가 발생했습니다.\n${err}`)
        }

        const { username, description, _id, role, avatarImage, blogImage, isBlocked } = res
        const project: Project = await fetch(`https://playentry.org/api/project/find?option=list&tab=my_project&type=project&user=${_id}`).then(e => e.json())
        const discuss: Discuss = await fetch(`https://playentry.org/api/discuss/find?username=${encodeURI(username)}`).then(e => e.json())

        const embed = new MessageEmbed().setColor(0x00ff00).setTitle(username).setURL(`https://playentry.org/${encodeURI(args.join(' '))}`).addField('상태메세지', description || '없음').addField('계정', roles[role], true).setThumbnail(avatarImage ? `https://playentry.org/uploads/profile/${_id.substr(0, 2)}/${_id.substr(2, 2)}/avatar_${_id}.png` : 'https://playentry.org/img/assets/avatar_img.png')
        
        if (blogImage) embed.setImage(`https://playentry.org/uploads/profile/${_id.substr(0, 2)}/${_id.substr(2, 2)}/blog_${_id}.png`)
        if (isBlocked) embed.addField('계정 정지', '정지됨', true)

        embed.addFields([
            { name: '🆔 ID', value: _id },
            { name: '작품 수', value: Number(project.count).toLocaleString(), inline: true }
        ])

        let likeCount = 0, visitCount = 0, commentCount = 0, childCount = 0

        project.data.forEach((data: ProjectData) => {
            likeCount += data.likeCnt
            visitCount += data.visit
            commentCount += data.comment
            childCount += data.childCnt
        })

        embed.addFields([
            { name: '❤ 좋아요 수', value: Number(likeCount).toLocaleString(), inline: true },
            { name: '👀 조회수', value: Number(visitCount).toLocaleString(), inline: true },
            { name: '🗨 작품 댓글 수', value: Number(commentCount).toLocaleString(), inline: true },
            { name: '💬 글 수', value: Number(discuss.count).toLocaleString(), inline: true }
        ])

        if (role !== 'admin' && !isBlocked) embed.addField('작품 사본 수', Number(childCount).toLocaleString(), true)

        message.channel.send(embed)
    }
}

const roles = {
    member: '학생 계정',
    student: '학생 계정',
    teacher: '선생님 계정',
    admin: '관리자 계정'
}

export default Command