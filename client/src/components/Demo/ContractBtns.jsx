import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractBtns({ setValue, setText, isOwner }) {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = e => {
      setInputValue(e.target.value);
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

  return (
    <div className="btns">

      <div onClick={addVoter} className="input-btn">
        addVoter(<input
          type="text"
          placeholder="address"
          value={inputValue}
          onChange={handleInputChange}
        />)
      </div>

    </div>
  );
}

export default ContractBtns;
