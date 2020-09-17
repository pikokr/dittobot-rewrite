import { Client, Message, MessageEmbed } from 'discord.js'

export default {
    name: 'help',
    run(client: Client, message: Message): void {
        message.channel.send(new MessageEmbed().setTitle('도움말'))
    }
}