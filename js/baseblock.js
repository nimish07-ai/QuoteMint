window.abi=[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_quote",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ownerName",
				"type": "string"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllTokenIds",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getTokenData",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "quote",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ownerName",
						"type": "string"
					}
				],
				"internalType": "struct MyNFT.TokenData",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

window.contractAddress='0x7d2b67C63653cA15537ed9DD15Bc98497ea28CE6';
window.web3 = new Web3(window.ethereum);

web3.eth.getCode(contractAddress, function(error, result) {
    if (error) {
      console.error(error);
    } else {
      if (result === '0x') {
        console.log(`Contract not found at address ${contractAddress}`);
      } else {
        console.log(`Contract found at address ${contractAddress}`);
      }
    }
  });

  async function set_default_account() {
    try {
      const accounts = await web3.eth.getAccounts();
      web3.eth.defaultAccount = accounts[0];
      console.log('Default account set to', accounts[0]);
    } catch (error) {
      console.error('Error setting default account:', error);
    }
  }
  

set_default_account()
  window.contractInstance = new web3.eth.Contract(abi, contractAddress);
