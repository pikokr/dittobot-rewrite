import { MessageEmbed } from 'discord.js'
import { CommandType } from '../../types'
import fetch from 'node-fetch'

const Hangang: CommandType = {
    name: 'hangang',
    aliases: ['한강온도', '한강수온', '한강', 'gkssrkd'],
    async run(_, message, __, { formatTime }) {
        const { temp, time }: { temp: string; time: Date } = await (await fetch('http://hangang.dkserver.wo.tc/')).json()

        message.channel.send(new MessageEmbed().setTitle('한강의 수온').setColor(0x00ff00).setTimestamp().setDescription(`**${temp}℃**`).setFooter(`${formatTime(time)} 기준`))
    }
}

export default Hangang