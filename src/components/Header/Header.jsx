import React from "react";
import styled    from 'styled-components'

import oliveyoung_logo from '../assets/oliveyoung_logo.png'

function Header () {
    return(
     <>
     <img src={oliveyoung_logo} className="logo oliveyoung" alt="Oliveyoung logo" />
     </>   
    )
}

export default Header