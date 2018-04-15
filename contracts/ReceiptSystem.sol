pragma solidity ^0.4.11;

import './Ownable.sol';
import './SafeMath.sol';

contract ReceiptSystem is Ownable {
	using SafeMath for uint256;

	mapping(address => bytes32) public Institutions;
	mapping(bytes32 => bytes32) public receiptHashes;

	function ReceiptSystem() public {
		owner = msg.sender;
	}
}