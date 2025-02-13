import React, { useEffect, useState } from 'react'
import { Box, Button, Card, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import axios from 'axios'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const App = () => {
  const [district, setDistrict] = useState("")
  const [districtRows, setDistrictRows] = useState([])
  const [districtEditId, setDistrictEditId] = useState(null)



  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      districtName: district
    }

    if(districtEditId === null){
      axios.post("http://localhost:5000/District", data).then((res) => {
        setDistrict("")
        fetchDistrict()
  
        alert(res.data.message)
      }).catch((err) => {
        console.error(err)
      })
    }
    else{
      axios.put(`http://localhost:5000/District/${districtEditId}`, data).then((res) => {
        setDistrict("")
        fetchDistrict()
  
        alert(res.data.message)
      }).catch((err) => {
        console.error(err)
      })
    }
   

  }


  const fetchDistrict = () => {
    axios.get("http://localhost:5000/District").then((res) => {
      console.log(res.data.district);
      setDistrictRows(res.data.district)
    }).catch((err) => {
      console.error(err)
    })

  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/District/${id}`).then((res) => {
      console.log(res.data.message);
      alert(res.data.message)
      fetchDistrict()
    }).catch((err) => {
      console.error(err)
    })

  }


  const handleEditFech = (id) => {
    axios.get(`http://localhost:5000/DistrictById/${id}`).then((res) => {
      const result = res.data.district
      setDistrictEditId(result._id)
      setDistrict(result.districtName)

    }).catch((err) => {
      console.error(err)
    })


  }



  useEffect(() => {
    fetchDistrict()
  }, [])
  return (
    <Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Card sx={{ height: 120, p: 6 }}>
          <Stack spacing={2} direction="row" component={'form'} onSubmit={handleSubmit}>
            <TextField id="outlined-basic" label="District" variant="outlined" value={district} onChange={(e) => setDistrict(e.target.value)} />
            <Button type='submit' sx={{ width: 200 }} variant="contained">Save</Button>
          </Stack>
        </Card>

      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sl No</TableCell>
              <TableCell >District</TableCell>
              <TableCell >Action</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {districtRows && districtRows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell >{index + 1}</TableCell>
                <TableCell >{row.districtName}</TableCell>
                <TableCell >
                  <Stack direction={'row'}>

                    <IconButton aria-label="delete" onClick={()=>handleDelete(row._id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={()=>handleEditFech(row._id)}>
                      <EditIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default App