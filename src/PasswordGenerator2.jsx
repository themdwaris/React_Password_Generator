import React, { useCallback, useMemo, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const PasswordGenerator2 = () => {
  const [length, setLength] = useState(8);
  const [isNumber, setIsNumber] = useState(false);
  const [isChar, setIsChar] = useState(false);
  const ref=useRef()

  const generatedPassword = useMemo(() => {
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let password = "";
    const number = "0123456789";
    const specialChar = "!@#$%&^~?";

    if (isChar) alphabet += specialChar;
    if (isNumber) alphabet += number;

    for (let i = 0; i < length; i++) {
      password += alphabet.charAt(Math.random() * (alphabet.length + 1));
    }
   
    return password
  }, [length, isChar, isNumber]);

  const showToast=()=>{
    toast.success("Copied")
  }
  const copyToClipboard= useCallback((e)=>{
      ref.current.select()
      window.navigator.clipboard.writeText(generatedPassword)
      showToast()
  },[generatedPassword])

  
  return (
    <div className="text-center">
      <h1 className="text-3xl py-10">Password Generator</h1>
      <div className="max-w-xl mx-auto">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={generatedPassword}
            readOnly
            ref={ref}
            className="w-full p-3 rounded-md bg-white/20 outline-none text-xl text-white"
          />
          <button className="px-3 py-[11px] rounded-md bg-green-600 text-white text-xl cursor-pointer hover:bg-green-800" onClick={copyToClipboard}>
            Copy
          </button>
        </div>
        <div className="flex items-center gap-3 md:gap-5 mt-5">
          <label htmlFor="">
            Length:
            <input
              type="range"
              value={length}
              min={8}
              max={35}
              step={1}
              className="ml-2"
              onChange={(e) => setLength(e.target.value)}
            />
          </label>
          <label htmlFor="number">
            Number:
            <input type="checkbox" id="number" className="ml-2" onChange={()=>setIsNumber(!isNumber)}/>
          </label>
          <label htmlFor="char">
            Special Char:
            <input type="checkbox" id="char" className="ml-2" onChange={()=>setIsChar(!isChar)}/>
          </label>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default PasswordGenerator2;
