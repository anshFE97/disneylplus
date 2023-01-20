import styled from "styled-components"
import LogoOne from '../assets/cta-logo-one.svg'
import LogoTwo from '../assets/cta-logo-two.png'

const Login = () => {
  return (
    <Container>
        <Content>
            <CTA>
                <CTALogoOne src={LogoOne} alt="LogoTop" />
                <Signup>Sign Up Now</Signup>
                <Description>Get Premium Access to Our exclusive Library of content with one Disney+ subscription. Get The Disney Bundle to get even more. </Description>
                <CTALogoTwo src={LogoTwo} alt="LogoBottom" />
            </CTA>
            <BgImage />
        </Content>
    </Container>
  )
}

const Container = styled.section`
overflow: hidden;
display: flex;
flex-direction: column;
text-align: center;
height: 100vh;
`

const Content = styled.div`
margin-bottom: 10vw;
width: 100vw;
position: relative;
min-height: 100vh;
box-sizing: border-box;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
padding:  80px 40px;
height: 100%;
`

const BgImage = styled.div`
height: 100%;
background-position: top;
background-size: cover;
background-repeat: no-repeat;
background-image: url('/images/login-background.jpg');
position: absolute;
top: 0;
right: 0;
bottom: 0;
left: 0;
z-index: -1;
`

const CTA = styled.div`
margin-bottom: 2vw;
max-width: 650px;
flex-wrap: wrap;
display: flex;
flex-direction: column;
justify-content: center;
margin-top: 0;
align-items: center;
text-align: center;
transition-timing-function: ease-out;
transition: opacity 0.2s;
width: 100%;
`

const CTALogoOne = styled.img`
margin-bottom: 12px;
max-width: 600px;
min-height: 1px;
display: block;
width: 100%;
`

const Signup = styled.a`
font-weight: bold;
color: #f9f9f9;
background-color: #0063e5;
margin-bottom: 12px;
width: 100%;
letter-spacing: 1.5px;
font-size:18px;
padding: 16.5px 0;
border: 1px solid transparent;
border-radius: 4px;

&:hover {
    background-color: #0483ee;
    cursor: pointer;
}
`

const Description = styled.p`
color: hsla(0, 0, 95.3%, 1);
font-size: 11px;
margin: 0 0 24px;
line-height: 1.5;
letter-spacing: 1.5px;
`

const CTALogoTwo = styled.img`
margin-bottom: 20px;
max-width: 600px;
display: block;
width: 100%;
`

export default Login