import "./app.css";
import { Link } from "react-router-dom";


const Nav = () => {
  return (
    <>
    <div className="nav">
        <Link to="/postview" className="postv">
          <span className="sp1">
            <img src={require('./Images/logo.png')} className='logo' alt="logo" />
            <h1 id="logo">Instaclone</h1>
          </span>
        </Link>

        <Link to="/upload">
            <img src={require('./Images/cam.png')} alt="camera" className="logo cam" />
        </Link>
      </div>  
      <hr />
    </>
  );
};
export default Nav;
