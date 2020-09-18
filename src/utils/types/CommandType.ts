import { Client, Message } from 'discord.js'
import { OpsType } from './OpsType'

export interface CommandType {
    name: string
    aliases: Array<string>
    category: string
    run: (client: Client, message?: Message, args?: Array<string>, ops?: OpsType) => void
}