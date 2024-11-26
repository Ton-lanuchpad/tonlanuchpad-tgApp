import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AirDrop from "./pages/AirDrop"
import Launchpad from "./pages/Launchpad"
import AppBar from "./components/AppBar"
import Leaderboards from "./pages/Leaderboards"
import Friends from "./pages/friends"
import Ton from "./pages/Ton"
import { Toaster } from "react-hot-toast"
import Swap from "./pages/Swap"
import Staking from "./pages/Staking"
import AddLiquidity from "./pages/AddLiquidity"

function App() {
  return (
    <BrowserRouter>
      <div className="flex bg-gradient-to-b from-black to-gray-900 justify-center items-center min-h-screen overflow-auto w-[100%]">
        <Routes>
          <Route path="/" element={<Launchpad />} />
          <Route path="/airdrop" element={<AirDrop />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/ton" element={<Ton />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/staking" element={<Staking />} />
          <Route path="/liquidity" element={<AddLiquidity />} />
        </Routes>
        <AppBar />
        <Toaster />
      </div>
    </BrowserRouter>
  )
}

export default App
