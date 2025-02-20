import React, { useEffect, useState } from 'react'
import { Box, Button, Card, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()



  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      email: email,
      password:password
    }

      axios.post("http://localhost:5000/Login", data).then((res) => {
       console.log(res.data);
       const {id,login} = res.data
       console.log(login);
       
       if(login === "Admin"){
        sessionStorage.setItem("aid",id)
        navigate("/Admin")

       }

        
      }).catch((err) => {
        console.error(err)
      })
    
  }









  return (
    <Box>
{
    sessionStorage.getItem("aid")
}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Card sx={{ height: 200, p: 6 }}>
          <Stack spacing={2} direction="column" component={'form'} onSubmit={handleSubmit}>
            


          <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField id="outlined-basic" label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type='submit' variant="contained">Login</Button>
          </Stack>
        </Card>

      </Box>

     
    </Box>
  )
}

export default Login