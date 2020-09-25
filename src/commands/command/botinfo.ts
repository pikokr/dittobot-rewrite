import { version as DJSVersion, MessageEmbed } from 'discord.js'
import { CommandType } from '../../types'
import { VERSION as TSNodeVersion } from 'ts-node'
import { version as TSVersion } from 'typescript'

const Botinfo: CommandType = {
    name: 'botinfo',
    aliases: ['봇정보', 'ㅠㅐ샤ㅜ래', 'qhtwjdqh'],
    category: 'botinfo',
    run(client, message, _, { formatTime, ownerID }) {
        message.channel.send(new MessageEmbed()
            .setTitle(`${client.user?.username} 정보`)
            .setColor(0x00ff00)
            .setThumbnail(<string>client.user?.displayAvatarURL())
            .setDescription(`봇 이름: **${client.user?.username}**\n🆔 봇 ID: **${client.user?.id}**\n🎂 봇 생성 시간: **${formatTime(<Date>client.user?.createdAt)}**\n개발자: **${client.users.cache.get(ownerID)?.tag}**\n\n개발 언어: **TypeScript** | ${client.emojis.cache.get('694519344838737960')}\nNode.js: **${process.versions.node}** | ${client.emojis.cache.get('687658724554309681')}\nTypeScript: **${TSVersion}**\nTS Node: **${TSNodeVersion}**\nDiscord.js: **${DJSVersion}** | ${client.emojis.cache.get('689439626896736270')}`)
        )
    }
}

export default Botinfo