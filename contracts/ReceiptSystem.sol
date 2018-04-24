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

	uint256 private lastID = 0;
	mapping(address => uint256) public addrToIDs;
	mapping(uint256 => Institution) public idToInstitution;
	mapping(bytes32 => ReceiptStats) public receiptHashes;

	modifier onlyInstitution() {
		require(addrToIDs[msg.sender] != 0); //Must be issued by registered institution
		_;
	} 

	modifier onlyBank() {
		require(addrToIDs[msg.sender] != 0); //Must be issued by registered institution
		uint256 id = addrToIDs[msg.sender];
		require(idToInstitution[id].insType == InstitutionType.Bank);
		_;
	}

	modifier hashExists(bytes32 hash) {
		require(receiptHashes[hash].issuedBy != 0); //Must be an issued receipt
		_;
	}

	function ReceiptSystem() public {
		owner = msg.sender;
	}

	function registerInstitution(bytes32 name, uint8 insType, address addr) public onlyOwner {
		lastID++;
		idToInstitution[lastID] = Institution(lastID, name, InstitutionType(insType));
		addrToIDs[addr] = lastID;
	}

	function issueReceipt(bytes32 hash) public onlyInstitution {
		require(receiptHashes[hash].issuedBy == 0); //Cannot re-issue
		receiptHashes[hash] = ReceiptStats(hash, addrToIDs[msg.sender], 0, now, true);
	}

	function invalidateReceipt(bytes32 hash) public onlyInstitution {
		uint256 issuer = receiptHashes[hash].issuedBy;
		require(issuer == addrToIDs[msg.sender]); //Must be by issuer
		receiptHashes[hash].valid = false;
	}

	function validateReceipt(bytes32 hash) public onlyInstitution {
		uint256 issuer = receiptHashes[hash].issuedBy;
		require(issuer == addrToIDs[msg.sender]); //Must be by issuer
		receiptHashes[hash].valid = true;
	}

	function claimReceipt(bytes32 hash) public onlyBank hashExists(hash) {
		//require(receiptHashes[hash].issuedBy != 0); //Must be an issued recepit
		require(receiptHashes[hash].inPossessionBy == 0); //Must not be already claimed by another institution
		receiptHashes[hash].inPossessionBy = addrToIDs[msg.sender];
	}

	function declaimReceipt(bytes32 hash) public onlyBank hashExists(hash) {
		//require(receiptHashes[hash].issuedBy != 0); //Must be an issued recepit
		require(receiptHashes[hash].inPossessionBy == addrToIDs[msg.sender]); //Must be claimed by msg.sender
		receiptHashes[hash].inPossessionBy = 0;
	}

	function verifyReceipt(bytes32 hash) public constant 
		returns (bool exists, uint256 issuerID, bytes32 issuerName, uint256 timestamp,
		 bool valid, uint256 inPossessionBy) 
	{
		ReceiptStats storage r = receiptHashes[hash];
		exists = r.issuedBy != 0 ? true : false;
		issuerID = r.issuedBy;
		issuerName = idToInstitution[issuerID].name;
		timestamp = r.timestamp;
		valid = r.valid;
		inPossessionBy = r.inPossessionBy;
	}

	function getInstitution(uint256 id) public constant returns(bytes32 name, uint8 insType) {
		Institution storage i = idToInstitution[id]; 
		name = i.name;
		insType = uint8(i.insType);
	}
}