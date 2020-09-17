import { GuildMember, Message } from 'discord.js'

export default {
    ownerID: <string>process.env.OWNER_ID,
    prefix: '디토 ',
    formatTime(date: Date = new Date()): string {
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`
    },
    getMember(message: Message, msg: string): GuildMember {
        let member: GuildMember | null | undefined = message.guild?.members.cache.get(msg)

        if (!member && message.mentions.members) member = message.mentions.members?.first()
        if (!member && msg) member = message.guild?.members.cache.find((mem: GuildMember) => mem.displayName.toLowerCase().includes(msg) || mem.user.username.toLowerCase().includes(msg) || mem.user.tag.toLowerCase() === msg)
        if (!member) member = message.member

        return <GuildMember>member
    }
}