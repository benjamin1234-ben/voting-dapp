async function main() {
    const Greetings = await ethers.getContractFactory("Greetings");
    // Start deployment, returning a promise that resolves to a contract object
    const greetings = await Greetings.deploy();
    await greetings.deployed();
    console.log("Contract deployed to address:", greetings.address);
  };
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    });