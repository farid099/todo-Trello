import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { fetchBoards } from "../../helpers/state/trelloSlice";
import BasicCard from "../../components/Card/BasicCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function Trello({ user }) {
  const dispatch = useDispatch();

  const boardList = useSelector((state) => state.board.boardList, shallowEqual);
  const [boards, setBoards] = useState(boardList)

  useEffect(() => {
    dispatch(fetchBoards());
    // setBoards(boardList)
  }, [dispatch]);

  const onDragEnd = (result, boards, setBoards) => {
    if (!result.destination) return;
    const { source, destination } = result;
  
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = boards[source.droppableId][source.droppableId];
      const destColumn = boards[destination.droppableId][destination.droppableId];
      const sourceItems = [...sourceColumn.cards.filter(c => c.user_id == user.id)];
      const destItems = [...destColumn.cards.filter(c => c.user_id == user.id)];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      console.log(source.droppableId) 
      

      setBoards({
        ...boards,
        [source.droppableId[0]]: {
          [source.droppableId]:{
          ...sourceColumn,
          cards: sourceItems
          }
        },
        [destination.droppableId[0]]: {
          [destination.droppableId]:{
          ...destColumn,
          cards: destItems
          }
        }
      });
      console.log(boards)
    }
  };
  console.log(boards)

  const listBoard = () =>{
    return(
      !!boards &&     <div style={{display:"flex",flexDirection:"row",justifyContent: "center", height: "100%"}}>
      <DragDropContext
      onDragEnd={result => onDragEnd(result,boards,setBoards)}
      >
        { !!boards && Object.entries(boards).map(([boardId,board]) =>{
          return (
            <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
            key={boardId}>
              <h2>{board[boardId].title}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={boardId} key={boardId}>
                {(provided, snapshot) => {
                                      return (
                                        <div
                                          {...provided.droppableProps}
                                          ref={provided.innerRef}
                                          style={{
                                            background: snapshot.isDraggingOver
                                              ? "lightblue"
                                              : "lightgrey",
                                            padding: 4,
                                            width: 250,
                                            minHeight: 500
                                          }}
                                        >
                                          {board[boardId].cards.filter(c => c.user_id == user.id).map((item, index) => {
                                            return (
                                              <Draggable
                                                key={item.id}
                                                draggableId={(item.id).toString()}
                                                index={index}
                                              >
                                                {(provided, snapshot) => {
                                                  return (
                                                    <div
                                                      ref={provided.innerRef}
                                                      {...provided.draggableProps}
                                                      {...provided.dragHandleProps}
                                                      style={{
                                                        userSelect: "none",
                                                        padding: 16,
                                                        margin: "0 0 8px 0",
                                                        minHeight: "50px",
                                                        backgroundColor: snapshot.isDragging
                                                          ? "#263B4A"
                                                          : "#456C86",
                                                        color: "white",
                                                        ...provided.draggableProps.style
                                                      }}
                                                    >
                                                      {item.content}
                                                    </div>
                                                  );
                                                }}
                                              </Draggable>
                                            );
                                          })}
                                          {provided.placeholder}
                                        </div>
                                      );
                }}

                </Droppable>
              </div>
            </div>
          )
        })}

      </DragDropContext>
      {/* {listBoard()} */}
    </div>
    )
  }

  const listBoard2 = () => {
    return(
    !!boardList &&
      boardList.map((board) => {
        return(
          <Board key={board.id}>
        {board.cards.filter(c => c.user_id == user.id).map(task => {
          return(
            <BasicCard key={task.id} title={task.title} content={task.content} />
          )
        })}
      </Board>
        )
      })
    );
  };

  return (
    listBoard()
  );
}

export const Board = styled.div`
  padding: 25px;
  width: 33%;
  padding:10px;
  margin:10px;
  border: 1px solid gray;
  background-color: #1976d2
`;