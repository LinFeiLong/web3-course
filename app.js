const INFURA_API_KEY = "79822ce743c74f67b9f6ea147abf3044"
const ADDRESS = "0x4b984D560387C22f399B76a38edabFE52903E599"

const Web3 = require("web3")
const rpcUrl = `https://goerli.infura.io/v3/` + INFURA_API_KEY
const web3 = new Web3(rpcUrl)

web3.eth.getBalance(ADDRESS, (err, wei) => {
  balance = web3.utils.fromWei(wei, "ether") // convertir la valeur en ether
  console.log(balance)
})
