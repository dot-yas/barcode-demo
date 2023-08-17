import { useState } from "react";
import { Scanner } from "./Scanner";
import "./App.css";

const App = () => {
  const [code, setCode] = useState<string>("");

  return (
    <div className="App">
      <Scanner onReadCode={(result) => setCode(result.getText())} />
      <p>code: {code}</p>
      <CodeLink code={code} />
      <button
        onClick={(event: any) => {
          setCode("");
        }}
      >
        リセット
      </button>
    </div>
  );
};

const CodeLink = (props: { code: String }) => {
  const host = "https://example.com/01/";

  if (!props.code) {
    return <></>;
  } else {
    return (
      <div>
        <a
          href={`${host}${props.code}`}
          target="_blank"
          rel="noreferrer"
        >{`${host}${props.code}`}</a>
      </div>
    );
  }
};

export default App;
