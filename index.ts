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

    const returnAddress = async () => {
        var wallet = message.content
        const displayWallet = "0x***" + wallet.slice(38,42)
        return displayWallet
    }

    const getBalanceENS = async () => {
        try {
            var ENS = message.content
            const wallet = await web3.eth.ens.getAddress(ENS)
            const walletBalance = await web3.eth.getBalance(wallet)
            if(walletBalance.length === 20) {
                const walletBalanceFinal = walletBalance.slice(0,2)+ "." + walletBalance.slice(3,5) + " ETH"
                return walletBalanceFinal
            } 
            if(walletBalance.length === 19) {
                const walletBalanceFinal = walletBalance.charAt(0)+ "." + walletBalance.slice(1,4) + " ETH"
                return walletBalanceFinal
            }
            if(walletBalance.length === 18) {
                const walletBalanceFinal = "0." + walletBalance.slice(0,3) + " ETH"
                return walletBalanceFinal
            }
            if(walletBalance.length === 17) {
                const walletBalanceFinal = "0.0" + walletBalance.slice(0,3) + " ETH"
                return walletBalanceFinal
            }
            if(walletBalance.length === 21) {
                const walletBalanceFinal = walletBalance.slice(0,3)+ "." + walletBalance.slice(4,6) + " ETH"
                return walletBalanceFinal
            }
        }  catch (err){
            console.log(err)
        }
    }

    const getBalance0x = async () => {
        try {
            var wallet = message.content
            const walletBalance = await web3.eth.getBalance(wallet)
            if(walletBalance.length === 20) {
                const walletBalanceFinal = walletBalance.slice(0,2)+ "." + walletBalance.slice(3,5) + " ETH"
                return walletBalanceFinal
            } 
            if(walletBalance.length === 19) {
                const walletBalanceFinal = walletBalance.charAt(0)+ "." + walletBalance.slice(1,4) + " ETH"
                return walletBalanceFinal
            }
            if(walletBalance.length === 18) {
                const walletBalanceFinal = "0." + walletBalance.slice(0,3) + " ETH"
                return walletBalanceFinal
            }
            if(walletBalance.length === 17) {
                const walletBalanceFinal = "0.0" + walletBalance.slice(0,3) + " ETH"
                return walletBalanceFinal
            }
            if(walletBalance.length === 21) {
                const walletBalanceFinal = walletBalance.slice(0,3)+ "." + walletBalance.slice(4,6) + " ETH"
                return walletBalanceFinal
            }
        }  catch (err){
            console.log(err)
        }
    }

    try {
        if(message.content.endsWith(".eth")) {
            const balance = await getBalanceENS()
            message.reply({
                content: "Wallet balance of " + message.content + ": " + balance
            })
        } else if(message.content.startsWith("0x") && message.content.length === 42) {
            const balance = await getBalance0x()
            const displayWallet = await returnAddress()
            message.reply({
                content: "Wallet balance of " + displayWallet + ": " + balance
            })
        }
    } catch (err) {
        message.reply({
            content: "Please enter a valid address"
        })
    }
})
client.login(process.env.TOKEN)