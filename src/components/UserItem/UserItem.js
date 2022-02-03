import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import { useHistory } from "react-router-dom";

import "./UserItem.css";

function UserItem({ dataItem }) {
  let fileURL;
  const history = useHistory();

  const handleUpload = (event) => {
    let file = event.target.files[0];
    console.log(file);

    if (file.type != "application/pdf") {
      console.error(file.name, "is not a pdf file.");
    } else {
      console.log(file.name, "Successful upload");
      fileURL = URL.createObjectURL(file);
    }
  };

  const handleSubmit = () => {
    //Open the URL on new Window
    const pdfWindow = window.open();
    pdfWindow.location.href = fileURL;
  };

  const handleLinkedClick = () => {
    const pdfWindow = window.open();
    pdfWindow.location.href = fileURL;
    history.push("/user");
  };

  const handlePortfolio = () => {
    history.push("/portfolio");
  };

  return (
    <div>
      <div className="head">
        <div className="top">
          <img className="banner" src={dataItem.banner} />
        </div>

        <div className="sub">
          <Stack direction="row" spacing={2}>
            <Avatar
              className="avatar"
              alt="Caleb"
              src={dataItem.picture}
              sx={{ width: 200, height: 200 }}
            />
          </Stack>
          <div>
            <div className="name-pros">
              <h2 className="student-name">{dataItem.name}</h2>
              <p className="pronouns">{dataItem.pronouns}</p>
            </div>
            <p className="email">{dataItem.email}</p>
            <a href={dataItem.linkedin} onClick={handleLinkedClick}>
              Link to LinkedIn
            </a>
          </div>

          <div className="resume">
            <label htmlFor="resume-upload">Upload Resume</label>
            <input
              className="resume-input"
              type="file"
              onChange={handleUpload}
              id="resume-upload"
            />
            <br />
            <button className="resume-button" onClick={handleSubmit}>
              View Resume
            </button>
          </div>
          <div className="portfolio-div">
            <button className="portfolio-button" onClick={handlePortfolio}>
              Portfolio
            </button>
          </div>
        </div>
      </div>

      <div className="about">
        <h3 className="about-text">About</h3>
        <p className="about-data">{dataItem.about}</p>
      </div>
    </div>
  );
}

export default UserItem;
