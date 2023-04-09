const mintForm = document.getElementById('mint-form');
  mintForm.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const quote = event.target.quote.value;
    const ownerName = event.target.ownerName.value;
  
    try {
        const gasPrice = await web3.eth.getGasPrice();
        const gasEstimate = await contractInstance.methods.mint(quote, ownerName).estimateGas();
        const balance = await web3.eth.getBalance(web3.eth.defaultAccount);
        const hasEnoughFunds = balance >= gasPrice * gasEstimate;
    
        if (hasEnoughFunds) {
            const receipt = await contractInstance.methods.mint(quote, ownerName).send({ from: web3.eth.defaultAccount });
            console.log('Transaction receipt:', receipt);
        } else {
            console.error('Insufficient funds');
        }
    } catch (error) {
        console.error('Error:', error);
    }
  });
function check()
{

	set_default_account()
	if(web3.eth.defaultAccount == undefined)
	{
		CannotCreate()
	}
	else{
		CanCreate()
	}
}

	function CanCreate()
	{
		document.getElementById("submit_btn").disabled = false;
	}

	function CannotCreate()
	{
		document.getElementById("submit_btn").disabled = true;
	}

	check()