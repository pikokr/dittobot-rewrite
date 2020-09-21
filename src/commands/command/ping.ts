import { MessageEmbed } from 'discord.js'
import { CommandType } from '../../utils'

const Ping: CommandType = {
    name: 'ping',
    aliases: ['핑'],
    async run(client, message) {
        const msg = await message.channel.send('🏓 **Pinging...**')
        await msg.edit('', new MessageEmbed().setTitle('🏓 Pong!').setColor(0x00ff00).setFooter(message.author.username, message.author.displayAvatarURL()).setTimestamp().setDescription(`**Discord API Latency**\n${client.ws.ping}ms\n\n**Latency**\n${msg.createdTimestamp - message.createdTimestamp}ms`))
    }
}

export default Ping