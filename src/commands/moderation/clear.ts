import { Collection, Message, Snowflake, TextChannel } from 'discord.js'
import { CommandType } from '../../types'

const Command: CommandType = {
    name: 'clear',
    aliases: ['삭제', '청소', 'delete', '칟ㅁㄱ', 'ㅇ딛ㅅㄷ', 'tkrwp', 'cjdth', '지워', 'wldnj', 'clean', '칟무', '클린'],
    run(client, message, args) {
        if (message.deletable) message.delete()
    
        if (!message.member?.hasPermission('MANAGE_MESSAGES')) return message.reply('❌ 메세지 관리 권한이 필요합니다.')
        if (!message.guild?.me?.hasPermission('MANAGE_MESSAGES')) return message.reply(`❌ ${client.user?.username}의 권한에 **메세지 관리 권한**이 필요합니다.`)
    
        if (isNaN(parseInt(args[0])) || parseInt(args[0]) <= 0 || !Number.isInteger(parseInt(args[0]))) return message.reply('자연수를 입력해 주세요.')
    
        ;(<TextChannel>message.channel).bulkDelete(parseInt(args[0]) > 100 ? 100 : parseInt(args[0]), true).then((deleted: Collection<Snowflake, Message>) => message.channel.send(`\`${deleted.size}\`개의 메세지를 삭제하였습니다.`)).then((msg: Message) => msg.delete({ timeout: 5000 })).catch((err: Error) => message.channel.send(`알 수 없는 오류가 발생했습니다.\n${err}`))
    }
}

export default Command