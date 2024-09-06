import React, { useState } from "react"
import {
  PageContainer,
  Container,
  SignInContainer,
  OverlayContainer,
  Overlay,
  LeftOverlayPanel,
  RightOverlayPanel,
  Form,
  Title,
  Input,
  Button,
  GhostButton,
  Paragraph,
  CancelButton,
} from "../Components"
import SignUpForm from "./SignUpForm"
import SignInForm from "./SignInForm"

const Signin = ({closePopup}) => {
  const [signIn, toggle] = useState(true)
  const [isBlurred, setIsBlurred] = useState(false)

  const handlePanelOpen = (isOpen) => {
    setIsBlurred(isOpen)
  }

  const handlePopup = () => {
    closePopup();
  }

  return (
    <PageContainer isBlurred={isBlurred}>
      
      <Container>
        <SignUpForm signIn={signIn}  closePopup= {handlePopup} />

        <SignInForm signIn={signIn}  closePopup= {handlePopup}/>

        <OverlayContainer signinIn={signIn}>
          <Overlay signinIn={signIn}>
            <LeftOverlayPanel signinIn={signIn}>
              <Title>Welcome Back!</Title>
              <Paragraph>
                To keep connected with us, please login with your personal info
              </Paragraph>
              <GhostButton
                onClick={() => {
                  toggle(true)
                  handlePanelOpen(false)
                }}
              >
                Sign In
              </GhostButton>
            </LeftOverlayPanel>

            <RightOverlayPanel signinIn={signIn}>
              <Title>Hello, Friend!</Title>
              <Paragraph>
                Enter your personal details and start your journey with us
              </Paragraph>
              <GhostButton
                onClick={() => {
                  toggle(false)
                  handlePanelOpen(true)
                }}
              >
                Sign Up
              </GhostButton>
            </RightOverlayPanel>
          </Overlay>
        </OverlayContainer>
      </Container>
    </PageContainer>
  )
}

export default Signin
