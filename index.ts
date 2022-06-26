import DiscordJS, { Channel, Intents, AwaitMessageCollectorOptionsParams, Message } from 'discord.js'
import dotenv from 'dotenv'
import Web3 from 'web3'
dotenv.config()

var web3 = new Web3(new Web3.providers.HttpProvider('https://eth-mainnet.alchemyapi.io/v2/mrDDPpzaAZsjGsCA1kUxBzBD9zZ5j4Q6'));

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () => {
    console.log('The bot is ready')
})

client.on('messageCreate', async (message) => {
    if (message.content.endsWith(".eth")) {
        var ENS = message.content
        var wallet = await web3.eth.ens.getAddress(ENS)
        const walletBalance = await web3.eth.getBalance(wallet)
        const displayWallet = ENS
        if(walletBalance.length === 20) {
            const walletBalanceFinal = walletBalance.slice(0,2)+ "." + walletBalance.slice(3,5) + " ETH"
            message.reply({ 
            content: "Balance of " + displayWallet + ": " + walletBalanceFinal
            })
        }
        if(walletBalance.length === 19) {
            const walletBalanceFinal = walletBalance.charAt(0)+ "." + walletBalance.slice(1,4) + " ETH"
            message.reply({ 
            content: "Balance of " + displayWallet + ": " + walletBalanceFinal
            })
        }
        if(walletBalance.length === 18) {
            const walletBalanceFinal = "0." + walletBalance.slice(0,3) + " ETH"
            message.reply({ 
            content: "Balance of " + displayWallet + ": " + walletBalanceFinal
            })
        }
        if(walletBalance.length === 17) {
            const walletBalanceFinal = "0.0" + walletBalance.slice(0,3) + " ETH"
            message.reply({ 
            content: "Balance of " + displayWallet + ": " + walletBalanceFinal
            })
        }
        if(walletBalance.length === 21) {
            const walletBalanceFinal = walletBalance.slice(0,3)+ "." + walletBalance.slice(4,6) + " ETH"
            message.reply({ 
            content: "Balance of " + displayWallet + ": " + walletBalanceFinal
            })
        }
    }
    if (message.content.startsWith("0x") && message.content.length === 42) {
        var wallet = message.content
        const displayWallet = "0x***" + wallet.slice(38,42)
        const walletBalance = await web3.eth.getBalance(wallet)
        if(walletBalance.length === 20) {
            const walletBalanceFinal = walletBalance.slice(0,2)+ "." + walletBalance.slice(3,5) + " ETH"
            message.reply({ 
            content: "Balance of " + displayWallet + ": " + walletBalanceFinal
            })
        }
        if(walletBalance.length === 19) {
            const walletBalanceFinal = walletBalance.charAt(0)+ "." + walletBalance.slice(1,4) + " ETH"
            message.reply({ 
            content: "Balance of " + displayWallet + ": " + walletBalanceFinal
            })
        }
        if(walletBalance.length === 18) {
            const walletBalanceFinal = "0." + walletBalance.slice(0,3) + " ETH"
            message.reply({ 
            content: "Balance of " + displayWallet + ": " + walletBalanceFinal
            })
        }
        if(walletBalance.length === 17) {
            const walletBalanceFinal = "0.0" + walletBalance.slice(0,3) + " ETH"
            message.reply({ 
            content: "Balance of " + displayWallet + ": " + walletBalanceFinal
            })
        }
        if(walletBalance.length === 21) {
            const walletBalanceFinal = walletBalance.slice(0,3)+ "." + walletBalance.slice(4,6) + " ETH"
            message.reply({ 
            content: "Balance of " + displayWallet + ": " + walletBalanceFinal
            })
        }
    }
})
client.login(process.env.TOKEN)