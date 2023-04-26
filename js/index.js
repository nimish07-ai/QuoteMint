
async function getAllTokens() {
  const tokenIds = await contractInstance.methods.getAllTokenIds().call();
  console.log(tokenIds);
  const tokens = [];
  for (const tokenId of tokenIds) {
    const tokenData = await contractInstance.methods.getTokenData(tokenId).call();
    tokens.push(tokenData);
  }
  return tokens;
}

getAllTokens().then((tokens) => {
  let cards=document.querySelector("#cards");
  let data=``

  function addDATA(ev)
  {
       data+=`
  
      <div class=" my-4 flex flex-col rounded-md p-4 sm:p-8 shadow-lg font-serif  ">
      <div class="m-2">
          <p class="self-center text-md sm:text-xl ">
          "${ev.quote}"
          </p>
      </div>
      <div class="flex justify-end m-2 ">
          <p class="self-center text-md sm:text-xl">
           - ${ev.ownerName}
          </p>
      </div>
      <div class="flex justify-start">
          <p class="self-center text-sm sm:text-md">
          ${ev.date}
          </p>
      </div>
  </div>
  
  
  
  
      `;
    
  }
  
  for (let i = tokens.length - 1; i >= 0; i--) {
    addDATA(tokens[i])
  }

  cards.innerHTML=data;
  console.log('Tokens:', tokens);
}).catch((error) => { 
  console.error('Error:', error);
});

