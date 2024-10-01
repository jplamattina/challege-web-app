/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client'

import React, { useState, useEffect } from 'react'
import { Button, TextField, Container, Typography, Box, Link } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setUser } from '../app/redux/slices/userSlice'
import { login } from '../app/redux/slices/authSlice'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { useRouter } from 'next/navigation'

interface User {
    id: number
    name: string
    email: string
    role: 'admin' | 'user'
  }

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [singIn , setSingIn] = useState('login')
  const [usersWithRoles, setUsersWithRoles] = useState<User[]>([])
  const router = useRouter()

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        const users = response.data.map((user: User, index: number) => ({
          ...user,
          role: index === 0 ? 'admin' : 'user',
        }))
        setUsersWithRoles(users)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    fetchUsers()
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres", { position: "top-left" });
      return; 
    }
    console.log('email', email)
    const existingUser = usersWithRoles.some((user) => user.email === email)
    console.log('existingUser', existingUser)
    console.log('first', singIn)
    const userSigned = usersWithRoles.find(user => user.email === email)
    console.log('usersWithRoles', usersWithRoles)
    if(singIn === 'login') {
      if (!existingUser) {
        toast.error(`${email} no existe, por favor registrate`, { position: "top-left" })
      } else {
        dispatch(login(userSigned?.role));
        userSigned?.role === 'admin' ? router.push('/admin') : router.push('/user')
      }
    } else {
        if(existingUser) {
            toast.error(`${email} ya existe`, {
                position: "top-left"
            })
        } else {
            const newUser: User = {
                id: usersWithRoles.length + 1,
                name: name,
                email,
                role: 'user',
              }
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
