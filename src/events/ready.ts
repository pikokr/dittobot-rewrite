import { User } from 'discord.js'
import { Bot } from '../utils'
import web from '../web'

export default (client: Bot): void => {
    console.log(`Login ${client.user?.username}\n----------------------------`)

    setInterval(() => {
        const activities: Array<string> = [`${client.guilds.cache.size}개의 서버`, `${client.users.cache.filter((user: User) => !user.bot).size}명의 유저`, `${client.guilds.cache.size} guilds`, `${client.users.cache.filter((user: User) => !user.bot).size} users`]

        client.user?.setActivity(activities[Math.floor(Math.random() * activities.length)])
    }, 10000)

    web.start(client)
}