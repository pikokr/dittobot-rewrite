import { CommandType } from '../../types'
import { createCanvas } from 'canvas'
import { MessageAttachment } from 'discord.js'

const Profile_create: CommandType = {
    name: 'profile_create',
    aliases: ['프사만들기', '프사제작', 'vmtkaksemfrl', 'pc', 'ㅔ개랴ㅣㄷ_ㅊㄱㄷㅁㅅㄷ', 'profile-create', 'ㅔ개랴ㅣㄷ-ㅊㄱㄷㅁㅅㄷ', 'vmtkwpwkr'],
    run(_, message, args) {
        if (!args[0]) return message.channel.send('폰트 크기 또는 내용을 입력해 주세요.')

        const px = isNaN(parseInt(args[0])) ? 256 : parseInt(args[0])

        if (px > 512 || px < 5) return message.channel.send('5 ~ 512의 수를 입력해 주세요.')

        const width = 512, height = 512

        const value = args.slice(1).join(' ') || args.join(' ')

        const canvas = createCanvas(width, height)
        const ctx = canvas.getContext('2d')

        const svgCanvas = createCanvas(width, height, 'svg')
        const svgCtx = svgCanvas.getContext('2d')

        const pdfCanvas = createCanvas(width, height, 'pdf')
        const pdfCtx = pdfCanvas.getContext('2d')

        ctx.fillStyle = '#333333'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.font = `${px}px CookieRun Black`
        ctx.textAlign = 'center'

        svgCtx.fillStyle = '#333333'
        svgCtx.fillRect(0, 0, svgCanvas.width, svgCanvas.height)
        svgCtx.font = `${px}px CookieRun Black`
        svgCtx.textAlign = 'center'

        pdfCtx.fillStyle = '#333333'
        pdfCtx.fillRect(0, 0, pdfCanvas.width, pdfCanvas.height)
        pdfCtx.font = `${px}px CookieRun Black`
        pdfCtx.textAlign = 'center'

        if (value.includes('\n')) {
            ctx.textBaseline = 'bottom'
            svgCtx.textBaseline = 'bottom'
            pdfCtx.textBaseline = 'bottom'
        } else {
            ctx.textBaseline = 'middle'
            svgCtx.textBaseline = 'middle'
            pdfCtx.textBaseline = 'middle'
        }

        ctx.fillStyle = 'white'
        ctx.strokeStyle = 'white'

        svgCtx.fillStyle = 'white'
        svgCtx.strokeStyle = 'white'

        pdfCtx.fillStyle = 'white'
        pdfCtx.strokeStyle = 'white'

        ctx.strokeText(value, canvas.width / 2, canvas.height / 2)
        ctx.fillText(value, canvas.width / 2, canvas.height / 2)

        svgCtx.strokeText(value, svgCanvas.width / 2, svgCanvas.height / 2)
        svgCtx.fillText(value, svgCanvas.width / 2, svgCanvas.height / 2)

        pdfCtx.strokeText(value, pdfCanvas.width / 2, pdfCanvas.height / 2)
        pdfCtx.fillText(value, pdfCanvas.width / 2, pdfCanvas.height / 2)

        message.channel.send('png', { files: [new MessageAttachment(canvas.toBuffer('image/png'), 'image.png')] })
        message.channel.send('jpg', { files: [new MessageAttachment(canvas.toBuffer('image/jpeg'), 'image.jpg')] })
        message.channel.send('svg', { files: [new MessageAttachment(svgCanvas.toBuffer(), 'image.svg')] })
        message.channel.send('pdf', { files: [new MessageAttachment(pdfCanvas.toBuffer(), 'image.pdf')] })
    }
}

export default Profile_create