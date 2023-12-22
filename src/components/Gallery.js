import React, { useEffect, useState } from "react";
import Form from "./Form";
import axios from "axios";
import { set } from "mongoose";

const Gallery = () => {
  const [items, setItems] = useState(null);
  useEffect(() => {
    axios
      .get("https://scribblebook-backend.onrender.com/image")
      .then((res) => {
        setItems(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  items && console.log(items[0]);
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f0f0f0",
        color: "#333",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#007bff" }}>Gallery</h1>
      <hr />
      <div style={{ margin: "20px" }}>
        <Form></Form>
      </div>
      <hr />
      <h1 style={{ textAlign: "center", color: "#007bff" }}>Your Images</h1>
      <div>
        <div>
          {items &&
            items.map((image, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", gap: "20px" }}>
                  <img
                    src={`data:image/${
                      image.img.contentType
                    };base64,${Buffer.from(image.img.data).toString("base64")}`}
                    style={{ width: "30%", height: "auto", minWidth: "25%" }}
                  />

                  <div
                    style={{
                      fontSize: "25px",
                      backgroundColor: "whitesmoke",
                      borderRadius: "10px",
                      minWidth: "70%",
                    }}
                  >
                    <h5
                      style={{
                        backgroundColor: "rgb(143, 141, 141)",
                        color: "rgb(21, 63, 100)",
                      }}
                    >
                      {image.name}
                    </h5>
                    <p>{image.desc}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
