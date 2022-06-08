import { useState, useEffect } from "react";
import { Navbar, Nav, Button, Card, Container, Row, Col, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVotingCtcAddress, getVotingCtcABI, getAddress, getId, getCandidates, getVoter, getVoters } from "../Redux/selectors";
import { providers, Contract } from "ethers";

function Poll() {
	const votingCtcAddress = useSelector(getVotingCtcAddress);
	const votingCtcABI = useSelector(getVotingCtcABI);
	const address = useSelector(getAddress);
	const id = useSelector(getId);
	const candidates = useSelector(getCandidates);
	const voter = useSelector(getVoter);
	const voters = useSelector(getVoters);
	const dispatch = useDispatch();

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
							<ListGroup as="ol">
								{ candidates.map(() => {
										<ListGroup.Item as="li">

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

export default Poll;