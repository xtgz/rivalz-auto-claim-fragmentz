require('colors');
const fs = require('fs');
const readlineSync = require('readline-sync');
const { displayHeader, checkBalance, RPC_URL } = require('./src/utils');
const { createWallet, createContract } = require('./src/wallet');
const { claimFragmentz } = require('./src/claim');
const { JsonRpcProvider } = require('ethers');
const moment = require('moment');

const CONTRACT_ADDRESS = '0xeBBa6Ffff611b7530b57Ed07569E9695B98e6c82';

async function main() {
  displayHeader();

  const provider = new JsonRpcProvider(RPC_URL);

  // Ensure that the privateKeys.json file is read correctly
  let seedPhrasesOrKeys;
  try {
    seedPhrasesOrKeys = JSON.parse(fs.readFileSync('privateKeys.json', 'utf-8'));
  } catch (error) {
    console.error('Error reading privateKeys.json file:', error.message.red);
    return;
  }

  if (!Array.isArray(seedPhrasesOrKeys) || seedPhrasesOrKeys.length === 0) {
    throw new Error('privateKeys.json is not set correctly or is empty'.red);
  }

  const numClaims = 40;

  for (const keyOrPhrase of seedPhrasesOrKeys) {
    let wallet;

    try {
      wallet = createWallet(keyOrPhrase, provider);
    } catch (error) {
      console.error(`Error creating wallet for key/phrase ${keyOrPhrase}: ${error.message.red}`);
      continue;
    }

    const senderAddress = wallet.address;
    console.log(`Processing transactions for address: ${senderAddress}`.cyan);

    const contract = createContract(wallet, CONTRACT_ADDRESS);
    try {
      await claimFragmentz(contract, numClaims);
    } catch (error) {
      console.error(`Error claiming fragmentz for address ${senderAddress}: ${error.message.red}`);
    }
  }

  displayHeader();
}

main().catch(error => {
  console.error('An unexpected error occurred:', error.message.red);
});
