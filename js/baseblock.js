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
			},
			{
				"internalType": "string",
				"name": "_date",
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
					},
					{
						"internalType": "string",
						"name": "date",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					}
				],
				"internalType": "struct MyNFT.TokenData",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
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
			},
			{
				"internalType": "string",
				"name": "_date",
				"type": "string"
			}
		],
		"name": "tokenDataExists",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
window.contractAddress='0x7E5D084d132976FA9E0E761a56572a2A87d6F01D';
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

	window.account_undefined=false;
	window.Lock=false;
	
  async function set_default_account() {
    try {
      const accounts = await web3.eth.getAccounts();
      web3.eth.defaultAccount = accounts[0];
			console.log('Default account set to', accounts[0]);
			if(accounts[0] === undefined)
			{
				account_undefined=true
			}
			else{
				web3.currentProvider.sendAsync({
					method: "eth_accounts"
				}, (err, result) => {
					if (result && result.result && result.result.length > 0) {
						// Metamask account is unlocked
						console.log("Metamask account is unlocked:", result.result[0]);
					} else {
						// Metamask account is locked
						Lock=true
						console.log("Metamask account is locked");
					}
				});
	
			}




    } catch (error) {
      console.error('Error setting default account:', error);
    }
  }
  


window.contractInstance = new web3.eth.Contract(abi, contractAddress);
