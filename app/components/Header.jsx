import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <>
      <Link href={"/"} className='text-blue-500 me-3 hover:text-blue-700'>
        Home
      </Link>
      <Link href={"/client"} className='text-blue-500 hover:text-blue-700'>
        Client
      </Link>
    </>
  )
}

export default Header