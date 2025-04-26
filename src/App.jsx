import { Typography, Box } from "@mui/material";
import MemoryGame from "./MemoryGame";
import TicTacToe from "./TicTacToe";

function App() {
 return(
  <Box>
  {/* <Typography variant="h1" textAlign="center" sx={{WebkitTextStroke : "4px black", color:"transparent"}} >
    Games
  </Typography> */}
  {/* <TicTacToe/> */}
 <MemoryGame/>
  </Box>
 )
}

export default App;
