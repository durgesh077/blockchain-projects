//SPDX-License-Identifier:MIT
pragma solidity ^0.8.13;
library utilities{
    function add(uint a,uint b)pure public returns(uint sum){
        require(a+b>a);
        return a+b;
    }
}
contract ownable{
    address payable owner;
    constructor(){
        owner=payable(msg.sender);
    }
    modifier isOwner(){
        require(msg.sender==owner,"Permission denied");
        _;
    }
}
contract DurgeshCoin is ownable{
    mapping(address=>mapping(uint=> uint)) public balances;
    using utilities for uint;
    string baseURI;
    string[] public tokens;
    uint[] public price;
    constructor(uint ICO,string memory _baseURI,string[] memory _tokens,uint[] memory _price)ownable(){
        baseURI=_baseURI;
        for(uint i=0;i<_tokens.length;i++){
            balances[msg.sender][i]=ICO;
        }
        tokens=_tokens;
        price=_price;
    }

    function transfer(address to,uint Index) public payable{
        require(Index<price.length && msg.value>=price[Index] && balances[msg.sender][Index]>0);
        payable(msg.sender).transfer(msg.value-price[Index]);
        balances[msg.sender][Index]--;
        balances[to][Index]++;
    }
    function withdraw()public isOwner{
        owner.transfer(address(this).balance);
    }
}