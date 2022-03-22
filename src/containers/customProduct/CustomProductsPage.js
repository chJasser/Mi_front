import ButtonPrimary from "components/Button/ButtonPrimary";
import React from "react";
import { Helmet } from "react-helmet";
import CustomProduct from "./CustomProduct";

const CustomProductsPage = () => (
  <div className="nc-Page404">
    <Helmet>
      <title>Custom Product || MI Universe</title>
    </Helmet>
    <div className="container relative py-16 lg:py-20">
      {/* HEADER */}
      <header className="text-center max-w-2xl mx-auto space-y-7">
        <h2 className="text-7xl md:text-8xl">🪔</h2>
        <h1 className="text-8xl md:text-9xl font-semibold tracking-widest">
          Our Custom products
        </h1>
        <CustomProduct></CustomProduct>
        <ButtonPrimary href="/" className="mt-4">
          Return Home Page
        </ButtonPrimary>
      </header>
    </div>
  </div>
);

export default CustomProductsPage;
