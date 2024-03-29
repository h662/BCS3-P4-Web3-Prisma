import { web3 } from "@/app/lib/client";
import { User } from "@prisma/client";
import { FC } from "react";
import MINT_NFT_ABI from "@/app/lib/MINT_NFT_ABI.json";

export interface ContractCardProps {
  address: string;
  user: User;
  account: string;
}

const ContractCard: FC<ContractCardProps> = ({ address, user, account }) => {
  const onClickMint = async () => {
    try {
      const contract = new web3.eth.Contract(MINT_NFT_ABI, address);

      const response = await contract.methods.mintNft().send({ from: account });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li className="border-2 border-black my-2 p-2 rounded-md w-fit bg-white shadow-xl">
      <div>유저 이메일 : {user.email}</div>
      <div>컨트랙트 주소 : {address}</div>
      <div className="flex justify-end mt-2">
        <button
          className="bg-green-600 text-white rounded-md px-2 py-1"
          onClick={onClickMint}
        >
          민팅
        </button>
      </div>
    </li>
  );
};

export default ContractCard;
