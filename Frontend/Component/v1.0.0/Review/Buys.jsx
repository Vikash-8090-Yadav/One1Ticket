import { ethers } from "ethers"
import { useState } from "react"
import lighthouse from '@lighthouse-web3/sdk'

const apiKey = "b3b18111.271ba6addd39409a80ac3fee4d78070c" 

let walletProvider
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  const { ethereum } = window
  walletProvider = new ethers.providers.Web3Provider(ethereum)
}

const Buy = ({ state }) => {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  const buyChai = async (event) => {
    event.preventDefault()
    const { contract } = state

    console.log(name, message, contract)

    const amount = { value: ethers.utils.parseEther("0.001") }

    const data = JSON.stringify({ name, message, amount })

    try {
      const LightHouseresponse = await lighthouse.uploadText(data, apiKey, "Uploaded Image")
      const cid1 = LightHouseresponse.data.Hash

      const transaction = await contract.buyChai(name, message, cid1, amount)
      await transaction.wait()

      console.log("Transaction is done")
      setName("")
      setMessage("")
    } catch (error) {
      console.error("Error during transaction:", error)
    }
  }

  return (
    <div className=" bg-gradient-to-r from-purple-900 via-blue-800 to-indigo-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white bg-opacity-10 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8 w-full">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">Comment</div>
            <h2 className="text-3xl font-extrabold text-white mb-6">Leave Your Review</h2>
            <form onSubmit={buyChai} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Item Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Item name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white bg-opacity-20 text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                  Review Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Enter your Review Message"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white bg-opacity-20 text-white"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={!state.contract}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                >
                  Complete Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Buy