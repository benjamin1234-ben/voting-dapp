import { useState, useEffect } from "react";
import { Navbar, Nav, Button, Card, Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVotingCtcAddress, getVotingCtcABI } from "./Redux/selectors";
import { updateAddress, updateVoters } from "./Redux/slice";
import { providers, Contract } from "ethers";

function App() {
	const [accounts, setAccounts] = useState();
	const [_id, setId] = useState("");
	const [voters, setVoters] = useState();
	const [btn, setBtn] = useState(true);
	const [acc, setAcc] = useState(false);
	const votingCtcAddress = useSelector(getVotingCtcAddress);
	const votingCtcABI = useSelector(getVotingCtcABI);
	const dispatch = useDispatch();

	useEffect(() => {
		getVoters();
	}, [voters]);

	const connectWallet = async(e) => {
		e.preventDefault();
		if(window.ethereum) {
	       	const _acc = await window.ethereum.request({method: "eth_requestAccounts"});
	        setAccounts(_acc);
	        setBtn(false);
	        setAcc(true);
	        dispatch(updateAddress(_acc));
	    };
	};
	// {"from":"0xF12C97e03E3b6E191de1678Ba908591107611141","to":"0xBbB5d566c83D7dA72F682158aEA1Af1bbcfaF04b","data":"0xa77d8a9d000000000000000000000000f12c97e03e3b6e191de1678ba908591107611141"

	const getRightToVote = async(e) => {
		e.preventDefault();
		if(window.ethereum) {
			const provider = await new providers.Web3Provider(window.ethereum);
        	const signer = await provider.getSigner();
        	const contract = await new Contract(votingCtcAddress, votingCtcABI.abi, signer);

        	try {
        		await contract.getRightToVote(_id);
        	} catch (error) {
        		console.log(error);
        	};
		};
	};

	const getVoters = async() => {
		if(window.ethereum) {
			const provider = await new provider.Web3Provider(window.ethereum);
			const contract = await new Contract(votingCtcAddress, votingCtcABI.abi, provider);	

			try {
				const _voters = await contract.voters();
				console.log(_voters);
				setVoters(_voters);
				dispatch(updateVoters(_voters));
			} catch (error) {
				console.log(error);
			};
		};
	};

	return (
		<Container fluid>
			<Navbar bg="dark" variant="dark" className="mb-4">
				<Container>
					<Navbar.Brand>
						<h2>Voting.io</h2>
					</Navbar.Brand>
					<Nav className="ms-10">
						{ btn && 
							<Nav.Link>
								<Button variant="light" size="lg" onClick={connectWallet}>Connect Wallet</Button>
							</Nav.Link>
						}
						{ acc &&
							<Nav.Link>
								<span className="text-light">{`Connected -- ${accounts[0]}`}</span>
							</Nav.Link>
						}
					</Nav>
				</Container>
			</Navbar>
			<Row className="mt-2">
				<Col/>
				<Col xs={6}>
					<Card> 
						<Card.Body>
							<Row>
								<Col>
									<Row>
										<Col/>
											<Col xs={8}>
												<Card.Title>Get your Right to Vote</Card.Title>
												<Card.Subtitle className="mb-2 text-muted">Vote for the next President of Nigeria</Card.Subtitle>
											</Col>
										<Col/>
									</Row>
									<Row className="mt-3">
										<Col/>
											<Col xs={6}>
												<InputGroup className="mb-3">
													<InputGroup.Text>@</InputGroup.Text>
													<FormControl onChange={e => setId(e.target.value)} 
														placeholder="Enter a voting name of your choice for Identification"/>
												</InputGroup>
												<Button variant="dark" onClick={getRightToVote}>Get Voting Right</Button>
											</Col>
										<Col/>
									</Row>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Col>
				<Col/>
			</Row>
		</Container>
	);
};

export default App;