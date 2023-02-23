import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [endPoints, setEndPoints] = useState("");

  const [container, setContainer] = useState([]);

  const [finalPoint, setFinalPoint] = useState("");

  // const options = {
  //   method: "GET",
  //   headers: {
  //     "X-RapidAPI-Key": "d4730bafe9mshc8f762be5ccb57dp1bc7c5jsn36e1a6a7d25d",
  //     "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
  //   },
  // };

  useEffect(() => {
    fetchMe();
  }, [finalPoint]);

  const fetchMe = () => {
    fetch(
      `https://online-movie-database.p.rapidapi.com/auto-complete?q=+${endPoints}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "d4730bafe9mshc8f762be5ccb57dp1bc7c5jsn36e1a6a7d25d",
          "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setContainer(data.d);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onChangeHandler = (e) => {
    setEndPoints(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setFinalPoint(endPoints);
  };

  return (
    <div className="App">
      <h1>Movie Search</h1>
      <form onSubmit={submitHandler} className="search">
        <input type="text" value={endPoints} onChange={onChangeHandler} />
        <button type="submit">Submit</button>
      </form>

      <div className="element">
        {container.map((item, index) => {
          return (
            <div key={index} className="element-div">
              <img src={item.i.imageUrl} alt={item.l} />
              <p>{item.l}</p>
              <p>{item.y}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
