import { Client, Message } from 'discord.js'
import { Ops } from './Ops'

export type Command = {
    name: string
    aliases: Array<string>
    category: string
    run: (client: Client, message?: Message, args?: Array<string>, ops?: Ops) => void
}