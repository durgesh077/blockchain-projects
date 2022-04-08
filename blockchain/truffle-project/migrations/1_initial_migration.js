const Migrations = artifacts.require("Vote.sol");
hell="durgesh"
module.exports = function (deployer) {
  deployer.deploy(Migrations,["NOTA","BSP","AAP","CONGRESS"]);
};
