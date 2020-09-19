import { Client, Message, MessageEmbed, MessageReaction, User } from 'discord.js'
import { inspect } from 'util'
import { OpsType } from '../../utils'

export default {
    name: 'eval',
    aliases: ['ㄷㅍ미'],
    category: 'owner',
    run(client: Client, message: Message, args: Array<string>, { ownerID }: OpsType): void | Promise<Message> {
        if (!args.join(' ')) return

        const input = args.join(' ').replace(/^```(js|javascript|jsx|ts|typescript)?\s/, '').replace(/\s?```$/, '')
        const filter = (reaction: MessageReaction, user: User) => (reaction.emoji.name === '🗑️') && user.id === ownerID
        const embed = new MessageEmbed().setTitle('Eval').setColor(0x00ff00)

        let type: string | (() => void)

        new Promise(resolve => resolve(eval(input))).then(async (res: any): Promise<void> => {
            let output: string = type = res

            if (typeof output !== 'string') output = inspect(output, { depth: 0 })
            if (typeof type === 'function') output = type.toString()
            if (output.includes(<string>client.token)) output = output.replace(new RegExp(<string>client.token, 'gi'), 'Secret')

            if (output.length > 1500) output = `${output.substr(0, 1450)}...`
            if (!output) output = '결과 없음'

            const msg = await message.channel.send(embed.setDescription(`**📥 Input**\n\`\`\`js\n${input}\n\`\`\`\n**📤 Output**\n\`\`\`js\n${output}\n\`\`\``))

            await msg.react('🗑️')

            const collector = await msg.createReactionCollector(filter, {
                max: 1,
                time: 20000
            })

            collector.on('end', () => msg.delete())
        }).catch(async (err: Error) => {
            const msg = await message.channel.send(embed.setColor(0xff0000).setDescription(`**📥 Input**\n\`\`\`js\n${input}\n\`\`\`\n**📤 Output**\n\`\`\`js\n${err}\n\`\`\``))

            await msg.react('🗑️')

            const collector = await msg.createReactionCollector(filter, {
                max: 1,
                time: 20000
            })

            collector.on('end', () => msg.delete())
        })
    }
}