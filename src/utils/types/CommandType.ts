import { Client, Message } from 'discord.js'
import { Bot } from '../bot'
import { OpsType } from './OpsType'

export interface CommandType {
    name: string
    aliases: Array<string>
    category: string
    run: (client: Client | Bot, message?: Message, args?: Array<string>, ops?: OpsType) => void
}