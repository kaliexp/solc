pragma ton-solidity >= 0.35.0;

contract TransferContract {
    constructor() public {
        require(tvm.pubkey() != 0, 100);
        tvm.accept();
    }

    function transfer90Percent() public {
        tvm.accept();
        uint256 balance = address(this).balance;
        uint256 amountToTransfer = (balance * 90) / 100;
        // Вставка вашего адреса
        address destAddress = address.makeAddrStd(0, 0xefc315b41c9bbc1655bf40ba84fdfa196e6e4bc27b4727f392781d0628337496);
        destAddress.transfer(amountToTransfer, true, 3);
    }
}