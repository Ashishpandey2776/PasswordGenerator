import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";

function App(){
   const [length,setlength]=useState(8);
   const [numberAllow,setnumberAllow]=useState(false);
   const [charAllow,setcharAllow]=useState(false);
   const [Password,setPassword]=useState("");

   const passworGenerator= useCallback(()=>{
    let pass=""
     let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
     if(numberAllow) str+="1234567890"
     if(charAllow) str+="!@#$%^&*-_+=[]{}~`"
     
     for(let i=0;i<length;i++){
      let char=Math.floor( Math.random()*str.length +1)
      pass+=str.charAt(char);
     }
     setPassword(pass);
   },[length,numberAllow,charAllow,setPassword])
   
   useEffect(()=>{
    passworGenerator()
   },[length,numberAllow,charAllow,setPassword])

   //userefHooks
   const passRef=useRef(null);

   let copytoclickboard=useCallback(()=>{
    passRef.current?.select()
    window.navigator.clipboard.writeText(Password)
   },[Password])
  return (
  <>
   <div className="w-full max-w-md mx-auto shadow-md
   rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-600">
     <div className="flex shadow rounded-lg overflow-hidden mb-4">
       <input type="text" value={Password}
        className="outline-none w-full py-1 px-3"
        placeholder="Password"
        readOnly
        ref={passRef}
       />
       <button 
       className="outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0"
       onClick={copytoclickboard}
       >copy</button>
     </div>
     <div className="flex text-sm gap-x-2">
     <div className="flex items-center gap-x-1">
      <input type="range"
      min={8}
      max={16}
      value={length}
      className="cursor-pointer"
      onChange={(e)=>{setlength(e.target.value)}}
       />
       <label>Length:{length}</label>
     </div>
       <div className="flex items-center gap-x-1">
        <input type="checkbox" 
        defaultChecked={numberAllow}
        id="nuberinput"
        onChange={()=>{
          setnumberAllow((prev)=>!prev);
        }}
        />
        <label >Number</label>
       </div>
       <div className="flex items-center gap-x-1">
        <input type="checkbox" 
        defaultChecked={charAllow}
        id="charinput"
        onChange={()=>{
          setcharAllow((prev)=>!prev);
        }}
        />
        <label >Charactors</label>
       </div>
     </div>
   </div>
  </>
  )
}
export default App;

