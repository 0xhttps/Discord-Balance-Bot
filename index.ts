import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
import Web3 from 'web3'
import { BigNumber, ethers } from "ethers";
dotenv.config()

//change link to your own API link
var web3 = new Web3(new Web3.providers.HttpProvider('https://eth-mainnet.alchemyapi.io/v2/mrDDPpzaAZsjGsCA1kUxBzBD9zZ5j4Q6'));

//change these keywords to change what the bot looks for
const keyWordENS = ".eth"
const keyWordAddress = "0x"

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

    const getBalance = async () => {
        try {
            if(message.content.endsWith(keyWordENS) && !message.content.includes(" ")){
                var ENS = message.content
                const wallet = await web3.eth.ens.getAddress(ENS)
                const walletBalance = await web3.eth.getBalance(wallet)
                const value = BigNumber.from(walletBalance)
                const displayBal = ethers.utils.formatEther(value)
                const displayBalance = displayBal.slice(0,7)
                return displayBalance
               
            } else if(message.content.startsWith(keyWordAddress) && message.content.length === 42) {
                var wallet = message.content
                const walletBalance = await web3.eth.getBalance(wallet)
                const value = BigNumber.from(walletBalance)
                const displayBal = ethers.utils.formatEther(value)
                const displayBalance = displayBal.slice(0,7)
                return displayBalance
            }
        }  catch (err){
            //console.log(err)
        }
    }

        if(message.content.endsWith(".eth") && !message.content.includes(" ")|| message.content.startsWith("0x") && message.content.length === 42) {
            try {
                const balance = await getBalance()
                if(balance == null) {
                    message.reply({
                    content: "Error. Invalid ENS"
                    })
                } else {
                    if(message.content.startsWith("0x") && message.content.length === 42) {
                        const displayWallet = await returnAddress() 
                        message.reply({
                        content: "Wallet balance of " + displayWallet + ": " + balance + " ETH"
                        })
                    } else {
                        message.reply({
                        content: "Wallet balance of " + message.content + ": " + balance + " ETH"
                        })
                    }
                }
        } catch (err){
            //console.log(err)
        }
        } 
})
client.login(process.env.TOKEN)