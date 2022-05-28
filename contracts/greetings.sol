// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract Greetings {
    string public greeting;

    constructor() {
        greeting = "Hello World from Polygon Hackathon with Solidity";
    }

    function seeGreeting() public view returns (string memory) {
        return greeting;
    }

    function updateGreeting(string memory _greeting) public payable {
        greeting = _greeting;
    }
}