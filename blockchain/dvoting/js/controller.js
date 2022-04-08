const formEvent=document.getElementById('dataEntry').addEventListener('submit',handleVoteCasting)
const button=document.querySelector('button[type="submit"]');
button.disabled=true;
button.style.opacity=0.5;
let candidateNames=[] ;
const ABI=[
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "_parties",
				"type": "string[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "adhar",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "whom",
				"type": "uint256"
			}
		],
		"name": "castVote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "checkVote",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "endBlock",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "endCastingVote",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "votes",
				"type": "uint256[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "parties",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "partyVote",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const contractAddress ='0x468e147bE60cFa8841521FBF813e10109d5192De';
let votingContract;
let web3;
let accountNumber;
	new Promise((resolve,reject)=>{
		try{
			resolve(ethereum)
		}catch {
			reject("not found")
		}
	}).then(data=>{
		return ethereum.request({method:"eth_requestAccounts"})
	})
	.then(accounts=>{
		accountNumber=accounts[0];
		web3 = new Web3(ethereum) 
	}).catch (err=>{
	web3=new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
	//console.log(web3)
	}).then(
	()=>{
		let ethereums={
			"3":"ropsten",
			"4":"rinkyby",
			"1337":"ganache",
		}
		if (web3)
			votingContract = new web3.eth.Contract(ABI, contractAddress);
		(async () => {
			accountNumber=(await web3.eth.getAccounts())[0]
			console.log(ethereums[await web3.eth.getChainId()] || "other")
			let parties = document.getElementById('parties')
			for (let i = 0; i < 120; i++)
				try {
					let partyName = await votingContract.methods.parties(i).call()
					candidateNames.push(partyName)
					let optionElement = document.createElement("option")
					optionElement.value = i
					optionElement.innerHTML = partyName
					parties.append(optionElement)
				} catch (msg) {
					break;
				}
		}
		)()
	}
)
.catch(err=>{
	web3 = null;
	console.log("unable to connect <" + err.message + ">");
});

function handleVoteCasting(e){
	document.body.style.backgroundColor="lightgray";
    e.preventDefault();
    let data=[]
    for (let [name, value] of new FormData(e.target).entries()){
        data.push(value)
    }
	if(votingContract){
		console.log("voting to ",...data);
		votingContract.methods.castVote(data[0],data[1]).send({from:accountNumber}).then(()=>{
			document.body.style.backgroundColor="initial";
		}).catch (()=>{
			document.body.style.backgroundColor="tomato";
			votingContract.methods.checkVote(data[0]).call().then(
				res=>{
					document.body.style.backgroundColor = "initial";
					if(res)
						alert("you've already voted")
					else
						alert("something went wrong")
				}
			)
		});
	}
}

function verifyAdhar(el){
    if(el.value.length!=12){
        button.disabled=true;
    }else 
    button.disabled=false,button.style.opacity=1;
}
