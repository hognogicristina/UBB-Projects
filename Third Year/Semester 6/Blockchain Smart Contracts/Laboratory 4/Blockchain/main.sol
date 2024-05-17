// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    mapping(address => bool) public voters;
    mapping(bytes32 => uint256) public votesReceived;
    bytes32[] public candidateList;

    address public owner;

    constructor(bytes32[] memory candidateNames) {
        owner = msg.sender;
        candidateList = candidateNames;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    function registerVoter(address voter) public onlyOwner {
        require(!voters[voter], "Voter is already registered.");
        voters[voter] = true;
    }

    function vote(bytes32 candidate) public {
        require(voters[msg.sender], "Only registered voter can vote.");
        require(validCandidate(candidate), "No such candidate.");
        votesReceived[candidate] += 1;
        voters[msg.sender] = false;
    }

    function totalVotesFor(bytes32 candidate) view public returns (uint256) {
        require(validCandidate(candidate), "No such candidate.");
        return votesReceived[candidate];
    }

    function validCandidate(bytes32 candidate) view private returns (bool) {
        for (uint i = 0; i < candidateList.length; i++) {
            if (candidateList[i] == candidate) {
                return true;
            }
        }
        return false;
    }
}