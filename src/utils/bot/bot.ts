import { Client, Collection, Message, User } from 'discord.js'
import { readdirSync } from 'fs'
import path from 'path'
import ops from './ops'
import pingpong from './pingpong'
import { CommandType } from '../../types'
import web from '../../web'

export default class extends Client {
    commands: Collection<unknown, unknown>
    aliases: Collection<unknown, unknown>
    categories: Array<string>

    constructor() {
        super()

        this.commands = new Collection()
        this.aliases = new Collection()
        this.categories = readdirSync(path.join(__dirname, '../../commands/'))
    }

    start(token?: string): void {
        this.login(token)
        this.reloadCommands()

        this.on('ready', () => {
            console.log(`Login ${this.user?.username}\n----------------------------`)

            setInterval(() => {
                const activities: Array<string> = [`${this.guilds.cache.size}개의 서버`, `${this.users.cache.filter((user: User) => !user.bot).size}명의 유저`, `${this.guilds.cache.size} guilds`, `${this.users.cache.filter((user: User) => !user.bot).size} users`]

                this.user?.setActivity(activities[Math.floor(Math.random() * activities.length)])
            }, 10000)

            web.start(this)
        })

        this.on('message', async (message: Message) => {
            if (message.author.bot || message.system) return
            if (!message.content.startsWith(ops.prefix)) return

            const args: Array<string> = message.content.slice(ops.prefix.length).trim().split(/ +/g),
                cmd = <string>args.shift()?.toLowerCase(),
                command = <CommandType>this.commands.get(this.aliases.get(cmd) || cmd)

            if (command) {
                if (command.category === 'owner' && message.author.id !== ops.ownerID) return message.channel.send(`\`${this.user?.username} 개발자\`만 가능합니다.`)

                command.run(this, message, args, ops)
            } else {
                const text = await pingpong(message.author.id, cmd)

                message.channel.send(text)
            }
        })
    }

    reloadCommands(): void {
        readdirSync(path.join(__dirname, '../../commands/')).forEach(dir => {
            readdirSync(path.join(__dirname, `../../commands/${dir}`)).forEach(file => {
                const command: CommandType = require(path.join(__dirname, `../../commands/${dir}/${file}`)).default

                if (command.name) this.commands.set(command.name, command)
                if (command.aliases && Array.isArray(command.aliases)) command.aliases.forEach((alias: string) => this.aliases.set(alias, command.name))
            })
        })
    }
}