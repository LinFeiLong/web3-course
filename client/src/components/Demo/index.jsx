import * as React from "react";
import useEth from "../../contexts/EthContext/useEth";
import Contract from "./Contract";
import ContractBtns from "./ContractBtns";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function Demo({isOwner, workflowStatusLabel}) {
  const { state } = useEth()

  const demo =
    <>
      <div className="contract-container">
        <Contract workflowStatusLabel={workflowStatusLabel} />
        <ContractBtns isOwner={isOwner} workflowStatusLabel={workflowStatusLabel}/>
      </div>
    </>;

  return (
    <div className="demo">
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
            demo
      }
    </div>
  );
}

export default Demo;
