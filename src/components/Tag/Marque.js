import { TaxonomyType } from "data/types";
import React, { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axiosInstance";

const Marque = ({ className = "", tag, hideCount = false, nbr }) => {
    const [nbrr , setNbr] = useState(0)
    useEffect(() => {
        axios
          .get(`products/marque?marque=${tag}`)
          .then((res) => {
            console.log(res);
            console.log(res.data.length);
            // if (res.data.length !== 0) {
            //   setImage(base_url + res.data[0].productImage[0]);
            // }
            setNbr(res.data.length);
            //setNbrParCategory(res.data.length);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }, []);
  return (
    <a
      className={`nc-Tag inline-block bg-white text-sm text-neutral-600 py-2 px-3 rounded-lg border border-neutral-100 md:py-2.5 md:px-4 dark:bg-neutral-700 dark:border-neutral-700 hover:border-neutral-200 dark:hover:border-neutral-6000 ${className}`}
      data-nc-id="Tag"
      href ={`/archive/the-demo-archive-slug?marque=${tag}`}
    >
    
      {`${tag}`}
      {tag && (
        <span className="text-xs font-normal"> ({nbrr})</span>
      )}
    </a>
  );
};

export default Marque;
