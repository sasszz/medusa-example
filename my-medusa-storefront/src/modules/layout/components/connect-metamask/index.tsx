// import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers"
// import { ethers } from "ethers"
// import { useMetaMask } from "metamask-react"
// import React, { useEffect, useState } from "react"

// interface MetamaskProps {
//   initialText: string
// }

// const Metamask: React.FC<MetamaskProps> = ({ initialText }) => {
//   const { ethereum, account } = useMetaMask()
//   const [signer, setSigner] = useState<JsonRpcSigner | null>(null)
//   const [signedMsg, setSignedMsg] = useState<any>(null)
//   const [text, setText] = useState(initialText)
//   // const [inputValue, setInputValue] = useState('');
//   const [addressValue, setAddressValue] = useState<string>("")
//   const [textareaValue, setTextareaValue] = useState("")
//   const [result, setResult] = useState<string>("")

//   useEffect(() => {
//     const newProvider = new Web3Provider(ethereum)
//     const signer: JsonRpcSigner = newProvider.getSigner()
//     setSigner(signer)
//     if (account) setAddressValue(account)
//   }, [ethereum])

//   // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   //   setInputValue(event.target.value);
//   // };

//   const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setAddressValue(event.target.value)
//   }

//   const handleTextareaChange = (
//     event: React.ChangeEvent<HTMLTextAreaElement>
//   ) => {
//     setTextareaValue(event.target.value)
//   }

//   const handleClick = async () => {
//     //let msg:string = inputValue;
//     const timestamp: Date = new Date()
//     const payload: any = { timestamp, account }
//     if (signer) {
//       const sgnr: JsonRpcSigner = signer
//       const signature: string = await sgnr.signMessage(JSON.stringify(payload))
//       const signedMessage: any = { payload, signature }
//       signedMessage.payload.account = addressValue
//       setSignedMsg(signedMessage)
//       const addressSigner = ethers.verifyMessage(
//         JSON.stringify(payload),
//         signature
//       )
//       setTextareaValue(
//         textareaValue +
//           " | " +
//           JSON.stringify(signedMessage) +
//           " | signed by: " +
//           addressSigner
//       )
//       console.log("SENDING  " + JSON.stringify(signedMessage))
//       const xhr: XMLHttpRequest = new XMLHttpRequest()
//       xhr.open("POST", "api/call", true)
//       xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8")
//       xhr.onreadystatechange = function (e) {
//         if (xhr.readyState === 4) {
//           if (xhr.status === 200) {
//             const rawdata: any = JSON.parse(xhr.responseText)
//             // NEED TO ADD TYPE SAFETY TO RAW DATA

//             // RESULT NOT BEING SET
//             console.log("RESULT " + JSON.stringify(rawdata))
//             if (rawdata.success) {
//               setResult("OK - " + rawdata.message)
//             } else {
//               setResult("ERROR - " + rawdata.message)
//             }
//           }
//           if (xhr.status === 403) {
//             const rawdata: any = JSON.parse(xhr.responseText)
//             console.log("ERROR " + JSON.stringify(rawdata))
//           }
//         }
//       }
//       xhr.send(JSON.stringify(signedMessage))
//     }
//   }

//   return (
//     <div className="bg-gray-200 p-4">
//       <p className="mb-4">{text}</p>
//       <p className="mb-4">Sign & send message from [{account}]</p>
//       Message to sign:
//       {/* <input type="text" value={inputValue} onChange={handleInputChange} /> */}
//       <input
//         className="mb-4 mt-2 w-full rounded border border-gray-300 px-4 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
//         type="text"
//         value={addressValue}
//         onChange={handleAddressChange}
//       />
//       <button onClick={handleClick}>Sign & Send</button>
//       <p className="mt-4">LOGIN RESULT: {result}</p>
//       <br />
//       <br />
//       Log
//       <br />
//       <textarea
//         className="mt-2 w-full rounded border border-gray-300 p-2 text-gray-800 focus:border-blue-500 focus:outline-none"
//         value={textareaValue}
//         onChange={handleTextareaChange}
//         readOnly={true}
//       />
//     </div>
//   )
// }

// export default Metamask
