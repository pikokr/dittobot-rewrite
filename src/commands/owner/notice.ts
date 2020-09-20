import { MessageEmbed, MessageReaction, User } from 'discord.js'
import { CommandType } from '../../utils'

const Command: CommandType = {
    name: 'notice',
    aliases: ['공지', '공지사항', 'ㅜㅐ샻ㄷ', 'rhdwl', 'rhdwltkgkd'],
    category: 'owner',
    async run(client, message, args) {
        if (!args.join(' ')) return

        const msg = await message.channel.send(new MessageEmbed().setTitle(`${client.user?.username} 공지사항`).setDescription(`\`\`\`\n${args.join(' ')}\n\`\`\``).setColor(0x00ff00))
        const filter = (reaction: MessageReaction, user: User) => (reaction.emoji.name === '⭕' || reaction.emoji.name === '❌') && user.id === message.author.id

        await msg.react('⭕')
        await msg.react('❌')

        const reactions = await msg.awaitReactions(filter, {
            max: 1,
            time: 20000
        })

        if (reactions.first()?.emoji.name === '⭕') {
            await msg.edit(new MessageEmbed().setTitle('공지사항 발신 완료').setColor(0x00ff00))
        } else await msg.edit(new MessageEmbed().setTitle('공지사항 발신 취소').setColor(0x00ff00))
    }
}

export default Command