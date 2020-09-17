import { Message } from 'discord.js'

export type Ops = {
    ownerID: string
    prefix: string
    formatTime: (date: Date) => void
    getMember: (message: Message, msg: string) => void
}