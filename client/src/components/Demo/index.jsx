import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import Cta from "./Cta";
import Contract from "./Contract";
import ContractBtns from "./ContractBtns";
import Desc from "./Desc";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function Demo() {
  const { state } = useEth();
  const { contract, accounts } = state;
  const [value, setValue] = useState("?");
  const [text, setText] = useState("init");
  const [ownerAddress, setOwnerAddress] = useState(null);
  const isOwner = ownerAddress === accounts?.[0];

  /**
  * Automatically save the contract's owner address
  */
  useEffect(() => {
    (async function () {
      const address =  await contract?.methods?.owner().call()
      setOwnerAddress(address)
    })()
  }, [contract])

  const demo =
    <>
      <Cta />
      <div className="contract-container">
        <Contract value={value} text={text} isOwner={isOwner} />
        <ContractBtns setValue={setValue} setText={setText} isOwner={isOwner}/>
      </div>
      <Desc />
    </>;

  return (
    <div className="demo">
      <Title />
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
            demo
      }
    </div>
  );
}

export default Demo;
