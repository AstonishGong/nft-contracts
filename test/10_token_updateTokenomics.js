const bre = require('@nomiclabs/buidler')
const { ethers, awaitTx, } = require('./utils/setup')
const privateKey = require('../../privatekey');

async function main() {
  const address = privateKey[bre.network.name];
  const accounts = await ethers.getSigners();
  const _owner = await accounts[0].getAddress();
  console.log('----- owner address: ', _owner);
  console.log('--- chain: ', bre.network.name, address.nftToken);
  let mainContract = await ethers.getContractAt('SnowToken', address.snowToken);

  await (awaitTx(
    mainContract.updateTokenomics(
      [
        getContractNumber('100000000'), // time lock wallet
        getContractNumber('50000000'), // multi sig wallet
        getContractNumber('20000000'), // liquidity owner
        getContractNumber('30000000'), // lp farm contract
        getContractNumber('50000000') // polyientX vault wallet
      ],
      [
        '0x1FF0a45474f1588922aF70DE2ee78036193f289e', // time lock wallet
        '0x1f9754318066b27EaCB747D5EB22777CA0ecC020', // multi sig wallet
        '0x234cD3A5335B590872f7888d8E72DbA72492190b', // liquidity owner
        '0x4e9Bead20B8F9B8a82F8440F16E70200639E71Db', // lp farm contract
        '0x4E039B8DDb5048139e98D2bf70171BFc6d10f312' // polyientX vault wallet
      ]
    )
  ));

  console.log('--- token update tokenomics success ');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
