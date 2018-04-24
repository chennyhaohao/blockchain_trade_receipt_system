pragma solidity ^0.4.11;

import './Ownable.sol';
import './SafeMath.sol';

contract ReceiptSystem is Ownable {
	using SafeMath for uint256;

	enum InstitutionType {
		Bank,
		Shipping,
		Warehouse,
		Trader
	}

	struct Institution {
		uint256 id;
		bytes32 name;
		InstitutionType insType;
	}

	struct ReceiptStats {
		bytes32 hash;
		uint256 issuedBy;
		uint256 inPossessionBy;
		uint256 timestamp;
		bool valid;
	}

	uint256 lastID = 0;
	mapping(address => uint256) public addrToIDs;
	mapping(uint256 => Institution) public idToInstitution;
	mapping(bytes32 => ReceiptStats) public receiptHashes;

	function ReceiptSystem() public {
		owner = msg.sender;
	}

	function registerInstitution(bytes32 name, uint8 insType, address addr) onlyOwner {
		lastID++;
		idToInstitution[lastID] = Institution(lastID, name, InstitutionType(insType));
		addrToIDs[addr] = lastID;
	}

	function issueReceipt(bytes32 hash) {
		require(addrToIDs[msg.sender] != 0); //Must be issued by registered institution
		require(receiptHashes[hash].issuedBy == 0); 
		receiptHashes[hash] = ReceiptStats(hash, addrToIDs[msg.sender], 0, now, true);
	}
}