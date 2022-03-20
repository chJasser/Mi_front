import NcBookmark from "components/NcBookmark/NcBookmark";
import { addBookmark, removeBookmark } from "app/productLikes/productLikes";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axiosInstance";
import{getBookmarkedProducts} from"../../app/productLikes/productLikes"
import { useEffect, useState } from "react";

const ProductBookmarkContainer = (props) => {
  const [product, setProduct] = useState(props.product);
  const dispatch = useDispatch();
  const bookmarkedProducts = useSelector(
    (state) => state.productLikes.bookmarkedProducts
  );

  const addBookMarkDB = async () => {
    await axios
      .put(`/products/add-bookmark/${product._id}`)
      .then((response) => {
        console.log(response.data.success);
      })
      .catch((err) => {
        console.log(err.response.data.success);
      });
    dispatch(addBookmark(product));
    
  };
  const removeBookMarkDB = async () => {
    await axios
      .put(`/products/remove-bookmark/${product._id}`)
      .then((response) => {
        console.log(response.data.success);
      })
      .catch((err) => {
        console.log(err.response.data.success);
      });
    dispatch(removeBookmark(product._id));
    // setProduct({
    //   ...product,
    //   likesCount: product.likesCount - 1,
    //   isLiked: false,
    // });
  };

  const isBookmarked = () => {
    var productsIds = [];
    if (!bookmarkedProducts) return false;
    else {
    
      bookmarkedProducts.forEach((product) => {
        productsIds.push(product._id);
      });
      return productsIds.includes(product._id);
    }
  };

  const handleClickBookmark = () => {
    if (!isBookmarked()) {
      addBookMarkDB()
    } else {
      removeBookMarkDB();
    }
  };

  return (
    <NcBookmark
      onClick={handleClickBookmark}
      isBookmarked={isBookmarked()}
      {...props}
    />
  );
};

export default ProductBookmarkContainer;
