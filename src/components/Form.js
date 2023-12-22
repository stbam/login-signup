import React from "react";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";

function Form() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("image", file);

    fetch("https://scribblebook-backend.onrender.com/image", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    setName("");
    setDesc("");
    setFile(null);
    fileInputRef.current.value = "";
  };
  return (
    <>
      <form onSubmit={handleSubmit} enctype="multipart/form-data">
        <div style={{ marginBottom: "10px" }}>
          <label
            htmlFor="name"
            style={{ fontWeight: "bold", position: "absolute" }}
          >
            Image Title
          </label>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-start",
            }}
          >
            <Link id="link" to="/">
              Logout
            </Link>
          </div>

          <input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            name="name"
            onChange={handleNameChange}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="desc" style={{ fontWeight: "bold" }}>
            Image Description
          </label>
          <textarea
            id="desc"
            name="desc"
            value={desc}
            rows="2"
            placeholder="Description"
            required
            onChange={handleDescChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          ></textarea>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ marginBottom: "10px" }}>
              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="image" style={{ fontWeight: "bold" }}>
                  Upload Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  required
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{}} // Add styles here if necessary
                />
              </div>
              <Link
                to="/home"
                style={{ textDecoration: "none", color: "#007bff" }}
              >
                Go back to ScribbleBook
              </Link>
            </div>
          </div>
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px",
            cursor: "pointer",
            borderRadius: "15px",
            width: "300px",
            height: "50px",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default Form;
