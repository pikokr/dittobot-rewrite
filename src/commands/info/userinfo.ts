import { CommandType } from '../../utils'
import { ClientPresenceStatusData, MessageEmbed } from 'discord.js'

const Command: CommandType = {
    name: 'userinfo',
    aliases: ['정보', '내정보', 'user-info', 'user-information', 'user', 'info-user', 'user_info', '유저정보'],
    run: (client, message, args, { getMember, formatTime }) => {
        const member = getMember(message, args.join(' '))

        const embed = new MessageEmbed()
            .setTitle(`${member.user.username}님의 정보`)
            .setFooter(member.user.username, member.user.displayAvatarURL())
            .setThumbnail(member.user.displayAvatarURL())
            .setColor(member.displayHexColor === '#000000' ? '#FFFFFF' : member.displayHexColor)
            .setTimestamp()
            .addField(`${client.emojis.cache.get('709051340067962950')} 유저 이름`, member.user.username)
        
        if (member.user.username !== member.displayName) embed.addField(`${client.emojis.cache.get('709051340067962950')} 디스플레이 이름`, member.displayName)

        embed.addFields([
            { name: `${client.emojis.cache.get('709051340067962950')} 디스코드 태그`, value: member.user.tag },
            { name: '🆔 ID', value: member.user.id }
        ])

        if (member.user.presence.status !== 'offline' && !member.user.bot) embed.addField(`${client.emojis.cache.get('709051340067962950')} 디스코드 클라이언트`, Object.keys(<ClientPresenceStatusData>member.user.presence.clientStatus).join(', '))

        embed.addFields([
            { name: '상태', value: `${status[member.user.presence.status]} (${member.user.presence.status})` },
            { name: '📥 서버에 들어온 시간', value: formatTime(<Date>member.joinedAt) },
            { name: '📥 디스코드 가입 시간', value: formatTime(member.user.createdAt) }
        ])

        if (member.presence.activities[0]) embed.addField('상태 메세지/게임', member.presence.activities.map(activity => `${activity.type === 'CUSTOM_STATUS' ? `상태메세지: ${activity.emoji ? activity.emoji && activity.state ? `${activity.emoji} ${activity.state}` : activity.emoji : activity.state}` : `게임: ${activity.name}`}`).join('\n'))

        const roleEmbed = new MessageEmbed().setTitle(member.roles.cache.filter(n => n.id !== message.guild?.id).size > 30 ? `${member.user.username}님의 역할 (${member.roles.cache.filter(n => n.id !== message.guild?.id).size}개 중 30개)` : `${member.user.username}님의 역할 (${member.roles.cache.filter(n => n.id !== message.guild?.id).size}개)`).setDescription(member.roles.cache.filter(r => r.id !== message.guild?.id).map(r => r).slice(0, 30).join(', ') || '없음').setColor(member.displayHexColor === '#000000' ? '#FFFFFF' : member.displayHexColor)

        message.channel.send(embed)
        if (member.roles.cache.filter(role => role.id !== message.guild?.id).size) message.channel.send(roleEmbed)
    }
}

const status = {
    online: '🟢 온라인',
    idle: '🌙 자리 비움',
    dnd: '⛔ 다른 용무 중',
    offline: '🔳 오프라인',
    invisible: '🔳 오프라인 표시'
}

const clientStatus = {
    desktop: '🖥 디스코드 앱',
    web: '⌨ 웹',
    mobile: '📱 모바일'
}

export default Command