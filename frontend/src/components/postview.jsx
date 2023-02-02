import "./app.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Postview = () => {
  const [arr, setArr] = useState([]);
  const [gif, setGif] = useState(true);

  useEffect(() => {
    setGif(true);
    axios
      .get("https://instaclone-app-c06e.onrender.com/posts")
      .then(function (response) {
        console.log(response);
        setArr(response.data);
        setGif(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (gif) {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <img src={require("./Images/load.gif")} alt="load" />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="main">
        <div>
          <Link to="/">
            <img src= {require('./Images/home.png')} className="home" alt="home"/>
          </Link>
        </div>
        {arr.map((data, index) => {
          
          const base64String = btoa(
            new Uint8Array(data.PostImage.data.data).reduce(function (
              data,
              byte
            ) {
              return data + String.fromCharCode(byte);
            },
            "")
          );
          
          return (
            <>
              <section className="container" key={data._id}>
                <div className="sp-1">
                  <div className="min-nav">
                    <h4 className="name">{data.name}</h4>
                    <MoreHorizIcon />
                  </div>
                  <p className="med">{data.location}</p>
                </div>

                <img
                  className="img"
                  src={`data:image/png;base64,${base64String}`}
                  alt=""
                />
                <div className="sp2">
                  <div className="likesend">
                    <FavoriteBorderIcon />
                    <SendIcon />
                  </div>
                  <p className="med">{data.Date}</p>
                </div>
                <div className="sp3">
                  <p className="med">{data.likes} Likes</p>
                  <h4 className="name">{data.description}</h4>
                </div>
              </section>
            </>
          );
        })}
      </div>
    </>
  );
};
export default Postview;
