import { removeLike, addNewLike } from "app/productLikes/productLikes";
import { useDispatch, useSelector } from "react-redux";
import ProductCardLikeAction from "components/PostCardLikeAction/ProductCardLikeAction";
import axios from "../../axiosInstance";
import { useState, useEffect } from "react";
const ProductCardLikeContainer = (props) => {
  const { productId, onClickLike, ...args } = props;
  const [product, setProduct] = useState(props.product);
  const dispatch = useDispatch();
  const likedProducts = useSelector(
    (state) => state.productLikes.likedProducts
  );
  
  const addLikeDB = async () => {
    await axios
      .put(`/products/add-like/${productId}`)
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
      .put(`/products/remove-like/${productId}`)
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
    if (!isLiked(productId)) {
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
    return productsIds.includes(productId);
  };

  return (
    <ProductCardLikeAction
      {...args}
      isLiked={isLiked()}
      likeCount={product.likesCount}
      postId={productId}
      onClickLike={handleCLickLike}
    />
  );
};
export default ProductCardLikeContainer;
