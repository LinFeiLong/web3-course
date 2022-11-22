import React from 'react';

function Contract({ value, text, isOwner }) {
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

      {`contract SimpleStorage {
  uint256 value = `}

      <span className="secondary-color">
        <strong>{value}</strong>
      </span>


      {`;
  string greet = `}

      <span className="secondary-color">
        <strong>{text}</strong>
      </span>

      {`;

  function read() public view returns (uint256) {
    return value;
  }

  function write(uint256 newValue) public {
    value = newValue;
  }
}
  `}

    </code>
  );
}

export default Contract;
