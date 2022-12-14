import React, { useEffect, useState } from 'react';
import useEth from '../../contexts/EthContext/useEth';

function Contract({ workflowStatusLabel }) {
  const { state: { contract } } = useEth();

  const [EventValue, setEventValue] = useState("");
  const [oldEvents, setOldEvents] = useState();
  const [winningProposalID, setWinningProposalID] = useState(-1);


  useEffect(() => {
    (async function () {
       let oldEvents= await contract.getPastEvents('VoterRegistered', {
          fromBlock: 0,
          toBlock: 'latest'
       });

        let oldies=[];
        oldEvents.forEach(event => {
            oldies.push(event.returnValues.voterAddress);
        });
        setOldEvents(oldies);

        await contract.events.VoterRegistered({fromBlock:"earliest"})
          .on('data', event => {
          let lesevents = event.returnValues.voterAddress;
          setEventValue(lesevents);
        })
        .on('changed', changed => console.log(changed))
        .on('error', err => console.log(err))
        .on('connected', str => console.log(str))
    })();
  }, [contract])

  useEffect(() => {
    (async function () {
      const wPI = await contract?.methods?.winningProposalID().call();
      setWinningProposalID(wPI);
    })()
  }, [contract]);

  return (
    <>
      <span className="secondary-color">
        <strong>Voter Registered: {EventValue}</strong>
      </span>

      <br />

      <span className="secondary-color">
        <strong>Old: {oldEvents}</strong>
      </span>

      {workflowStatusLabel === "VotesTallied" &&
        winningProposalID !== -1 ? (<>
        <br />

        <span className="secondary-color">
          <strong>Winner: {winningProposalID}</strong>
        </span></>): null
      }


    </>
  );
}

export default Contract;
