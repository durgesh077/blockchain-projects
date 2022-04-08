//SPDX-License-Identifier: MIT
/*0x468e147bE60cFa8841521FBF813e10109d5192De*/
pragma solidity ^0.8.6;
contract Vote{
    mapping(string=>bool) public checkVote;
    uint[] public partyVote;
    address private owner;
    uint public endBlock;
    string[]public  parties;
    event guessMe(string name,int rollNo);
    constructor(string[] memory _parties){
        parties=_parties;
        uint numberOfParties=parties.length;
        owner=msg.sender;
        endBlock=block.number+uint(2 days)/13;
        partyVote=new uint[](numberOfParties);
    }
    modifier is_owner() {
        require(msg.sender==owner,"permission denied");
        _;
    }
    function endCastingVote()public  is_owner returns(uint[] memory votes){
        endBlock=block.number;
         return partyVote;
    }
    function castVote(string calldata adhar,uint whom)external{
        require(block.number<endBlock,"voting_ended");
        require(checkVote[adhar]==false,"yo've already voted");
        require(whom<parties.length,"invalid parity no");
        partyVote[whom]++;
        checkVote[adhar]=true;
    }
}
