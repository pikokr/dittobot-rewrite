import { MessageEmbed, TextChannel, VoiceChannel } from 'discord.js'
import { CommandType } from '../../utils'

const ChannelInfo: CommandType = {
    name: 'channelinfo',
    aliases: ['채널정보', '초무ㅜ디ㅑㅜ래', 'cosjfwjdqh'],
    run(_, message, args, { formatTime, getChannel }) {
        const channel = getChannel(message, args.join(' '))
        const embed = new MessageEmbed()
            .setTitle(`${channel.name} 채널 정보`)
            .setColor(0xffff00)
            .setFooter(channel.guild.name, <string>channel.guild.iconURL())
            .addField('🆔 ID', channel.id)

        if (channel.parent) embed.addField('카테고리', channel.parent.name)
        if (channel.type === 'text') embed.addField('주제', (<TextChannel>channel)?.topic || '없음')

        embed.addFields([
            { name: '타입', value: types[channel.type] },
            { name: '생성 시간', value: formatTime(channel.createdAt) }
        ])

        if (channel.type === 'voice') embed.addField('비트레이트', `${(<VoiceChannel>channel).bitrate / 1000}kbps`, true)
        if (channel.type === 'text') embed.addField('슬로우모드', (<TextChannel>channel).rateLimitPerUser ? `${(<TextChannel>channel).rateLimitPerUser}초` : '없음', true)

        message.channel.send(embed)
    }
}

const types = {
    text: '텍스트 채널',
    voice: '음성 채널',
    category: '카테고리 채널',
    news: '공지 채널',
    store: '상점 채널'
}

export default ChannelInfo