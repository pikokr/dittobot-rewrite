import { CommandType } from '../../types'
import { MessageEmbed } from 'discord.js'
import os from 'os'

const System: CommandType = {
    name: 'system',
    aliases: ['시스템', 'tltmxpa', '뇬ㅅ드'],
    run(client, message) {
        message.channel.send(new MessageEmbed().setTitle(`${client.user?.username} 시스템 정보`).setColor(0x00ff00).setDescription(`PLATFORM: **${process.platform}**\nARCH: **${process.arch}**\nCPU: **${os.cpus()[0].model}**`))
    }
}

export default System