async function main() {
    const Vote = await ethers.getContractFactory("Vote");
    // Start deployment, returning a promise that resolves to a contract object
    const options = { gasPrice : 1000000000, gasLimit : 1000000 };
    const vote = await Vote.deploy(["Goodluck Jonathan", "Atiku Abubakar", "Peter Obi"], options);
    await vote.deployed();
    console.log("Contract deployed to address:", vote.address);
  };
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    });