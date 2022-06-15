import React from 'react'
import * as Yup from 'yup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box , CircularProgress, TextField } from '@mui/material';
import { Formik } from 'formik';
import { Button } from '@mui/material';
import { useContext } from 'react';
import { contexts } from './../../contexts/index';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useState } from 'react';



function Main() {
    
    const navigate = useNavigate();
    const{ setData } = useContext(contexts);

    const[loader , setLoader] = useState(false);

    const formSchema = Yup.object().shape({
        number: Yup.number().min(1 , "Number must Higher than 0").max(50 , "Number must lesser than 50").required(),
    });

    const handleSubmit = async(values) => {
        try{
            setLoader(true);
            const apiData = await fetch(`https://opentdb.com/api.php?amount=${values?.number}&category=${values?.category}&difficulty=${values?.difficulty}`);
            const res = await apiData.json();
            if(res.response_code === 0){
                setData(res);
                setLoader(false);
                navigate(`/questions/${values?.category}`);
            }
            else{
                setLoader(false);
                toast.error(res.error);
            }
        }
        catch (ex) {
            setLoader(false);
            toast.warn("somethin wrong !");
          }
    }

  return (
    <>
        <Formik
        validationSchema={formSchema}
        initialValues={{
            category:0,
            difficulty:0,
            number:10,
        }}
        onSubmit={handleSubmit}
        >
            {(handlers)=>(
                <Box component="form"  onSubmit={handlers.handleSubmit} sx={{marginTop:4 , display: 'flex', gap:4 , flexDirection: 'column'}}>

                    {<Box sx={{color: 'red'}}>{handlers.errors.number}</Box>}
                    <TextField fullWidth label="Number" onChange={handlers.handleChange} onBlur={handlers.handleBlur} value={handlers.values.number} name='number' id="Number" type="number"/>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label"> Select Category:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Select Category:"
                            name='category'
                            onChange={handlers.handleChange}
                            onBlur={handlers.handleBlur}
                            value={handlers.values.category}
                        >

                            <MenuItem value={0}>Any Category</MenuItem>
                            <MenuItem value={9}>General Knowledge</MenuItem>
                            <MenuItem value={10}>Entertaiment:Books</MenuItem>
                            <MenuItem value={11}>Entertaiment:Film</MenuItem>
                            <MenuItem value={12}>Entertaiment:Music</MenuItem>
                            <MenuItem value={13}>Entertaiment:Musicals & Theatres</MenuItem>
                            <MenuItem value={14}>Entertaiment:Television</MenuItem>
                            <MenuItem value={15}>Entertaiment:Video Games</MenuItem>
                            <MenuItem value={16}>Entertaiment:Board Games</MenuItem>
                            <MenuItem value={17}>Science & Nature</MenuItem>
                            <MenuItem value={18}>Science:Computers</MenuItem>
                            <MenuItem value={19}>Science:Mathematics</MenuItem>
                            <MenuItem value={20}>Mythology</MenuItem>
                            <MenuItem value={21}>Sports</MenuItem>
                            <MenuItem value={22}>Geography</MenuItem>
                            <MenuItem value={23}>History</MenuItem>
                            <MenuItem value={24}>Politics</MenuItem>
                            <MenuItem value={25}>Art</MenuItem>
                            <MenuItem value={26}>Celebrities</MenuItem>
                            <MenuItem value={27}>Animals</MenuItem>
                            <MenuItem value={28}>Vehicles</MenuItem>
                            <MenuItem value={29}>Entertaiment:Comics</MenuItem>
                            <MenuItem value={30}>Science:Gadgets</MenuItem>
                            <MenuItem value={31}>Entertaiment:Japanese Anime & Manga</MenuItem>
                            <MenuItem value={32}>Entertaiment:Cartoon & Animations</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select Difficulty:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Select Difficulty:"
                            name='difficulty'
                            onChange={handlers.handleChange}
                            onBlur={handlers.handleBlur}
                            value={handlers.values.difficulty}
                        >
                            <MenuItem value={0}>Any Category</MenuItem>
                            <MenuItem value={"easy"}>Easy</MenuItem>
                            <MenuItem value={"medium"}>Medium</MenuItem>
                            <MenuItem value={"hard"}>Hard</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                    // we have to check -> type of our button -> submit
                    type="submit"
                    className=""
                    variant="contained"
                    size="large"
                  >
                    Start
                    
                  </Button>
                  <Box sx={{display: 'flex',justifyContent: 'center'}}>
                        {loader && <CircularProgress />}
                  </Box>
                </Box>
            )}
        </Formik>
    </>
  )
}

export default Main