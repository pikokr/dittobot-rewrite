import { Client, Message, MessageEmbed, MessageReaction, User } from 'discord.js'
import { inspect } from 'util'
import { OpsType } from '../../utils'

export default {
    name: 'eval',
    aliases: ['ㄷㅍ미'],
    category: 'owner',
    run(client: Client, message: Message, args: Array<string>, { ownerID }: OpsType): void | Promise<Message> {
        if (!args.join(' ')) return

        const input = args.join(' '), filter = (reaction: MessageReaction, user: User) => (reaction.emoji.name === '🗑️') && user.id === ownerID

        let type: string | (() => void)

        new Promise(resolve => resolve(eval(input))).then((res: any): void => {
            let output: string = type = res

            if (typeof output !== 'string') output = inspect(output, { depth: 0 })
            if (typeof type === 'function') output = type.toString()
            if (output.includes(<string>client.token)) output = output.replace(new RegExp(<string>client.token, 'gi'), 'Secret')

            if (output.length > 1500) output = `${output.substr(0, 1450)}...`
            if (!output) output = '결과 없음'

            message.channel.send(new MessageEmbed().setTitle('Eval').setColor(0x00ff00).setDescription(`**📥 Input**\n\`\`\`js\n${args.join(' ')}\n\`\`\`\n**📤 Output**\n\`\`\`js\n${output}\n\`\`\``)).then(async msg => {
                await msg.react('🗑️')

                const awaitReactions = await msg.awaitReactions(filter, {
                    max: 1,
                    time: 20000
                })

                if (awaitReactions.first()?.emoji.name === '🗑️') msg.delete()
            })
        }).catch(err => message.channel.send(new MessageEmbed().setTitle('Eval').setColor(0xff0000).setDescription(`**📥 Input**\n\`\`\`js\n${args.join(' ')}\n\`\`\`\n**📤 Output**\n\`\`\`js\n${err}\n\`\`\``)).then(async msg => {
            await msg.react('🗑️')

            const awaitReactions = await msg.awaitReactions(filter, {
                max: 1,
                time: 20000
            })

            if (awaitReactions.first()?.emoji.name === '🗑️') msg.delete()
        }))
    }
}