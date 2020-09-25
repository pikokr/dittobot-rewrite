import fetch from 'node-fetch'
import { MessageCollector, MessageAttachment, TextChannel, Message } from 'discord.js'
import { CommandType } from '../../types'

const Captcha: CommandType = {
    name: 'captcha',
    aliases: ['캡챠'],
    async run(_, message) {
        const { key }: { key: string } = await (await fetch('https://openapi.naver.com/v1/captcha/nkey?code=0', {
            method: 'GET',
            headers: {
                'X-Naver-Client-Id': <string>process.env.NAVER_API_CLIENT_ID,
                'X-Naver-Client-Secret': <string>process.env.NAVER_API_CLIENT_SECRET
            }
        })).json()

        const img = await (await fetch(`https://openapi.naver.com/v1/captcha/ncaptcha.bin?key=${key}`, {
            method: 'GET',
            headers: {
                'X-Naver-Client-Id': <string>process.env.NAVER_API_CLIENT_ID,
                'X-Naver-Client-Secret': <string>process.env.NAVER_API_CLIENT_SECRET
            }
        })).buffer()

        message.channel.send({ files: [new MessageAttachment(img)] })
        
        const collector = new MessageCollector(<TextChannel>message.channel, (msg: Message) => msg.author.id === message.author.id, {
            time: 72000
        })

        collector.on('collect', async (msg: Message) => {
            const { result, responseTime } = await (await fetch(`https://openapi.naver.com/v1/captcha/nkey?code=1&key=${key}&value=${encodeURI(msg.content)}`, {
                method: 'GET',
                headers: {
                    'X-Naver-Client-Id': <string>process.env.NAVER_API_CLIENT_ID,
                    'X-Naver-Client-Secret': <string>process.env.NAVER_API_CLIENT_SECRET
                }
            })).json()

            message.channel.send(result ? `정답\n${responseTime}초 걸렸습니다` : '틀렸습니다')

            collector.stop()
        })

        collector.on('end', () => message.channel.send('끝났습니다'))
    }
}

export default Captcha