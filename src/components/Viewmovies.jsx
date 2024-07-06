import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Viewmovies = () => {
  const [data,setData]=useState([])
  var navigate=useNavigate()

  useEffect(() => {
    axios.get('http://localhost:4000/movies').then((res) => {
      console.log(res)
      setData(res.data)
    })
  }, [])   
  function del_value(_id){
  axios.delete('http://localhost:4000/moviedelete/'+_id).then((res) => {
    alert('Data deleted')
    window.location.reload()
  }).catch((error)=>{
    console.log(error)
  
  })
  } 
  function update_value(val){
    navigate('/add',{state:{val}})
    
  }
  return (
    <Box sx={{ width: '100%', padding: '2%' }}>
      <Grid container spacing={3}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ minWidth: 275, margin: 'auto' }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {item.movieDescription}
                </Typography>
                <Typography variant="h5" component="div">
                  {item.movieName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {item.movieImage}
                </Typography>
                <Typography variant="body2">
                  {item.movieDirector}
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained"onClick={()=>{
                  update_value(item)
                }}>Update</Button>
                <Button variant="contained"onClick={()=>{
                  del_value(item._id)
                }}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Viewmovies
