// Manipuler Web3.js
const INFURA_API_KEY = "79822ce743c74f67b9f6ea147abf3044"

// 1. Une première utilisation de Web3.js
// const ADDRESS = "0x4b984D560387C22f399B76a38edabFE52903E599"

// const Web3 = require("web3")
// const rpcUrl = `https://goerli.infura.io/v3/` + INFURA_API_KEY
// const web3 = new Web3(rpcUrl)

// web3.eth.getBalance(ADDRESS, (err, wei) => {
//   balance = web3.utils.fromWei(wei, "ether") // convertir la valeur en ether
//   console.log(balance)
// })

// 2. Lecture des données d'un smart contract Web3.js
const Web3 = require("web3")
const rpcUrl = `https://goerli.infura.io/v3/` + INFURA_API_KEY
const web3 = new Web3(rpcUrl)

const ABI = [
  {
    inputs: [],
    name: "get",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
    ],
    name: "set",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
]

const SSaddress = "0x1f9C83F7311c1b0AD188E9925E2705a3B60c4b1d"

const simpleStorage = new web3.eth.Contract(ABI, SSaddress)
simpleStorage.methods.get().call((err, data) => {
  console.log(data)
})
