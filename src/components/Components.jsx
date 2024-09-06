import styled from "styled-components"

export const PageContainer = styled.div`
  position: relative;
  height: 100vh; /* Full viewport height */
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  /*padding: 1rem; */
  margin-top: -70px;
  box-sizing: border-box; /* Include padding in width/height calculations */
`

export const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;

  position: relative;
  overflow: hidden;

  width: 678px;

  min-height: 400px;
  z-index: 200; /* Ensure it's above the blurred background */

  @media (max-width: 768px) {
  }
  @media (max-width: 768px) {
    min-height: 350px;
  }
`

export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${(props) =>
    props.signinIn !== true
      ? `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  `
      : null}
  @media (max-width: 768px) {
    width: 50%;
  }
`

export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${(props) =>
    props.signinIn !== true ? `transform: translateX(100%);` : null}

  @media (max-width: 768px) {
    width: 50%;
  }
`

export const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  color: #403bc8;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`

export const Title = styled.h1`
  font-weight: bold;
  margin: 0;

  @media (max-width: 768px) {
  }
`

export const Input = styled.input`
  background-color: #ffffff;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  border-radius: 7px;

  @media (max-width: 768px) {
    padding: 6px 10px;
    border-radius: 7px;
  }
`

export const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #403bc8;
  background-color: #403bc8;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`

export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;

  @media (max-width: 768px) {
    font-size: 11px;
    font-weight: bold;
  }
`

export const Anchor = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;

  @media (max-width: 768px) {
  }
`

export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${(props) =>
    props.signinIn !== true ? `transform: translateX(-100%);` : null}
`

export const Overlay = styled.div`
  background: #d42680;
  background: -webkit-linear-gradient(to right, #ce2783, #403bc8);
  background: linear-gradient(to right, #ce2783, #403bc8);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${(props) => (props.signinIn !== true ? `transform: translateX(50%);` : null)}
`

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`

export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${(props) => (props.signinIn !== true ? `transform: translateX(0);` : null)}
`

export const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${(props) => (props.signinIn !== true ? `transform: translateX(20%);` : null)}
`

export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`

export const CancelButton = styled.button`
  background-color: transparent;
  border-color: #ffffff;
  margin-top: 10px;

  &:hover {
    color: #403bc8;
  }
`
