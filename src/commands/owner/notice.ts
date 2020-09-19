import { Client, Message, MessageEmbed, MessageReaction, User } from 'discord.js'

export default {
    name: 'notice',
    aliases: ['공지', '공지사항', 'ㅜㅐ샻ㄷ', 'rhdwl', 'rhdwltkgkd'],
    category: 'owner',
    async run(client: Client, message: Message, args: Array<string>): Promise<void> {
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
            // 샌즈
        } else {
            await msg.edit(new MessageEmbed().setTitle('공지사항 발신 취소').setColor(0x00ff00))
        }
    }
}