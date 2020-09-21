import { TextChannel } from 'discord.js'
import { CommandType } from '../../types'

const Slowmode: CommandType = {
    name: 'slowmode',
    aliases: ['슬로우모드', '니ㅐ즈ㅐㅇㄷ', 'tmffhdnahem'],
    run: (client, message, args) => {
        if (message.channel.type !== 'text') return message.channel.send('텍스트 채널에서만 가능한 명령어입니다.')

        if (!args[0]) return message.channel.send(`${message.channel.name}의 슬로우모드는 ${message.channel.rateLimitPerUser}초입니다.`)

        if (!message.member?.hasPermission('MANAGE_CHANNELS')) return message.channel.send('❌ 채널 관리 권한이 필요합니다.')
        if (!message.guild?.me?.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`❌ ${client.user?.username}의 권한에 **채널 관리 권한**이 필요합니다.`)

        if (isNaN(parseInt(args[0])) || parseInt(args[0]) < 0 || parseInt(args[0]) > 21600 || !Number.isSafeInteger(parseInt(args[0]))) return message.channel.send('0 ~ 21600 사이의 자연수만 입력해 주세요.')

        ;(<TextChannel>message.channel).setRateLimitPerUser(parseInt(args[0])).then(channel => message.channel.send(`${channel.rateLimitPerUser}초로 설정되었습니다.`)).catch((err: Error) => message.channel.send(`권한이 부족하거나 알 수 없는 오류가 발생했습니다.\n${err}`))
    }
}

export default Slowmode