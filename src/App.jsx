import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(6);
  const [isNumberIncluded, setIsNumberIncluded] = useState(false);
  const [isSymbolIncluded, setIsSymbolIncluded] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNumberIncluded) str += "1234567890";
    if (isSymbolIncluded) str += "!@#$%^&*()_+{|";

    for (let i = 0; i < length; i++) {
      let idx = Math.floor(Math.random() * str.length);
      pass += str.charAt(idx);
    }

    setPassword(pass);
  }, [length, isNumberIncluded, isSymbolIncluded]);

  useEffect(() => {
    passwordGenerator();
  }, []);

  const passRef = useRef(null);

  const copyPassword = () => {
    window.navigator.clipboard.writeText(password);
    passRef.current?.select();
    console.log(passRef, passRef.current);
  };

  return (
    <div className="w-full h-screen bg-yellow-50 flex justify-center items-center flex-col ">
      <h1 className="text-3xl text-black font-bold  font-mono">
        Password Generator
      </h1>
      <div className="flex my-4 w-1/3 justify-center">
        <input
          type="text"
          value={password}
          className="w-3/4 px-2 border border-blue-400 font-mono"
          readOnly
          ref={passRef}
        />
        <button
          type="button"
          className="py-2 px-4 bg-blue-400 text-white cursor-pointer font-mono"
          onClick={copyPassword}
        >
          Copy
        </button>
      </div>

      <div className="flex my-4 justify-center">
        <div className="flex items-center px-2 py-2 text-center">
          <input
            type="range"
            value={length}
            min={6}
            max={100}
            className="mr-2"
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="password" className="font-semibold font-mono">
            Password Length {length}
          </label>
        </div>
        <div className="flex items-center  px-2 py-2 text-center">
          <input
            type="checkbox"
            value={isNumberIncluded}
            name="number"
            id="number"
            className="mr-2"
            onChange={() => setIsNumberIncluded((prev) => !prev)}
          />
          <label htmlFor="number" className="font-semibold font-mono">
            Number
          </label>
        </div>

        <div className="flex items-center px-2 py-2 text-center">
          <input
            type="checkbox"
            name="symbol"
            id="symbol"
            value={isSymbolIncluded}
            onChange={() => setIsSymbolIncluded((prev) => !prev)}
            className="mr-2"
          />
          <label htmlFor="symbol" className="font-semibold font-mono">
            Symbol
          </label>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          className="bg-blue-400 font-mono font-bold font-3xl py-4 px-8"
          onClick={passwordGenerator}
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
