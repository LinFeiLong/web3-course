import { useRef, useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function Contract({ value, text }) {
  const spanEle = useRef(null);
  const spanEle2 = useRef(null);

  const [EventValue, setEventValue] = useState("");
  const [oldEvents, setOldEvents] = useState();
  const { state: { contract } } = useEth();

  useEffect(() => {
    spanEle.current.classList.add("flash");
    const flash = setTimeout(() => {
      spanEle.current.classList.remove("flash");
    }, 300);
    return () => {
      clearTimeout(flash);
    };
  }, [value]);

  useEffect(() => {
    spanEle2.current.classList.add("flash");
    const flash = setTimeout(() => {
      spanEle2.current.classList.remove("flash");
    }, 300);
    return () => {
      clearTimeout(flash);
    };
  }, [text]);

  useEffect(() => {
    (async function () {

       let oldEvents= await contract.getPastEvents('valueChanged', {
          fromBlock: 0,
          toBlock: 'latest'
        });
        let oldies=[];
        oldEvents.forEach(event => {
            oldies.push(event.returnValues._val);
        });
        setOldEvents(oldies);

        await contract.events.valueChanged({fromBlock:"earliest"})
        .on('data', event => {
          let lesevents = event.returnValues._val;
          setEventValue(lesevents);
        })
        .on('changed', changed => console.log(changed))
        .on('error', err => console.log(err))
        .on('connected', str => console.log(str))
    })();
  }, [contract])

  return (
    <code>
      {`contract SimpleStorage {
  uint256 value = `}

      <span className="secondary-color" ref={spanEle}>
        <strong>{value}</strong>
      </span>


      {`;
  string greet = `}

      <span className="secondary-color" ref={spanEle2}>
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
  Events arriving: `} {EventValue} {`

  Old events: `} {oldEvents} {``}

    </code>
  );
}

export default Contract;
