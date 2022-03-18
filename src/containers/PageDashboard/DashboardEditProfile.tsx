import ButtonPrimary from "components/Button/ButtonPrimary";
import Input from "components/Input/Input";
import Label from "components/Label/Label";
import React, { useState } from "react";
import Image from "react-bootstrap/Image";
import img from "../../images/logo.png";
import UploadImage from "./UploadImage";
const DashboardEditProfile = () => {
  const [image, setImage] = useState("");
  const updateImage = (image) => {
    setImage(image);
  };
  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      <div style={{ textAlign: "center" }}>
        <Image
          style={{
            height: 200,
            width: 200,
          }}
          src={img}
          roundedCircle
          className="mx-auto mb-5"
        />
        <UploadImage refrechFunction={updateImage} />
      </div>
      <form className="grid md:grid-cols-2 gap-6" action="#" method="post">
        <label className="block">
          <Label>First name</Label>
          <Input placeholder="Example Doe" type="text" className="mt-1" />
        </label>
        <label className="block">
          <Label>Last name</Label>
          <Input placeholder="Doe" type="text" className="mt-1" />
        </label>
        <label className="block">
          <Label>Current password</Label>
          <Input placeholder="***" type="password" className="mt-1" />
        </label>
        <label className="block">
          <Label>New password</Label>
          <Input type="password" className="mt-1" />
        </label>
        <label className="block md:col-span-2">
          <Label> Email address</Label>
          <Input
            type="email"
            placeholder="example@example.com"
            className="mt-1"
          />
        </label>
        <ButtonPrimary className="md:col-span-2" type="submit">
          Update profile
        </ButtonPrimary>
      </form>
    </div>
  );
};

export default DashboardEditProfile;
