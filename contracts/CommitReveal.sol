// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CommitReveal {
    struct Commit {
        bytes32 commit;
        uint64 block;
        bool revealed;
    }

    mapping (address => Commit) public commits;

    uint256 public max;

    event CommitHash(address sender, bytes32 dataHash, uint64 block);

    function commit(bytes32 _hash) external {
        commits[msg.sender].commit = _hash;
        commits[msg.sender].block = uint64(block.number);
        commits[msg.sender].revealed = false;

        emit CommitHash(msg.sender, commits[msg.sender].commit, commits[msg.sender].block);
    }

    function setMax(uint256 _max) external {
        max = _max;
    }

    function getNumber(string memory _data) external view returns(uint256) {
        uint256 random = uint256(keccak256(abi.encodePacked(_data))) % max;

        return random;
    }
}
