import React, { useState, useEffect, useCallback } from 'react';
import './grid.css';

function Grid(props) {

  const [grid, setGrid] = useState({})
  const [chosen, setChosen] = useState({})

  const [chooseEnabled, setChooseEnabled] = useState(false)

  let status = ["available", "taken", "away"]
  
  function useForceUpdate() {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
      setTick(tick => tick + 1);
    }, [])
    return update;
  }
  const forceUpdate = useForceUpdate();


  useEffect(() => {
    setupGrid()
  }, []);

  function setupGrid(){
      let cells = {};
      for(let i = 0; i < 100; i++){
        cells[i] = {id: i, status: status[0]}
      }
      setGrid(cells)
  }

  function changeStatus(id){
    if (!chooseEnabled){
      if (grid[id].status === status[0]){
        grid[id].status = status[1]
      }
      else if (grid[id].status === status[1]) {
        grid[id].status = status[0] 
      } 

    }else {
      if (grid[id].status === status[1]){
          chosen[id] = grid[id]
          grid[id].status = status[2]
      }
      else if (grid[id].status === status[2]){
          delete chosen[id]
          grid[id].status = status[1]
      }
    }
    console.log(grid[id])


    forceUpdate();
  }

  function removeFromChosen(val) {
    grid[val.id].status = status[1]
    delete chosen[val.id]

    forceUpdate();
  }

  return (
    <div className="grid-page">
      <p id="boxTitle">Boks {props.number}</p>
      <div className="grid-content">
      <div className="grid-list">
       <button className={`toggleButton ${chooseEnabled ? "available" : "taken"}`} onClick={()=>{setChooseEnabled(!chooseEnabled)}}>Plukk {chooseEnabled ? "på" : "av"}</button>
        <p id="listeTitle">Valgte:</p>
        <div className="grid-list-box">
          {Object.values(chosen).map((val,index) => {
            return <div className={`cell ${grid[val.id].status}`} key={index} onClick={()=>{removeFromChosen(grid[val.id])}}>
              {grid[val.id].id+1}
            </div>
          })}
        </div>
      </div>
      <div className="grid-box">
        {Object.values(grid).map((val, index) => {
          return <div id={val.id} className={`cell ${val.status}`} key={index} onClick={()=>{changeStatus(val.id)} }>
            {val.id+1}
          </div>
        })}
      </div>

      </div>
    </div>
  );
}

export default Grid;