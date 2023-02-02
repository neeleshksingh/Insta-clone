import "./app.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Upload = () => {
  const [canSubmit, setCanSubmit] = useState(true);
  const [error, setError] = useState({
    name: false,
    description: false,
    location: false,
  });
  
  const navigate = useNavigate();
  const [fileName, setFileName] = useState({name: "", description: "", location: "", PostImage: null});

  const handeldata = async (e) => {
    e.preventDefault();
    if (!fileName.name && !fileName.description && !fileName.location && !fileName.PostImage) {
      setError({ name: true, location: true, description: true , PostImage: true });
    } else {
      if (!fileName.name && !fileName.description) {
        setError({ name: true, description: true });
      } else if (!fileName.name && !fileName.location) {
        setError({ name: true, location: true });
      } else if (!fileName.name && !fileName.PostImage) {
        setError({ name: true, PostImage: true });
      } else if (!fileName.location && !fileName.description) {
        setError({ location: true, description: true });
      } else if (!fileName.location && !fileName.PostImage) {
        setError({ location: true, PostImage: true });
      } else if (!fileName.description && !fileName.PostImage) {
        setError({ description: true, PostImage: true });
      } else if (!fileName.name) {
        setError({ ...error, name: true });
      } else if (!fileName.location) {
        setError({ ...error, location: true });
      } else if (!fileName.description) {
        setError({ ...error, description: true });
      } else if (!fileName.PostImage) {
        setError({ ...error, PostImage: true });
      }
    }
  };
  
  const handleform = async (e) => {
    e.preventDefault();
    let verify = fileName.name.length && fileName.description.length && fileName.location.length;
    try {
      if (verify) {
        let filename = new FormData();
        filename.append("photu", fileName.PostImage);
        filename.append("name", fileName.name);
        filename.append("location", fileName.location);
        filename.append("description", fileName.description);

        let data = await axios.post("https://instaclone-app-c06e.onrender.com/posts", filename);
        if (data) {
          setFileName({name: "", description: "", location: "", PostImage: null});
          navigate("/postview");
        }
      }
    } catch (err) {
      alert(err.message);
    }
  };
  const handleChange = (event) => {
    setFileName({...fileName, PostImage: event.target.files[0]});
  };
  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setCanSubmit(false);
    
    setTimeout(() => {
      setCanSubmit(true);
    }, 2000);
  };

  return (
    <>
      <div className="formarea">
        <div className="form">
          <form method="POST" encType="multipart/form-data">
            <div className="brwse">
              <input
                type="text"
                id="choose"
                value={fileName.PostImage ? fileName.PostImage.name : ""}
                placeholder={fileName.PostImage ? fileName.PostImage.name : "No file selected"}
                readOnly
              />
              <label htmlFor="file" className="Browse">
                Browse
              </label>
              <input
                type="file"
                name="photu"
                id="file"
                accept="image/png, image/jpeg"
                onChange={handleChange}
              />
               {error.PostImage && <h4 className="req">*Photo is required</h4>} 
            </div>

            <br />
            <div className="auth">
              <input
                type="text"
                placeholder="Author"
                name={fileName.name}
                className="loca"
                onChange={(e) =>
                  {setFileName({ ...fileName, name: e.target.value })}
                }
              />
              {error.name && <h4 className="req">*Author field is required</h4>} 
              <input
                type="text"
                placeholder="Location"
                name={fileName.location}
                onChange={(e) =>
                  {setFileName({ ...fileName, location: e.target.value })}
                }
                className="loca"
              />
              {error.location && (
                <h4 className="req">*Location field is required</h4>
              )}
            </div>
            <br />
            <textarea
              placeholder="Description"
              name={fileName.description}
              onChange={(e) =>
                {setFileName({ ...fileName, description: e.target.value })}
              }
              id="description"
            />
            {error.description && (
              <h4 className="req">*Description field is required</h4>
            )}
            <div className="post-btn">
            <button
              id="post" type="submit"
              onClick={(e) => [handleform(e),handeldata(e),submit(e)]}
            >
              Post
            </button>
            </div>
            
          </form>
        </div>
      </div>
    </>
  );
};
export default Upload;
