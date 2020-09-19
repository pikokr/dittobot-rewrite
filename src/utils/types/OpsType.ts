import { GuildMember, Message } from 'discord.js'

export interface OpsType {
    ownerID: string
    prefix: string
    formatTime: (date: Date) => string
    getMember: (message: Message, msg: string) => GuildMember
    uuidv4: () => string
}