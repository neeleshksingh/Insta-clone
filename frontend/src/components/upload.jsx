import "./app.css";
import GifLoader from 'react-gif-loader';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Upload = () => {
  const [image, setImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imgurl, setImgurl] = useState("");
  const [fileName, setFileName] = useState({
    name: "",
    description: "",
    location: "",
    PostImage: null,
  });
  const [error, setError] = useState({});

  const nav = useNavigate();

  useEffect(() => {
    if (imgurl) {
      console.log("imgurl: ", imgurl);
      fetch("https://instagram-clone-app-nf2h.onrender.com/posts", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          PostImage: imgurl,
          name: fileName.name,
          description: fileName.description,
          location: fileName.location,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            alert('Your Post has been uploaded successfully')
            nav("/postview");
          }
        })
        .catch((e) => console.log(e));
    }
  }, [imgurl]);

  const ImageUpload = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "images");
    data.append("cloud_name", "neeleshks");
    fetch("https://api.cloudinary.com/v1_1/neeleshks/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setImgurl(data.secure_url))
      .catch((e) => console.log(e));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!fileName.PostImage) {
      setError({ ...error, PostImage: "Photo is required" });
      return;
    } else if (!fileName.name) {
      setError({ ...error, name: "Author field is required" });
      return;
    } else if (!fileName.location) {
      setError({ ...error, location: "Location field is required" });
      return;
    } else if (!fileName.description) {
      setError({ ...error, description: "Description field is required" });
      return;
    }
    setIsSubmitting(true);
    ImageUpload(event);
  };

  return (
    <>
      <div className="formarea">
        <div className="form">
          <form onSubmit={handleFormSubmit}>
            <div className="brwse">
              <input
                type="text"
                id="choose"
                value={fileName.PostImage ? fileName.PostImage.name : ""}
                placeholder={
                  fileName.PostImage
                    ? fileName.PostImage.name
                    : "No file selected"
                }
                readOnly
              />
              <label htmlFor="file" className="Browse">
                Browse
              </label>
              <input
                type="file"
                id="file"
                accept="image/*"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  setFileName({ ...fileName, PostImage: e.target.files[0] });
                  setError({ ...error, PostImage: "" });
                }}
              />
              {error.PostImage && <h4 className="req">{error.PostImage}</h4>}
            </div>

            <br />
            <div className="auth">
              <input
                type="text"
                placeholder="Author"
                name="name"
                className="loca"
                value={fileName.name}
                onChange={(e) => {
                  setFileName({ ...fileName, name: e.target.value });
                  setError({ ...error, name: false });
                }}
              />
              {error.name && <h4 className="req">*Author field is required</h4>}
              <input
                type="text"
                placeholder="Location"
                name="location"
                value={fileName.location}
                onChange={(e) =>
                  setFileName({ ...fileName, location: e.target.value })
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
              name="description"
              value={fileName.description}
              onChange={(e) =>
                setFileName({ ...fileName, description: e.target.value })
              }
              id="description"
            />
            {error.description && (
              <h4 className="req">*Description field is required</h4>
            )}
            <div className="post-btn">
              <button id="post" type="submit">
                Post
              </button>
            </div>
          </form>
          <GifLoader loading={isSubmitting} />
        </div>
      </div>
    </>
  );
};

export default Upload;