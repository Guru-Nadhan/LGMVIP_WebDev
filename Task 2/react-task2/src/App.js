
import React, {useEffect, useState} from "react";
import "./App.css";
import axios from "axios";
import Loading from "./Loading";
import logo from "./mylogo.jpg";
import "./App.css";
const App = () => {
  const [cardData, setData] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const Data = async () => {
    if (visibility) {
      const res = await axios.get("https://reqres.in/api/users?page=1");
      const delaytime = 5000;
      await new Promise(resolve => setTimeout(resolve, delaytime));
      setData(res.data.data);
    }
    setLoading(false);
  };

  const display = () => {
    setVisibility(true);
    setLoading(true);
  };

  useEffect(() => {
    if (visibility) {
      Data();
    }
  }, [loading]);

  const Card = badaboom => {
    if (loading) return Loading;
    else {
      return (
        <div className="displaybox">
          <br />
          <br />
          <div>
            <img className="avatar" src={badaboom.avatar} />
            <br />
            <br />
            <h4>{badaboom.first_name}</h4>
            <h4>{badaboom.last_name}</h4>
            <h4>{badaboom.email}</h4>
          </div>
          <br />
          <button className="userbtn">Get to know more</button>
        </div>
      );
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <img className="logo" src={logo}></img>
        <h1 style={{color: "white"}}>Task 2 React App</h1>
        <button
          type="button"
          class="btn btn-outline-info"
          className="btn"
          style={{backgroundColor: "#6ed1ff"}}
          onClick={display}
        >
          Get Users
        </button>
      </nav>
      <body>
        <div>
          <h1 className="hel">
            Deltails of Users Below <i class="far fa-hand-point-down"></i>
          </h1>
          <hr style={{width: "2px"}}></hr>

          {loading ? <Loading /> : null}
          <div className="container" style={userStyle}>
            {loading ? null : cardData.map(Card)}
          </div>
        </div>
      </body>
    </div>
  );
};

const userStyle = {
  display: "grid",
  gridGap: "2rem",
  gridTemplateColumns: "repeat(2,1fr)",
  marginTop: "20px",
  marginBottom: "20px",
};

export default App;
