import React, { FC, ReactNode, useEffect, useState, Suspense } from "react";
import { useParams } from "react-router-dom";
import NcImage from "components/NcImage/NcImage";
import { CommentType } from "components/CommentCard/CommentCard";
import axios from "axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import SingleHeaderProduct from "containers/PageSingle/SingleHeaderProduct";
import ModalPhotos from "./ModalPhotos";
import { changeCurrentPage } from "app/pages/pages";
import { Helmet } from "react-helmet";
import Badge from "components/Badge/Badge";
import SingleTitle from "../PageSingle/SingleTitle";
import ProductCardLikeAndComment from "components/PostCardLikeAndComment/ProductCardLikeAndComment";
import ProductCardSaveAction from "components/PostCardSaveAction/ProductCardSaveAction";
import PostCardMeta from "components/PostCardMeta/PostCardMeta";
import { Link } from "react-router-dom";
import Avatar from "components/Avatar/Avatar";
import convertNumbThousand from "utils/convertNumbThousand";
import twFocusClass from "utils/twFocusClass";
import ProductCardLikeContainer from "containers/PostCardLikeContainer/ProductCardLikeContainer";
import ProductCardCommentBtn from "components/PostCardCommentBtn/ProductCardCommentBtn";
import { removeLike, addNewLike } from "app/productLikes/productLikes";
import ProductCardLikeAction from "components/PostCardLikeAction/ProductCardLikeAction";
import ProductComment from "components/CommentCard/ProductComment";
/**
 *
 *
 */
function PageSingleProduct() {
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState({});
  const [product, setProduct] = useState({});
  const [imgs, setImgs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [openFocusIndex, setOpenFocusIndex] = useState(0);
  const { slug } = useParams();
  const { category, reference, label, productImage, likesCount, marque } =
    product;
  const { userName, phoneNumber, profilePicture } = user;
  const base_url = "http://localhost:5050/";
  const likedProducts = useSelector(
    (state) => state.productLikes.likedProducts
  );
  const className = "";
  const itemClass = "px-3 h-8 text-xs";
  const hiddenCommentOnMobile = true;
  const size = "large";
  const hiddenAvatar = false;
  const onClickLike = () => {};
  const addLikeDB = async () => {
    await axios
      .put(`/products/add-like/${product._id}`)
      .then((response) => {
        console.log(response.data.success);
      })
      .catch((err) => {
        console.log(err.response.data.success);
      });
    dispatch(addNewLike(product));
    setProduct({
      ...product,
      likesCount: product.likesCount + 1,
      isLiked: true,
    });
  };
  const removeLikeDB = async () => {
    await axios
      .put(`/products/remove-like/${product._id}`)
      .then((response) => {
        console.log(response.data.success);
      })
      .catch((err) => {
        console.log(err.response.data.success);
      });
    dispatch(removeLike(product._id));
    setProduct({
      ...product,
      likesCount: product.likesCount - 1,
      isLiked: false,
    });
  };

  const handleCLickLike = () => {
    if (!isLiked(product._id)) {
      addLikeDB();
    } else {
      removeLikeDB();
    }
  };

  const isLiked = () => {
    var productsIds = [];
    likedProducts.forEach((product) => {
      productsIds.push(product._id);
    });
    return productsIds.includes(product._id);
  };
  useEffect(() => {
    axios
      .get("products/product/" + slug)
      .then((response) => {
        setProduct(response.data);
        setImgs(response.data.productImage);
        axios
          .get("product_reviews/get-prod-reviews/" + slug)
          .then((response) => {
            setReviews(response.data.reviews);
            console.log(response.data.reviews);
          })
          .catch((error) => {
            console.error(error);
          });
        axios
          .get(`users/${response.data.seller}`)
          .then((user) => {
            setUser(user.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleOpenModal = (index) => {
    setIsOpen(true);
    setOpenFocusIndex(index);
  };
  const handleCloseModal = () => setIsOpen(false);
  const photos = product.productImage;

  return (
    <>
      <div
        className={`nc-PageSingleGallery pt-8 lg:pt-16 `}
        data-nc-id="PageSingleGallery"
      >
        <header className="container rounded-xl">
          <Helmet>
            <title>product || MI Universe</title>
          </Helmet>
          <div className={`nc-SingleHeader `}>
            <div className="space-y-5">
              <Badge className="" name={category} />
              <SingleTitle mainClass="" title={label} />
              {!!reference && !false && (
                <span className="block text-base text-neutral-600 md:text-lg dark:text-neutral-600 pb-1">
                  {reference}
                </span>
              )}
              <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-end space-y-5 sm:space-y-0 sm:space-x-5">
                <div
                  className={`nc-PostCardMeta inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 ${
                    size === "normal" ? "text-xs" : "text-base"
                  } ${className}`}
                  data-nc-id="PostCardMeta"
                >
                  <Suspense fallback={<h1>Loading profile...</h1>}>
                    <Link
                      to="#"
                      className="relative flex items-center space-x-2"
                    >
                      {!hiddenAvatar && (
                        <Avatar
                          radius="rounded-full"
                          sizeClass="h-10 w-10 text-xl"
                          imgUrl={base_url + profilePicture}
                          userName={userName}
                        />
                      )}
                      <span className="block text-neutral-900 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
                        {userName}
                      </span>
                      <span className="block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium"></span>
                    </Link>
                  </Suspense>
                  <>
                    <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
                      {phoneNumber}
                    </span>
                  </>
                </div>
                <span className="block text-neutral-600 hover:text-teal dark:text-neutral-300 dark:hover:text-white font-medium">
                  {marque} {label} for just : {product.price}$
                </span>

                <div
                  className={`nc-PostCardLikeAndComment flex items-center space-x-2 ${className}`}
                  data-nc-id="PostCardLikeAndComment"
                >
                  <button
                    className={`nc-PostCardLikeAction relative min-w-[68px] flex items-center rounded-full leading-none group transition-colors ${className} ${twFocusClass()} ${
                      isLiked()
                        ? "text-rose-600 bg-rose-50 dark:bg-rose-100"
                        : "text-neutral-700 bg-neutral-50 dark:text-neutral-200 dark:bg-neutral-800 hover:bg-rose-50 dark:hover:bg-rose-100 hover:text-rose-600 dark:hover:text-rose-500"
                    }`}
                    onClick={() => handleCLickLike()}
                    title="Liked"
                    data-nc-id="PostCardLikeAction"
                  >
                    <svg
                      width="24"
                      height="24"
                      fill={isLiked ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M11.995 7.23319C10.5455 5.60999 8.12832 5.17335 6.31215 6.65972C4.49599 8.14609 4.2403 10.6312 5.66654 12.3892L11.995 18.25L18.3235 12.3892C19.7498 10.6312 19.5253 8.13046 17.6779 6.65972C15.8305 5.18899 13.4446 5.60999 11.995 7.23319Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>

                    <span
                      className={`ml-1 ${
                        isLiked()
                          ? "text-rose-600"
                          : "text-neutral-900 dark:text-neutral-200"
                      }`}
                    >
                      {convertNumbThousand(product.likesCount)}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-2 my-10">
            <div
              className="col-span-2 row-span-2 relative rounded-xl overflow-hidden cursor-pointer"
              onClick={() => handleOpenModal(0)}
            >
              <img
                containerClassName="absolute inset-30"
                className="object-cover w-100 h-100 rounded-xl"
                src={base_url + imgs[0]}
              />
              <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
            </div>
            <div
              className="absolute hidden md:flex md:items-center md:justify-center right-3 bottom-3 px-4 py-2 rounded-full bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
              onClick={() => handleOpenModal(0)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <span className="ml-2 text-neutral-800 text-sm font-medium">
                Show all photos
              </span>
            </div>
          </div>
        </header>
        <div className=""></div>
        <div className="container">
          {reviews.map((review) => (
            <div className=" gap-2 my-10">
              <ProductComment key={review._id} review={review} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PageSingleProduct;
