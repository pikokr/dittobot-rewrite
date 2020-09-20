import { MessageEmbed } from 'discord.js'
import MarkdownIt from 'markdown-it'
import { CommandType } from '../../utils'

const Command: CommandType = {
    name: 'markdown',
    run(_, message, args) {
        if (!args.join(' ')) return

        const markdownit = new MarkdownIt()
        const markdown = args.join(' ').replace(/^```(markdown|md)?\s/, '').replace(/\s?```$/, '')
        const html = markdownit.render(markdown)

        message.channel.send(new MessageEmbed().setColor(0x00ff00).setTitle('Markdown to HTML').setDescription(`**Markdown**\n\`\`\`md\n${markdown.length > 900 ? `${markdown.substr(0, 850)}...` : markdown}\n\`\`\`\n**HTML**\n\`\`\`html\n${html.length > 900 ? `${html.substr(0, 850)}...` : html}\n\`\`\``))
    }
}

export default Command