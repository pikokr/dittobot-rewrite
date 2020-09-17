import { config } from 'dotenv'
import { ShardingManager } from 'discord.js'
import path from 'path'

config({
    path: path.join(__dirname, '.env')
})

const manager: ShardingManager = new ShardingManager(path.join(__dirname, 'bot.ts'), {
    execArgv: ['-r', 'ts-node/register']
})

;(async () => {
    await manager.spawn()
    manager.on('shardCreate', shard => console.log(`Create Shard ${shard.id}`))
})()