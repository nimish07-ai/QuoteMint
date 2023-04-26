 


 async function myFunction() {
    await set_default_account();
 
    const render_TEXT =  document.getElementsByClassName('render_TEXT')[0];
    
    if(account_undefined)
    {
        render_TEXT.innerHTML =`
        <div class=" m-2 flex justify-center">
        <p class="self-center text-md  md:text-2xl font-semibold">Login with Your metamask Account</p>
    </div>
    <div class="flex justify-center items-center">
        <img src="./images/MetaMask_Fox.svg.png" class="h-16 md:h-32">
    </div>
    <div class="flex justify-center items-center">
        <button id="connect-metamask"
            class="bg-white hover:border-green-300 border-black border-2 hover:bg-green-700 text-black hover:text-white font-bold py-2 px-4 rounded-2xl">
            Connect with Metamask
        </button>
    
    </div>
        `

        if (window.ethereum) {
            // enable the button
            const connectButton = document.getElementById('connect-metamask');
            connectButton.disabled = false;
            // handle the button click event
            connectButton.addEventListener('click', async () => {
                try {
                    // request access to the user's accounts
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    // log the user's accounts to the console
                    console.log(accounts);
                    myFunction()
                    // add your code to handle the successful connection here
                } catch (error) {
                    console.error(error);
                }
            });
        } else {
            console.error('Metamask not found');
        }    
      
    
    }
    else if(Lock)
    {

        render_TEXT.innerHTML =`
        <div class=" m-2 flex justify-center">
        <p class="self-center text-md  md:text-2xl font-semibold">ACCOUNT LOCKED PLEASE UNLOCK Account</p>
    </div>
    <div class="flex justify-center items-center">
        <img src="./images/MetaMask_Fox.svg.png" class="h-16 md:h-32">
    </div>
 
        `


    }
    else{

        render_TEXT.innerHTML =`
        <div class="m-4">
                        <form class="bg-white shadow-md border-2 border-gray-600 rounded px-8 pt-6 pb-8 mb-4"  id="mint-form">
                            <div class="mb-4">
                                <label for="Name" class="block mb-2 text-sm font-medium text-gray-900 ">Your
                                    Name</label>
                                <input type="name"  id="quote"
                                    class="bg-gray-50 border H12 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 "
                                    placeholder="Name" required>
                            </div>
                            <div class="mb-4">
                                <label for="message" class="block mb-2 text-sm font-medium text-gray-900 ">Your
                                    message</label>
                                <textarea  rows="4"
                                id="ownerName"
                                    class="block p-2.5 w-full H11 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500 "
                                    placeholder="Leave a Quote..."></textarea>
            
                            </div>
                            <div class="flex items-center justify-center">
                                <input 
                                    class="bg-gray-900 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                                    value="Mint NFT"
                                    type="submit" />
                                
                            </div>
                        </form>
                    </div>
        
        `
        window.gasPrice=0.0
        async function Calculate_GAS_PRICE()
        {
        
            const gasPrice = await web3.eth.getGasPrice();
            const gasEstimate = await contractInstance.methods.mint(quote, date).estimateGas();
            const balance = await web3.eth.getBalance(web3.eth.defaultAccount);
            window.gasPrice=gasPrice;
            return balance >= gasPrice * gasEstimate;
        
        }
        
        
        const mintForm = document.getElementById('mint-form');
        mintForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const quote =  document.getElementsByClassName('H11')[0].value;
            const ownerName = document.getElementsByClassName('H12')[0].value;
            const date = new Date().toDateString();
          
            try {
     
                // const exists = await contractInstance.methods.tokenDataExists(quote, ownerName).call();
                // if (exists) {
                //   console.error('Token data already exists!');
                //   return;
                // }
                
                // Estimate gas cost for minting the token

                const hasEnoughFunds =Calculate_GAS_PRICE();
            
                if (hasEnoughFunds) {
                    // Mint the new token
                    const receipt = await contractInstance.methods.mint(quote, ownerName,date).send({ from: web3.eth.defaultAccount });
                    console.log('Transaction receipt:', receipt);
                    if (receipt.status === true) {
                        window.alert('Transaction successful!');
                    } else {
                        window.alert('Transaction failed.');
                    }
                } else {
                    console.error('Insufficient funds');
                }
            } catch (error) {
                console.error('Error:', error);
                window.alert('Transaction failed.');
            }
        });
        


    }
    

}



myFunction()