"use client"

import { useMetaMask } from "metamask-react"
import { useMobileMenu } from "@lib/context/mobile-menu-context"
import Hamburger from "@modules/common/components/hamburger"
import CartDropdown from "@modules/layout/components/cart-dropdown"
import DropdownMenu from "@modules/layout/components/dropdown-menu"
import MobileMenu from "@modules/mobile-menu/templates"
import DesktopSearchModal from "@modules/search/templates/desktop-search-modal"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const Nav = () => {
  const { status, connect, account, chainId, ethereum } = useMetaMask()
  const pathname = usePathname()
  const [isHome, setIsHome] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const handleConnect = async () => {
    try {
      // Connect to Metamask
      await connect()

      // Access the user's wallet address after connecting
      if (ethereum && ethereum.selectedAddress) {
        setWalletAddress(ethereum.selectedAddress)
        console.log("User's Wallet Address:", walletAddress)
      }
    } catch (error) {
      console.error("Error connecting to Metamask:", error)
    }
  }

  //useEffect that detects if window is scrolled > 5px on the Y axis
  useEffect(() => {
    if (isHome) {
      const detectScrollY = () => {
        if (window.scrollY > 5) {
          setIsScrolled(true)
        } else {
          setIsScrolled(false)
        }
      }

      window.addEventListener("scroll", detectScrollY)

      return () => {
        window.removeEventListener("scroll", detectScrollY)
      }
    }
  }, [isHome])

  useEffect(() => {
    pathname === "/" ? setIsHome(true) : setIsHome(false)
  }, [pathname])

  const { toggle } = useMobileMenu()

  return (
    <div
      className={clsx("sticky top-0 inset-x-0 z-50 group", {
        "!fixed": isHome,
      })}
    >
      <header
        className={clsx(
          "relative h-16 px-8 mx-auto transition-colors bg-transparent border-b border-transparent duration-200 group-hover:bg-white group-hover:border-gray-200",
          {
            "!bg-white !border-gray-200": !isHome || isScrolled,
          }
        )}
      >
        <nav
          className={clsx(
            "text-gray-900 flex items-center justify-between w-full h-full text-small-regular transition-colors duration-200",
            {
              "text-white group-hover:text-gray-900": isHome && !isScrolled,
            }
          )}
        >
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="block small:hidden">
              <Hamburger setOpen={toggle} />
            </div>
            <div className="hidden small:block h-full">
              <DropdownMenu />
            </div>
          </div>

          <div className="flex items-center h-full">
            <Link href="/" className="text-xl-semi uppercase">
              NFT Minter
            </Link>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            {status === "notConnected" ? (
              <div className="flex items-center gap-x-2 bg-blue-300 rounded-full p-1 px-4">
                <span className="h-2 w-2 bg-red-500 rounded-full"></span>
                <button className="" onClick={handleConnect}>
                  Connect Metamask
                </button>
              </div>
            ) : (
              walletAddress && (
                <div className="flex items-center gap-x-2 bg-blue-300 rounded-full p-1 px-4">
                  <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                  <p className="">
                    {walletAddress.slice(0, 5)}...{walletAddress.slice(-4)}
                  </p>
                </div>
              )
            )}
            <div className="hidden small:flex items-center gap-x-6 h-full">
              {process.env.FEATURE_SEARCH_ENABLED && <DesktopSearchModal />}
              <Link href="/account">Account</Link>
            </div>
            <CartDropdown />
          </div>
        </nav>
        <MobileMenu />
      </header>
    </div>
  )
}

export default Nav
