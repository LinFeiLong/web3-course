import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import refresh from "../../utils/refresh"

function ContractBtns({ setValue, setText, isOwner, workflowStatusLabel }) {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [proposalValue, setProposalValue] = useState("");
  const [voteValue, setVoteValue] = useState("");

  const handleInputChange = e => {
      setInputValue(e.target.value);
  };

  const handleProposalChange = e => {
    setProposalValue(e.target.value);
  };

  const handleVoteChange = e => {
    setVoteValue(e.target.value);
  };

  const addVoter = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const address = inputValue;

    try {
      await contract?.methods?.addVoter(address).send({ from: accounts[0] });
    } catch (e) {
      console.log(e)
    }
    setInputValue("");
  };

  // ::::::::::::: VOTE ::::::::::::: //

  const setVote = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (voteValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const voteId = voteValue;

    try {
      await contract?.methods?.setVote(voteId).send({ from: accounts[0] });
    } catch (e) {
      console.log(e)
    }
  };

  // ::::::::::::: PROPOSAL ::::::::::::: //

  const addProposal = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (proposalValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const proposal = proposalValue;

    try {
      await contract?.methods?.addProposal(proposal).send({ from: accounts[0] });
    } catch (e) {
      console.log(e)
    }
  };

  // ::::::::::::: STATE ::::::::::::: //

  const startProposalsRegistering = async e => {
    try {
      await contract?.methods?.startProposalsRegistering().send({ from: accounts[0] });
      await refresh();
    } catch (e) {
      console.log(e)
    }
  };

  const endProposalsRegistering = async e => {
    try {
      await contract?.methods?.endProposalsRegistering().send({ from: accounts[0] });
      await refresh();
    } catch (e) {
      console.log(e)
    }
  };

  const startVotingSession = async e => {
    try {
      await contract?.methods?.startVotingSession().send({ from: accounts[0] });
      await refresh();
    } catch (e) {
      console.log(e)
    }
  };

  const endVotingSession = async e => {
    try {
      await contract?.methods?.endVotingSession().send({ from: accounts[0] });
      await refresh();
    } catch (e) {
      console.log(e)
    }
  };

  const tallyVotes = async e => {
    try {
      await contract?.methods?.tallyVotes().send({ from: accounts[0] });
      await refresh();
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <div className="btns">

      {isOwner && workflowStatusLabel === "RegisteringVoters" ? <>
          <div onClick={addVoter} className="input-btn">
            addVoter(<input
              type="text"
              placeholder="address"
              value={inputValue}
              onChange={handleInputChange}
            />)
          </div>
          <div onClick={startProposalsRegistering} className="input-btn">
            startProposalsRegistering()
          </div>
        </>: null
      }

      {isOwner && workflowStatusLabel === "ProposalsRegistrationStarted" ? <>
          <div onClick={endProposalsRegistering} className="input-btn">
          endProposalsRegistering()
          </div>
        </>: null
      }
      {workflowStatusLabel === "ProposalsRegistrationStarted" ? <>
          <div onClick={addProposal} className="input-btn">
          addProposal(<input
              type="text"
              placeholder="proposal"
              value={proposalValue}
              onChange={handleProposalChange}
            />)
          </div>
        </>: null

      }

      {isOwner && workflowStatusLabel === "ProposalsRegistrationEnded" ? <>
          <div onClick={startVotingSession} className="input-btn">
          startVotingSession()
          </div>
        </>: null
      }

      {isOwner && workflowStatusLabel === "VotingSessionStarted" ? <>
          <div onClick={endVotingSession} className="input-btn">
          endVotingSession()
          </div>
        </>: null
      }
      {workflowStatusLabel === "VotingSessionStarted" ? <>
          <div onClick={setVote} className="input-btn">
          setVote(<input
              type="text"
              placeholder="uint"
              value={voteValue}
              onChange={handleVoteChange}
            />)
          </div>
        </>: null
      }

      {isOwner && workflowStatusLabel === "VotingSessionEnded" ? <>
          <div onClick={tallyVotes} className="input-btn">
          tallyVotes()
          </div>
        </>: null
      }
      {/* {isOwner && workflowStatusLabel === "VotesTallied" ? <>
          <div onClick={reset} className="input-btn">
          reset()
          </div>
        </>: null
      } */}

    </div>
  );
}

export default ContractBtns;
