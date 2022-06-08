const getVotingCtcABI = (state) => (state.app.votingCtcABI);

const getVotingCtcAddress = (state) => (state.app.votingCtcAddress);

const getId = (state) => (state.app.id);

const getAddress = (state) => (state.app.address);

const getVoter = (state) => (state.app.voter);

const getVoters = (state) => (state.app.voters);

const getCandidates = (state) => (state.app.candidates);

export { getVotingCtcABI, getVotingCtcAddress, getId, getAddress, getVoter, getVoters, getCandidates };