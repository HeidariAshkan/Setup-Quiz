import React from 'react'
import { useContext } from 'react';
import { contexts } from './../../contexts/index';
import { Container, Card, ButtonBase, Typography } from '@mui/material';
import { Box } from '@mui/material';
import { useState } from 'react';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';


function Quiz() {

  const { data , setData } = useContext(contexts)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [correctAnswer, setcorrectAnswer] = useState(0)
  const [showModal, setShowModal] = useState(false)

  const navigate = useNavigate();




    const answers = [...data.results[currentQuestion].incorrect_answers, data.results[currentQuestion].correct_answer]
    answers.sort(() => Math.random() - 0.5);
    console.log(answers)


  const handleCheckAnswer = (index) => {
    if (answers[index] === data.results[currentQuestion].correct_answer) {
      setcorrectAnswer(correctAnswer + 1);
      handleNextQuestion();
    }
    else{
      handleNextQuestion();
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < data.results.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
    else{
      setShowModal(true)
    }

  }

  const handlePlayAgain = () => {
    setShowModal(false)
    setCurrentQuestion(0)
    setcorrectAnswer(0)
    setData([])
    navigate('/')
  }

  return (
    <>
      <Container className='h-[100%] flex justify-center items-center'>
        <Card variant='outlined' className='p-7 w-[75%]'>
            <Box className='text-green-700 flex justify-end mt-[10px] text-[20px] font-semibold'>
              <p>
                Correct Answers: {correctAnswer}/{data.results.length}
              </p>
            </Box>
            <Box>
              <div className='flex justify-center'>
                <h1 className='text-[30px] text-[#112230] font-extrabold text-center'>{data.results[currentQuestion].question}</h1>
              </div>
              <div>
                {answers.map((answer, index) => (
                  <ButtonBase onClick={()=>handleCheckAnswer(index)} className='bg-[#86c6f9] w-[100%] text-[18px] m-2 rounded-md hover:bg-blue-400 hover:animate-pulse p-2' key={index}>
                    {answer}
                  </ButtonBase>
                )
                )}
                <div className='flex justify-end mt-4'>
                  <Button onClick={handleNextQuestion} variant='contained'>Next Questions</Button>
                </div>
              </div>
            </Box>
        </Card>
        <Modal
        open={showModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
              <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 500,
                  bgcolor:'background.paper',
                  border:'2px solid #000',
                  boxShadow: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '20px',
                  
              }}>
                <Typography color={'#112230'} variant='h1' >
                  Congrats!
                </Typography> 
                <Typography color={'secondary'}>
                  You answered {correctAnswer/data.results.length*100}%
                </Typography> 
                <Button onClick={handlePlayAgain} sx={{marginBottom: '10px'}} variant='contained'>
                  Play Again
                </Button>
              </Box>
        </Modal>
      </Container>
    </>
  )
}

export default Quiz