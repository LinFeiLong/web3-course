import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractBtns({ isOwner, workflowStatusLabel }) {
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

    </div>
  );
}

export default ContractBtns;
