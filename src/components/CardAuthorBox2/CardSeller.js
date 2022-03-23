import React, { FC, useEffect, useState } from "react";
import { PostAuthorType } from "data/types";
import { ArrowRightIcon } from "@heroicons/react/solid";
import { Link, NavLink } from "react-router-dom";
import Avatar from "components/Avatar/Avatar";
import NcImage from "components/NcImage/NcImage";
import axios from "../../../src/axiosInstance";
import {populateProducts} from "../../app/productslice/Productslice"
import { useDispatch, useSelector } from "react-redux";

const CardSeller = ({ className = "", seller, id, author }) => {
  const base_url = "http://localhost:5050/";
  // const { userName, email, profilePicture, phoneNumber, about } = seller;
  //console.log(profilePicture);
  //const {bgImage} = author;
  const images = [
    "https://wallpaperaccess.com/full/5687753.jpg",
    "https://cdn.dribbble.com/users/45782/screenshots/11295763/media/ad6d879364303a9dc910213b2fee981b.jpg?compress=1&resize=400x300",
    "https://media.istockphoto.com/vectors/bright-colorful-abstract-blurry-background-vector-id1263930234?k=20&m=1263930234&s=612x612&w=0&h=GdYcs5rYd8XpoX0EpXNt9RVYx1rYwafbhVy8HSb5uUw=",
  ];

  const [nbr, setNbr] = useState(0)
  const [sel, setSel] = useState({})
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const getNbrProducts = () => {
    axios.get(`/products/NbrProductsPerSeller/${id}`)
    .then((nbr) => {
        setNbr(nbr.data);
      })
      .catch((err) => console.log(err.message));
  };
  const getseller = () => {
    axios
      .get(`/users/${seller.user}`)
      .then((s) => setSel(s.data))
      .catch((err) => console.log(err.message));
  };

  const filterProductsBySeller = () => {
    axios
      .get(`products/productsPerSeller/${seller._id}`)
      .then((products) => setProducts(products.data))
      .catch(err => console.log(err.message));
  }

  useEffect(() => {
    getNbrProducts();
    getseller();
  }, []);

  return (
    <div
      //to={href}
      className={`nc-CardAuthorBox2 flex flex-col overflow-hidden [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="CardAuthorBox2"
    >
      <div className="relative flex-shrink-0 ">
        <div>
          <NcImage
            containerClassName="flex aspect-w-7 aspect-h-5 sm:aspect-h-6 w-full h-0"
            src={images[Math.floor(Math.random() * images.length)]}
          />
        </div>
        <div className="absolute top-3 inset-x-3 flex">
          <div to="?seller"
          onClick={() => filterProductsBySeller()} className=" py-1 px-4 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center leading-none text-xs font-medium">
            {nbr} Products <ArrowRightIcon className="w-5 h-5 text-yellow-600 ml-3" />
          </div>
        </div>
      </div>

      <div className="-mt-8 m-8 text-center">
        <Avatar
          containerClassName="ring-2 ring-white"
          sizeClass="w-16 h-16 text-2xl"
          radius="rounded-full"
          imgUrl={base_url + sel.profilePicture}
          userName={sel.userName}
        />
        <div className="mt-3">
          <h2 className={`text-base font-medium`}>
            <span className="line-clamp-1">{sel.userName}</span>
          </h2>
          <span
            className={`block mt-1 text-sm text-neutral-500 dark:text-neutral-400`}
          >
            {sel.email}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardSeller;
