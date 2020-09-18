import { Client, Message, MessageEmbed } from 'discord.js'

export default {
    name: 'help',
    aliases: ['도움'],
    run(client: Client, message: Message): void {
        message.channel.send(new MessageEmbed().setTitle('도움말'))
    }
}