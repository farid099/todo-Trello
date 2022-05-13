import React, { useState } from "react";
import BasicCard from "../../components/Card/BasicCard";
import styled from "styled-components";
import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";
import { fontWeight, textAlign } from "@mui/system";

export default function Index() {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: "card 3",
      cards: [
        { id: "ojjQsGl", title: "go", content: "Going to the school" },
        { id: "ojjQsG3", title: "come", content: "Coming to the school" },
        { id: "ojjQsGl2", title: "go", content: "Going to the home" },
      ],
    },
    {
      id: 2,
      title: "card 3",
      cards: [
        { id: 4, title: "go4", content: "Going4 to the school" },
        { id: 5, title: "come5", content: "Coming5 to the school" },
        { id: 6, title: "go", content: "Going6 to the home" },
      ],
    },
    {
      id: 3,
      title: "card 3",
      cards: [{ id: 7, title: "Swim", content: "Swimming to the school" }],
    },
  ]);

  console.log()
  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);

  function dragStartHandler(e, board, card) {
    setCurrentBoard(board);
    setCurrentCard(card);
  }
  function dragEndHandler(e) {}

  function dragOverHandler(e) {
    e.preventDefault();
  }
  function dropHandler(e, board, card) {
    e.preventDefault();
    const currentIndex = currentBoard.cards.indexOf(currentCard);
    currentBoard.cards.splice(currentIndex, 1);
    const dropIndex = board.cards.indexOf(card);
    board.cards.splice(dropIndex + 1, 0, currentCard);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
  }
  function dragLeaveHandler() {}

  function dropCardHandler(e, board) {
    if(board.cards.length <1){
      board.cards.push(currentCard);
      const currentIndex = currentBoard.cards.indexOf(currentCard);
      currentBoard.cards.splice(currentIndex, 1);
      setBoards(
        boards.map((b) => {
          if (b.id === board.id) {
            return board;
          }
          if (b.id === currentBoard.id) {
            return currentBoard;
          }
          return b;
        })
      );
    }

    e.preventDefault()
  }

  return (
    <>
      <Grid container spacing={2}>
        {!!boards && boards.map((board) => (
          <Grid key={board.id} item xs={4} style={{ textAlign: "center" }}>
            <div
              
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => dropCardHandler(e, board)}
            >
              <Typography
                sx={{ fontSize: 25, fontWeight: 700 }}
                color="text.secondary"
                gutterBottom
              >
                {board.title}
              </Typography>
              {board.cards.map((card) => (
                <div
                  key={card.id}
                  onDragStart={(e) => dragStartHandler(e, board, card)}
                  onDragLeave={(e) => dragLeaveHandler(e)}
                  onDragEnd={(e) => dragEndHandler(e)}
                  onDragOver={(e) => dragOverHandler(e)}
                  onDrop={(e) => dropHandler(e, board, card)}
                  draggable={true}
                >
                  <BasicCard title={card.title} content={card.content} />
                </div>
              ))}
            </div>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
