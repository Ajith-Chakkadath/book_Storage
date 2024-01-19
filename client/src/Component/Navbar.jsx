import React, { useEffect, useState } from 'react'

function Navbar() {
    const [isMenuOpen , setisMenuOpen]=useState(false)
    const [isSticky, setIsSticky] =useState(false)

    const toggleMenu = ()=>{
        setIsMenuOpen(!isMenuOpen)
    }

    useEffect(()=>{
        const handleScroll = ()=>{
            if(window.scrollY>100){
                setIsSticky(true)
            }
            else{
                setIsSticky(false)
            }
        }
        window.addEventListener('scroll',handleScroll)
        return () => {

        }
    })
  return (
    <div>Navbar</div>
  )
}

export default Navbar