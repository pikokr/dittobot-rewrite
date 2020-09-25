import { GuildChannel, GuildMember, Message } from 'discord.js'
import { OpsType } from '../../types'

const ops: OpsType = {
    ownerID: <string>process.env.OWNER_ID,
    prefix: '디라야 ',
    formatTime(_date: Date = new Date()): string {
        const date = new Date(_date)
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`
    },
    getMember(message: Message, msg: string): GuildMember {
        let member: GuildMember | null | undefined = message.guild?.members.cache.get(msg)

        if (!member && message.mentions.members) member = message.mentions.members?.first()
        if (!member && msg) member = message.guild?.members.cache.find((mem: GuildMember) => mem.displayName.toLowerCase().includes(msg) || mem.user.username.toLowerCase().includes(msg) || mem.user.tag.toLowerCase() === msg)
        if (!member) member = message.member

        return <GuildMember>member
    },
    getChannel(message: Message, msg: string): GuildChannel {
        let channel: GuildChannel | null | undefined = message.guild?.channels.cache.get(msg)

        if (!channel && msg) channel = message.guild?.channels.cache.find(ch => ch.name.includes(msg))
        if (!channel) channel = <GuildChannel>message.channel

        return <GuildChannel>channel
    },
    uuidv4(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)

            return v.toString(16)
        })
    }
}

export default ops