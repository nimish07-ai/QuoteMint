
  async function getAllTokens() {
    const tokenIds = await contractInstance.methods.getAllTokenIds().call();
    const tokens = [];
    for (const tokenId of tokenIds) {
      const tokenData = await contractInstance.methods.getTokenData(tokenId).call();
      tokens.push(tokenData);
    }
    return tokens;
  }

  getAllTokens().then((tokens) => {
    console.log('Tokens:', tokens);
  }).catch((error) => {
    console.error('Error:', error);
  });

