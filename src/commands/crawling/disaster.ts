import { MessageEmbed } from 'discord.js'
import fetch from 'node-fetch'
import { CommandType } from '../../types'

const Disaster: CommandType = {
    name: 'disaster',
    aliases: ['재난문자', 'wosksanswk', '얀ㅁㄴㅅㄷㄱ'],
    async run(_, message) {
        const res: Array<{ CONT: string; SJ: string }> = await (await fetch('http://m.safekorea.go.kr/idsiSFK/neo/ext/json/disasterDataList/disasterDataList.json')).json()

        message.channel.send(new MessageEmbed().setTitle('재난 문자').setColor(0x00ff00).setDescription(res.slice(0, 5).map(disaster => `${disaster.CONT} ${disaster.SJ}`).join('\n\n')))
    }
}

export default Disaster