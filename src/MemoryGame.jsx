import { Box, Typography, Button, Card, CardMedia, Grid, Container, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useState, useEffect } from "react";

function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false); 
  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState("");

  const cardImages = [
    { src: "src/assets/comb.jpg", matched: false },
    { src: "src/assets/dice.jpg", matched: false },
    { src: "src/assets/jug.jpg", matched: false },
    { src: "src/assets/sissior.jpg", matched: false },
    { src: "src/assets/umbrella.jpg", matched: false },
    { src: "src/assets/watch.jpg", matched: false }
  ];

  // Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));

    setCards(shuffledCards);
    setTurn(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setIsGameStarted(true); // Show cards initially
    setShowDialog(false)

    // Flip cards back after 1 minute
    setTimeout(() => setIsGameStarted(false), 1000);
  };

  // Handle card choice
  const handleChoice = (card) => {
    if (!disabled && !card.matched && !isGameStarted) {
      if (choiceOne && card.id === choiceOne.id) return;
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  // Check for a match
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        resetTurn(); // Cards remain flipped because they're matched
      } else {
        setTimeout(resetTurn, 2000); // Flip back after 2 seconds
      }

      setTurn((prevTurn) => prevTurn + 1);
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      const winMessage = turn <= 6
        ? `Congratulations🥂! You won in ${turn} turns!` 
        : turn <=10 ? `Good job🎊! You completed the game in ${turn} turns.` : `You completed the game in ${turn} turns.`;
  
      setMessage(winMessage);
      setShowDialog(true);
    }
  }, [cards]);

  // Reset choices
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Memory Game
        </Typography>
        <Button variant="contained" onClick={shuffleCards}>
          New Game
        </Button>

        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          {cards.map((card) => {
            const isFlipped =
              isGameStarted || card === choiceOne || card === choiceTwo || card.matched;

            return (
              <Grid item xs={4} key={card.id}>
                <Card
                  sx={{
                    maxWidth: 200,
                    perspective: "1000px",
                  }}
                  onClick={() => handleChoice(card)}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: 140,
                      transformStyle: "preserve-3d",
                      transition: "transform 0.6s",
                      transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                  >
                    {/* Front Side */}
                    <CardMedia
                      sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                      image={card.src}
                      title="Card Front"
                    />
                    {/* Back Side */}
                    <CardMedia
                      sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        transform: "rotateY(0deg)",
                      }}
                      image="src/assets/backimg.jpg"
                      title="Card Back"
                    />
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Box mt={2}>
          <Typography variant="h6">Turns: {turn}</Typography>
        </Box>
      </Box>
      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
  <DialogTitle>Game Completed</DialogTitle>
  <DialogContent>
    <Typography>{message}</Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setShowDialog(false)}>Close</Button>
    <Button variant="contained" onClick={shuffleCards}>
          New Game
        </Button>
  </DialogActions>
</Dialog>
    </Container>
  );
}

export default MemoryGame;
