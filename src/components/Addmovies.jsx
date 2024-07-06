import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Addmovies = () => {

  const [form, setForm] = useState({
    movieName:'',
    movieImage:'',
    movieDescription:'',
    movieDirector:'' 
  })
  const location=useLocation()


  // function valueAdd() {
  //   console.log(form);
    // setCount(count + 1);
  //}

  // function valueCap(e) {
  //   // console.log(e);
  //   setForm({ ...form, [e.target.name]: e.target.value });
 // }
 function sendData(){
  if (location.state!=null) {
    axios.put('http://localhost:4000/movieedit/'+location.state.val._id,form).then((res)=>{
      alert('Data Updated');
      
    }).catch((error)=>{
      console.log(error);
    })
    
  } else {
    axios.post('http://localhost:4000/addmovie',form).then((res)=>{
      alert('Data Added')
    }).catch((error)=>{
      console.log(error)
    })
  }
  
 }
 function valueFetch(e){
  setForm({ ...form, [e.target.name]: e.target.value });
 }
 useEffect(()=>{
        if(location.state!=null){
          setForm({...form,
            movieName:location.state.val.movieName,
            movieImage:location.state.val.movieImage,
            movieDescription:location.state.val.movieDescription,
            movieDirector:location.state.val.movieDirector
          })

        }
 },[])
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Movie name"
          name="movieName"
          value={form.movieName}
          onChange={valueFetch}
        />
      </div>
      <div>
        <TextField
          id="outlined-required"
          label="Movie Image"
          name="movieImage"
          value={form.movieImage}
          onChange={valueFetch}
        />
      </div>
      <div>
        <TextField
          id="outlined-multiline-static"
          label="Movie Description"
          multiline
          rows={4}
          name="movieDescription"
          value={form.movieDescription}
          onChange={valueFetch}
        />
      </div>
      <div>
        <TextField
          id="outlined-required"
          label="Movie Director"
          name="movieDirector"
          value={form.movieDirector}
          onChange={valueFetch}
        />
      </div>
      <div>
        <Button variant="contained" onClick={sendData}>Register</Button>
        <br />
      </div>
    </Box>
  );
}

export default Addmovies;
