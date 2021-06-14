async function impersonateAccount(account) {
    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [account]
    });
}

async function stopImpersonatingAccount(account) {
    await hre.network.provider.request({
        method: "hardhat_stopImpersonatingAccount",
        params: [account]
    });
}

async function enableForking(rpcUrl, blocknumber) {
    await hre.network.provider.request({
        method: "hardhat_reset",
        params: [{
            forking: {
                jsonRpcUrl: rpcUrl,
                blockNumber: blocknumber
            }
        }]
    });
}

async function disableForking() {
    await hre.network.provider.request({
        method: "hardhat_reset"
    });
}

async function increaseTime(time) {
    await hre.network.provider.request({
        method: "evm_increaseTime",
        params: [time]
    });
}

async function setNextBlockTimestamp(time) {
    await hre.network.provider.request({
        method: "evm_setNextBlockTimestamp",
        params: [time]
    });
}

async function mineBlock() {
    await hre.network.provider.request({
        method: "evm_mine",
    });
}

async function snapshot() {
    const snapshotId = await hre.network.provider.request({
        method: "evm_snapshot",
    });
    return snapshotId;
}

async function revertSnapshot(snapshotId) {
    await hre.network.provider.request({
        method: "evm_revert",
        params: [snapshotId]
    });
}

async function deployContract(contractName, constructorArgs = []) {
    let contract;
    let factory = await hre.ethers.getContractFactory(contractName);
    if (constructorArgs == []) {
        contract = await factory.deploy();
    } else {
        contract = await factory.deploy(...constructorArgs);
    }
    await contract.deployed();

    console.log(`Deployed ${contractName} at ${contract.address}`);
    return contract;
}

module.exports = {
    impersonateAccount,
    stopImpersonatingAccount,
    enableForking,
    disableForking,
    increaseTime,
    setNextBlockTimestamp,
    mineBlock,
    snapshot,
    revertSnapshot,
    deployContract,
}
