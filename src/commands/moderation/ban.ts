import { MessageEmbed, MessageReaction, User } from 'discord.js'
import { CommandType } from '../../utils'

const Ban: CommandType = {
    name: 'ban',
    aliases: ['차단', '밴', 'qos', 'ckeks', 'ㅠ무'],
    async run(client, message, args) {
        if (!args[0]) return message.reply('차단할 멤버를 멘션 또는 ID로 적어주세요.')

        if (!message.member?.hasPermission('BAN_MEMBERS')) return message.channel.send('❌ 차단 권한이 필요합니다.')
        if (!message.guild?.me?.hasPermission('BAN_MEMBERS')) return message.channel.send(`❌ ${client.user?.username}의 권한에 **차단 권한**이 필요합니다.`)

        const user = message.mentions.members?.first() || message.guild?.members.cache.get(args[0])
        
        if (!user) return message.channel.send('멤버를 찾을 수 없습니다.')
        if (message.author.id === user.id) return message.channel.send('자기 자신을 차단할 수 없습니다.')
        if (!user.bannable) return message.channel.send(`역할이 ${client.user} 보다 높거나 권한이 부족하여 차단을 할 수 없습니다.`)

        const embed = new MessageEmbed().setColor(0xff0000)
            .setThumbnail(user.user.displayAvatarURL())
            .setFooter(message.author.username, message.author.displayAvatarURL())
            .setTimestamp()
            .setTitle('멤버 차단')
            .setDescription(`**차단된 멤버**\n${user}\n\n**차단한 사람**\n${message.author}\n\n**이유**\n${args.slice(1).join(' ') || '없음'}`)

        const promtEmbed = new MessageEmbed().setColor(0x00ff00).setDescription(`**${user}(${user.id})**님을 차단하실 건가요?`)
        const filter = (reaction: MessageReaction, user: User) => (reaction.emoji.name === '✅' || reaction.emoji.name === '❎') && user.id === message.author.id

        const msg = await message.channel.send(promtEmbed)

        await msg.react('✅')
        await msg.react('❎')

        const collected = await msg.awaitReactions(filter, {
            max: 1
        })

        if (collected.first()?.emoji.name === '✅') {
            msg.delete()

            user.ban({ reason: args.slice(1).join(' ') || undefined }).catch((err: Error) => message.channel.send(`알 수 없는 오류가 발생했습니다.\n${err}`))

            message.channel.send(embed)
        } else {
            msg.delete()

            message.channel.send('차단이 취소되었습니다.')
        }
    }
}

export default Ban