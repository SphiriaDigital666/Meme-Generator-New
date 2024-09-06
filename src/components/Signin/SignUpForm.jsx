import React from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import {
  SignUpContainer,
  Form,
  Title,
  Input,
  Button,
  CancelButton,
} from "../Components"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const SignUpForm = ({ signIn, closePopup }) => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm()

  const password = watch("password", "") // Watch the password field value

  const handleSignUp = async (data) => {
    try {
      const response = await axios.post(
        "https://meme-backend-iota.vercel.app/auth/register",
        {
          userName: data.name,
          email: data.email,
          password: data.password,
        }
      )

      if (response) {
        alert("Registration successful!")
        reset() // Reset the form after successful submission
        navigate("/auth/main")
      }
    } catch (error) {
      console.error("Error during registration:", error)
      toast.error("Registration failed. Please try again:(", { id: "toast-download" })
      // alert("Registration failed. Please try again.")
    }
  }

  const handleCancel = () => {
    reset() // Reset the form when cancel is clicked
  }

  return (
    <SignUpContainer signinIn={signIn}>
      <Form onSubmit={handleSubmit(handleSignUp)}>
        <Title>Create Account</Title>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="text-red-600">{errors.name.message}</p>}

        <Input
          type="email"
          name="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}

        <Input
          type="password"
          name="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && <p className="text-red-600">{errors.password.message}</p>}

        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "Confirm password is required",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-600">{errors.confirmPassword.message}</p>
        )}

        <Button type="submit">Sign Up</Button>
        <CancelButton type="button" onClick={closePopup}>
          Cancel
        </CancelButton>
      </Form>
    </SignUpContainer>
  )
}

export default SignUpForm
