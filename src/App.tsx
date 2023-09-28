import { useState } from "react";
import { Scanner } from "./Scanner";
import GS1DigitalLinkToolkit from "./GS1DigitalLinkToolkit.js";

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

const CodeLink = (props: { code: string }) => {
  if (!props.code) {
    return <></>;
  } else {
    const gs1DigitalLinkURI = interpretScan(props.code);
    return (
      <div>
        <a
          href={`${gs1DigitalLinkURI}`}
          target="_blank"
          rel="noreferrer"
        >{`${gs1DigitalLinkURI}`}</a>
      </div>
    );
  }
};

const interpretScan = (scan: string): string => {
  const host = "https://id.gs1.org";
  const gtinRE = /^(\d{8})$|^(\d{12,14})$/;

  let code: string = "";
  const expression = scan.match(gtinRE);
  if (expression) {
    code = "(01)" + scan;
  } else {
    return "";
  }

  try {
    const gs1dlt = new GS1DigitalLinkToolkit();
    return gs1dlt.gs1ElementStringsToGS1DigitalLink(code, false, host);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return "";
    }
  }
};

export default App;
