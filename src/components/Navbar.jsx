import logo from "../assets/memelogonav.png"
import { navItems } from "../constants1"
import Signin from "./Signin/Signin"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [showSignin, setShowSignin] = useState(false) // State for displaying Signin component

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen)
  }

  const handlePopup = () => {
    setShowSignin(false)
  }
  return (
    <>
      <div className="sticky top-0 z-50 border-b border-neutral-700/80 py-3 backdrop-blur-lg">
        <div className="container relative mx-auto px-4 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex flex-shrink-0 items-center">
              <Link to="/">
                <img
                  className="mr-2 h-10 w-10"
                  src={logo}
                  alt="MEME_Generate"
                />
              </Link>

              {/* <span className="text-xl tracking-tight">MEME_Generate</span> */}
            </div>
            <ul className="ml-14 hidden space-x-12 lg:flex">
              {/* {navItems.map((item, index) => (
                <li key={index}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))} */}
            </ul>
            <div className="hidden items-center justify-center space-x-12 lg:flex">
              {/* <button
                className="rounded-md border px-3 py-2"
                onClick={() => setShowSignin(!showSignin)}
              >
                Sign In
              </button> */}
              <a
                href="#"
                className="rounded-md bg-gradient-to-r from-[#ce2783] to-[#403bc8] px-3 py-2"
              >
                Wallet Connect
              </a>
            </div>
            <div className="flex-col justify-end md:flex lg:hidden">
              <button onClick={toggleNavbar}>
                {mobileDrawerOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
          {mobileDrawerOpen && (
            <div className="fixed right-0 z-20 flex w-full flex-col items-center justify-center bg-neutral-900 p-12 lg:hidden">
             {/*  <ul>
                {navItems.map((item, index) => (
                  <li key={index} className="py-4">
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
              <br /> */}
              <div className="flex space-x-6">
                {/* <button
                  className="rounded-md border px-3 py-2"
                  onClick={() => setShowSignin(!showSignin)}
                >
                  Sign In
                </button> */}
                <a
                  href="#"
                  className="rounded-md bg-gradient-to-r from-[#D42680] to-[#3D3BC9] px-3 py-2"
                >
                  Wallet Connect
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Signin Modal */}
        {showSignin && (
          <div className="fixed inset-0 z-30 mt-[400px] flex items-center justify-center bg-neutral-900 bg-opacity-50">
            <div className="max-h-[90vh] w-full rounded-lg bg-black bg-opacity-50 p-10 shadow-lg ">
              <Signin closePopup={handlePopup} />
            </div>
          </div>
        )}
      </div>
      <Outlet />
    </>
  )
}

export default Navbar
