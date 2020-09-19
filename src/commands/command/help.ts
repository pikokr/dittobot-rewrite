import { Bot } from '../../utils'

export default {
    name: 'help',
    aliases: ['도움'],
    category: 'command',
    run(client: Bot): void {
        console.log(client.commands.map((command: any) => command.category))
    }
}