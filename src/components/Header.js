import styled from "styled-components"
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth"
import {auth, provider} from '../firebase.js'
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"
import { 
    selectUserName, 
    selectUserPhoto, 
    setUserLoginDetails,
    setSignOutState
} from "../features/user/userSlice"


import DisneyLogo from '../assets/logo.svg'
import Home from '../assets/home-icon.svg'
import Search from '../assets/search-icon.svg'
import Watchlist from '../assets/watchlist-icon.svg'
import Originals from '../assets/original-icon.svg'
import Movies from '../assets/movie-icon.svg'
import Series from '../assets/series-icon.svg'

const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userName = useSelector(selectUserName)
    const userPhoto = useSelector(selectUserPhoto)

    useEffect(() => {
      onAuthStateChanged(auth, async(user) => {
        if(user) {
            setUser(user)
            navigate("/home")
        }
      })
    }, [userName])
    

    const handleAuth = async() => {
            if(!userName) {
                try {
                    const result = await signInWithPopup(auth, provider);
                    setUser(result.user)
                    
                  } catch (err) {
                    console.log(err)
                  }
            } else if (userName) {
                try {
                    await signOut(auth).then(() => {
                        dispatch(setSignOutState())
                        navigate('/')
                    })
                } catch (err) {
                    console.log(err.message)
                }
            }
            }

    const setUser = (user) => {
        dispatch(
            setUserLoginDetails({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
        }))
    }


  return (
    <Nav>
        <Logo>
            <img src={DisneyLogo} alt="Disney+" />
        </Logo>

        {
             !userName ? (
                <Login onClick={handleAuth}>Login</Login>
             ) : (
                <>
                
                <NavMenu>
                    <a href='/home'>
                        <img src={Home} alt="home" />
                        <span>Home</span>
                    </a>
                    <a href='/search'>
                        <img src={Search} alt="search" />
                        <span>Search</span>
                    </a>
                    <a href='/watchlist'>
                        <img src={Watchlist} alt="watchlist" />
                        <span>Watchlist</span>
                    </a>
                    <a href='/originals'>
                        <img src={Originals} alt="originals" />
                        <span>Originals</span>
                    </a>
                    <a href='/movies'>
                        <img src={Movies} alt="movies" />
                        <span>Movies</span>
                    </a>
                    <a href='/series'>
                        <img src={Series} alt="series" />
                        <span>Series</span>
                    </a>
                </NavMenu>
                <SignOut>
                    <UserImg src={userPhoto} alt="profile" />
                    <DropDown>
                        <span onClick={handleAuth}>Sign Out</span>
                    </DropDown>
                </SignOut>
                </>
             )
        }
    </Nav>
  )
}

const Nav = styled.nav`
position: fixed;
top: 0;
left: 0;
right: 0;
height: 70px;
background-color: #090b13;
display: flex;
justify-content: space-between;
align-items: center;
padding-inline: 36px;
letter-spacing: 16px;
z-index: 9;
`

const Logo = styled.a`
padding: 0%;
width: 80px;
margin-top: 4px;
max-height: 70px;
font-size: 0;
display: inline-block;
img {
    display: block;
    width: 100%;
}
`

const NavMenu = styled.div`
display: flex;
align-items: center;
flex-flow: row nowrap;
height: 100%;
justify-content: flex-end;
margin: 0px;
padding: 0px;
position: relative;
margin-right: auto;
margin-left: 25px;

a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
        height: 20px;
        min-width: 20px;
        width: 20px;
        z-index: auto;
    }

    span {
        color: rgb(249, 249, 249);
        font-size: 13px;
        letter-spacing: 1.42px;
        line-height: 1.08;
        padding: 2px;
        white-space: nowrap;
        position: relative;
        text-transform: uppercase;

        &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0;
        visibility: hidden;
        width: auto;
      } 
    }


    &:hover {
    span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
    }
  }

}


@media (max-width: 768px) {
    display: none;
}
`

const Login = styled.a`
background-color: rgb(0, 0, 0, 0.6);
padding: 8px 16px;
text-transform: uppercase;
letter-spacing: 1.5px;
border: 1px solid #f9f9f9;
border-radius: 4px;
transition: all 0.2s ease-out;

&:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
    cursor: pointer;
}
`

const UserImg = styled.img`
height: 100%;
`

const DropDown = styled.div`
position: absolute;
top: 48px;
right: 0px;
background: rgb(19, 19, 19);
border: 1px solid rgba(151, 151, 151, 0.34);
border-radius: 4px;
box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
padding: 10px;
font-size: 14px;
letter-spacing: 3px;
width: 100px;
opacity: 0;
`

const SignOut = styled.div`
position: relative;
height: 48px;
width: 48px;
display: flex;
cursor: pointer;
align-items: center;
justify-content: center;

${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
}

&:hover {
    ${DropDown} {
        opacity: 1;
        transition: 1s;
    }
}
`

export default Header