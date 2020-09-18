import { Message } from 'discord.js'

export interface OpsType {
    ownerID: string
    prefix: string
    formatTime: (date: Date) => void
    getMember: (message: Message, msg: string) => void
    uuidv4: () => void
}