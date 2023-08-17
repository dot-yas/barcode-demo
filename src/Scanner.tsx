import { BrowserMultiFormatReader } from "@zxing/browser";
import { Result } from "@zxing/library";
import { useMemo, useRef } from "react";
import { useDebounce } from "react-use";
import "./Scanner.css";

type ScannerProps = {
  onReadCode?: (text: Result) => void;
};

export const Scanner = ({ onReadCode }: ScannerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const codeReader = useMemo(() => new BrowserMultiFormatReader(), []);

  useDebounce(async () => {
    if (!videoRef.current) {
      return;
    }

    await codeReader.decodeFromVideoDevice(
      undefined,
      videoRef.current ?? undefined,
      (result, error) => {
        if (!result) return;
        if (error) {
          console.log("ERROR: ", error);
          return;
        }
        onReadCode?.(result);
      }
    );
  }, 1000);

  return <video className="Scanner" ref={videoRef} />;
};
