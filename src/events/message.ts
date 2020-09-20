import { Message } from 'discord.js'

export default (message: Message): void => {
    if (message.author.bot || message.system) return
}