import { MessageEmbed } from 'discord.js'
import { CommandType } from '../../utils'
import fetch from 'node-fetch'

const Command: CommandType = {
    name: 'docs',
    aliases: ['문서', '앷ㄴ', 'anstj'],
    async run(_, message, args) {
        if (!args.join(' ')) return

        const embed = await (await fetch(`https://djsdocs.sorta.moe/v2/embed?src=https://raw.githubusercontent.com/discordjs/discord.js/docs/stable.json&q=${encodeURI(args.join(' '))}`)).json()

        try {
            message.channel.send(new MessageEmbed(embed))
        } catch (err) {
            message.channel.send(new MessageEmbed().setTitle('Error').setColor(0xff0000).setDescription(err))
        }
    }
}

export default Command