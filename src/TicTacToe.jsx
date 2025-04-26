import { Typography, Box, Button, Grid2 as Grid, Card, Container } from "@mui/material";
import { useEffect, useState } from "react";

const TicTacToe = () => {
   
    const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState("x");
  const [winner, setWinner] = useState(false);
  const handleClick = (index) => {
    if (board[index] === null) {
        const newBoard = [...board]; 
        newBoard[index] = turn; 
        setBoard(newBoard);
      const win=  checkWin(newBoard)
      if(win){
        setWinner(true) 
        return;
      }
    setTurn((prevTurn) => (prevTurn === "x" ? "0" : "x"));
    }
    
  };
  const checkWin = (newBoard) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    return winPatterns.some(pattern => {
      const [a, b, c] = pattern;
      console.log(pattern);
      return newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c];
    });
  };

 const restart=()=>{
    return(
        setBoard(initialBoard),
        setTurn("x")
    )
 }
  
  return (
    <Container>
    <Box textAlign="center">
      <Typography variant="h4" gutterBottom>
        Tic Tac Toe Game
      </Typography>
      <Button variant="contained" onClick={restart}>Restart Game</Button>
{ winner ? <Typography my={2} variant="h2">winner {turn}</Typography>: ""}
      <Typography my={2} sx={{display: winner ? "none" : "block"}} variant="h2">Turn : {turn}</Typography>
      <Box sx={{width:"500px", textAlign: "center", margin: "0 auto" }}>
      <Grid container >
      {board.map((item, index) => {
        return (
            <Grid size={4} key={index} >
                <Box onClick={()=>handleClick(index)} >
            <Card sx={{height:"180px", width:"180px", border:"1px solid black", borderRadius:"0", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <Typography variant="h3">{item}</Typography>
              </Card>
                </Box>
            </Grid>
        );
    })}

    </Grid>
    </Box>

     
    </Box>
    </Container>
  );
};
export default TicTacToe;
