import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "../../axiosInstance";

import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { useSelector } from "react-redux";
import { userId } from "app/slices/userSlice";
const UploadImage = (props) => {
    const [image, setImage] = useState("");
    const id = useSelector(userId);

    const onDrop = (file) => {
        console.log("jasser")
        let formData = new FormData();
        const config = {
            header: { "content-type": "multipart/form-data" },
        };

        formData.append("file", file[0]);
        axios
            .put(`/users/updateimg/${id}`, formData, config)
            .then((response) => {
                if (response.data.success) {
                    setImage(response.data.image);
                    props.refrechFunction(response.data.image);

                } else {
                    alert("Failed to save the image in server");
                }
            });
    };

    return (
        <div>
            <Dropzone
                accept="image/*"
                image={image}
                onDrop={onDrop}
                multiple={false}
                maxSize={8000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div
                        style={{
                            display: "flex",
                            marginTop: 15,
                            marginBottom: 5,
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
                            style={{ outline: "none", fontSize: "2rem", color: "red" }}
                        />
                    </div>
                )}
            </Dropzone>
        </div>
    );
};

export default UploadImage;
