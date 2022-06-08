import { useState, useEffect } from "react";
import { Navbar, Nav, Button, Card, Container, Row, Col, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVotingCtcAddress, getVotingCtcABI, getAddress, getId } from "../Redux/selectors";
import { updateCandidates, updateVoter} from "../Redux/slice";
import { providers, Contract } from "ethers";

function Vote() {
	const [_candidates, setCandidates] = useState();
	const [_voter, setVoter] = useState();
	const votingCtcAddress = useSelector(getVotingCtcAddress);
	const votingCtcABI = useSelector(getVotingCtcABI);
	const address = useSelector(getAddress);
	const id = useSelector(getId);
	const dispatch = useDispatch();

	useEffect(() => {
		getCandidates();
		getVoter()
	}, [_candidates, _voter]);

	const getCandidates = async() => {
		if(window.ethereum) {
			const provider = await new provider.Web3Provider(window.ethereum);
			const contract = await new Contract(votingCtcAddress, votingCtcABI.abi, provider);	

			try {
				const _candidates = await contract._candidates;
				setCandidates(_candidates);
				dispatch(updateCandidates(_candidates));
			} catch (error) {
				console.log(error);
			};
		};
	};

	const getVoter = async() => {
		if(window.ethereum) {
			const provider = await new provider.Web3Provider(window.ethereum);
			const contract = await new Contract(votingCtcAddress, votingCtcABI.abi, provider);	

			try {
				const _voter = await contract.voters(id);
				setVoter(_voter);
				dispatch(updateVoter(_voter));
			} catch (error) {
				console.log(error);
			};
		};
	};

	const vote = async(e) => {
		e.preventDefault();
		if(window.ethereum) {
			const provider = await new provider.Web3Provider(window.ethereum);
        	const signer = await provider.getSigner();
        	const contract = await new Contract(votingCtcAddress, votingCtcABI.abi, signer);

        	try {
        		await contract.vote(e.target.key, id);
        	} catch (error) {
        		console.log(error);
        	};
		};
	};

	return (
		<Container fluid>
			<Navbar bg="dark" variant="dark">
				<Container>
					<Navbar.Brand>
						<h2>Voting.io</h2>
					</Navbar.Brand>
					<Nav className="me-auto">
						<Nav.Link>
							<h2 className="text-light">Connected - {address[0]}</h2>
						</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
			<Row>
				<Col>
					<Card>
						<Card.Body>
							<Card.Title>Click to Vote</Card.Title>
							<ListGroup as="ol" numbered>
								{ _candidates.map((_candidate) => {
										<ListGroup.Item as="li" action key={_candidate} onClick={vote}>
											{_candidate}
										</ListGroup.Item>
									})
								}
							</ListGroup>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Vote;