import { GuildChannel, GuildMember, Message } from 'discord.js'

export interface OpsType {
    ownerID: string
    prefix: string
    formatTime(date: Date): string
    getMember(message: Message, msg: string): GuildMember
    getChannel(message: Message, msg: string): GuildChannel
    uuidv4(): string
}