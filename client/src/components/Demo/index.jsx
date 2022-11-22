import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Contract from "./Contract";
import ContractBtns from "./ContractBtns";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function Demo() {
  const { state } = useEth()
  const { contract, accounts } = state
  const [value, setValue] = useState("?")
  const [text, setText] = useState("init")
  const [ownerAddress, setOwnerAddress] = useState(null)
  const isOwner = ownerAddress === accounts?.[0]
  const [workflowStatusLabel, setWorkflowStatusLabel] = useState('')

  /**
  * Automatically save the contract's owner address
  */
  useEffect(() => {
    (async function () {
      const address =  await contract?.methods?.owner().call()
      setOwnerAddress(address)
    })()
  }, [contract, state])

  /**
  * Automatically save the workflow status
  */
  useEffect(() => {
    (async function () {
      const workflowStatus = await contract?.methods?.workflowStatus().call()

      switch (workflowStatus) {
        case '0':
          setWorkflowStatusLabel('RegisteringVoters');
          break;
        case '1':
          setWorkflowStatusLabel('ProposalsRegistrationStarted');
          break;
        case '2':
          setWorkflowStatusLabel('ProposalsRegistrationEnded');
          break;
        case '3':
          setWorkflowStatusLabel('VotingSessionStarted');
          break;
        case '4':
          setWorkflowStatusLabel('VotingSessionEnded');
          break;
        case '5':
          setWorkflowStatusLabel('VotesTallied');
          break;
        default:
          break;
      }
    })();
  }, [contract, state])

  const demo =
    <>
      <div className="contract-container">
        <Contract value={value} text={text} isOwner={isOwner} workflowStatusLabel={workflowStatusLabel} />
        <ContractBtns setValue={setValue} setText={setText} isOwner={isOwner} workflowStatusLabel={workflowStatusLabel}/>
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
