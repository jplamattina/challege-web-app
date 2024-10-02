/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client'

import React, { useState } from 'react'
import { Button, TextField, Container, Typography, Box, Link } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setUser } from '../app/redux/slices/userSlice'
import { login } from '../app/redux/slices/authSlice'
// import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { useRouter } from 'next/navigation'
import mockedUser from './../mock/users.json'

interface User {
    name: string;
    password: string;
    email: string;
    role: string;
  }

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [singIn , setSingIn] = useState('login')
  const [usersWithRoles, setUsersWithRoles] = useState<User[]>(mockedUser.users)
  const router = useRouter()

  const dispatch = useDispatch()
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const existingUser = usersWithRoles.some((user) => user.email === email)
    const userSigned = usersWithRoles.find(user => user.email === email)
    if(singIn === 'login') {
      if(userSigned?.password === password) {
          toast.success(`${userSigned?.name} Hola de nuevo 👋`, { position: "top-left" })
          dispatch(login(userSigned?.role));
          userSigned?.role === 'admin' ? router.push('/admin') : router.push('/user')
      } else {
        toast.error(`password o email incorrectos`, { position: "top-left" })
      }
      if (!existingUser) {
        toast.error(`${email} no existe, por favor registrate`, { position: "top-left" })
      }
    } else {
      if (password.length < 8) {
        toast.error("La contraseña debe tener al menos 8 caracteres", { position: "top-left" });
        return; 
      }
        if(existingUser) {
            toast.error(`${email} ya existe`, {
                position: "top-left"
            })
        } else {
            const newUser: User = {
                name: name,
                password: password,
                email,
                role: 'user',
              }
              usersWithRoles.push(newUser)
              setUsersWithRoles([...usersWithRoles, newUser])
              dispatch(setUser({ email: newUser.email, role: newUser.role }))
              toast.success(`${name} bienvenido`, {
                position: "top-left"
            })
            newUser.role === 'admin' ? router.push('/admin') : router.push('/user')
        }
    }
  }
    const handleLogin = () => {
        setSingIn('signIn')
    }
    const handleSignIn = () => {
        setSingIn('login')
    }

  return (
    (singIn === 'login' ? 
        (  
        <Container maxWidth="xs">
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              mt: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Login
            </Typography>
              <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
            />
              <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Link onClick={handleLogin}> Sign In</Link>
            <ToastContainer />
          </Box>
        </Container>
        ) 
        : 
        (  
            <Container maxWidth="xs">
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  mt: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography component="h1" variant="h5">
                  Sign In
                </Typography>
                  <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  autoFocus
                />
                  <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                 <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Name"
                  type="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="current-password"
                />
                  <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Link onClick={handleSignIn}> Login </Link>
                <ToastContainer />
              </Box>
            </Container>
            ) 
    )
  
  )
}

export default Login
