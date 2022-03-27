import { useState, Suspense } from "react";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";

import "./styles.css";
import Example from "./CustomProductContainer";
const CustomProductsPage = () => {
  return (
    <div className="">
      <Example></Example> 
    </div>
  );
};
export default CustomProductsPage;
