// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract Vote {
	struct Candidate {
		string name;
		uint voteCount;
	}

	struct Voter {
		string vote;
		bool voted;
		uint weight;
		address _voter;
	}

	Candidate[] public _candidates;

	Voter[] public _voters;

	mapping(string => Voter) public voters;

	mapping(string => Candidate) public candidates;

	constructor(string[] memory candidateNames) {
		for(uint i = 0; i < candidateNames.length; i++) {
			candidates[candidateNames[i]] = Candidate({ name: candidateNames[i], voteCount: 0 });
			_candidates[i] = Candidate({ name: candidateNames[i], voteCount: 0 });
		}
	}

	function getRightToVote(string memory voter) public {
		require(!voters[voter].voted, "The Voter has already voted.");
		require(voters[voter].weight == 0);

		voters[voter].weight = 1;
		voters[voter]._voter = msg.sender;
		_voters.push(Voter({ vote: "", voted: false, weight: 1, _voter: msg.sender }));
	}

	function vote(string memory candidate, string memory voter) public {
		Voter storage sender = voters[voter];

		require(sender._voter == msg.sender, "You are not the voter with this account.");
		require(sender.weight != 0, "You have no right to vote.");
		require(!sender.voted, "You already voted.");

		sender.voted = true;
		sender.vote = candidates[candidate].name;

		candidates[candidate].voteCount += sender.weight;
	}
}