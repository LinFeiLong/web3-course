import React, { useEffect, useState } from 'react';
import useEth from '../../contexts/EthContext/useEth';

function Contract({ value, text, isOwner }) {
  const { state: { contract } } = useEth();
  const [workflowStatusLabel, setWorkflowStatusLabel] = useState('');

  useEffect(() => {
    (async function () {
      const workflowStatus = await contract.methods.workflowStatus().call()

      console.log({workflowStatus})

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
      setWorkflowStatusLabel(workflowStatus)
    })();
  }, [contract])

  // const [EventValue, setEventValue] = useState("");
  // const [oldEvents, setOldEvents] = useState();

  // useEffect(() => {
  //   (async function () {

  //      let oldEvents= await contract.getPastEvents('valueChanged', {
  //         fromBlock: 0,
  //         toBlock: 'latest'
  //       });
  //       let oldies=[];
  //       oldEvents.forEach(event => {
  //           oldies.push(event.returnValues._val);
  //       });
  //       setOldEvents(oldies);

  //       await contract.events.valueChanged({fromBlock:"earliest"})
  //       .on('data', event => {
  //         let lesevents = event.returnValues._val;
  //         setEventValue(lesevents);
  //       })
  //       .on('changed', changed => console.log(changed))
  //       .on('error', err => console.log(err))
  //       .on('connected', str => console.log(str))
  //   })();
  // }, [contract])

  return (
    <code>
      <span className="secondary-color">
        <strong>{isOwner ? "Admin" : "User"}</strong>
      </span>

      <br />

      <span className="secondary-color">
        <strong>Workflow Status: {workflowStatusLabel}</strong>
      </span>

    </code>
  );
}

export default Contract;
