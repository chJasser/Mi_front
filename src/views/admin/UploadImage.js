import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "../../axiosInstance";

import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { useSelector } from "react-redux";
import { userId } from "app/slices/userSlice";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";

import { v4 } from "uuid";
import { storage } from "FireBase";
const UploadImage = (props) => {
  const [image, setImage] = useState("");
  const id = useSelector(userId);
  const [imageUpload, setImageUpload] = useState(null);


  const onDrop = (file) => {

    if (file[0] == null) return;
    const imageRef = ref(storage, `images/${file[0].name + v4()}`);
    uploadBytes(imageRef, file[0]).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {

        var formData = new FormData();


        const config = {
          header: { "content-type": "multipart/form-data" },
        };
        console.log(url.toString())
        formData.append("url", url.toString());
        formData.append("picture", file[0]);

        axios
          .put(`/users/updateimg/${id}`, formData, config)
          .then((response) => {
            if (response.data.success) {
              setImage(url.toString());
              props.refrechFunction(url.toString());
            } else {
              alert("Failed to save the image in server");
            }
          })
          .catch((err) => {
            alert("Only png ,jpeg or jpg images are allowed !");
          });

      });
    });

  };

  return (
    <div>
      <Dropzone
        accept=".png, .jpg, .jpeg"
        image={image}
        onDrop={onDrop}
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
        multiple={false}
        maxSize={8000000}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              display: "flex",
              marginTop: 15,
              alignItmes: "center",
              justifyContent: "center",
              borderRadius: "50%",
              height: 35,
              width: 35,
              outline: "none",
              cursor: "pointer",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <PhotoCamera
              style={{ outline: "none", fontSize: "2rem", color: "#292b2c" }}
            />
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default UploadImage;
