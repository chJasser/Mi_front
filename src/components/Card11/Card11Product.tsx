import React, { FC, useState } from "react";
import PostCardSaveAction from "components/PostCardSaveAction/PostCardSaveAction";
import { ProductDataType } from "data/types";
import ProductFeaturedMedia from "components/PostFeaturedMedia/ProductFeaturedMedia";
import PostCardLikeAndComment from "components/PostCardLikeAndComment/PostCardLikeAndComment";
import Badge from "components/Badge/Badge";
import PostCardMeta from "components/PostCardMeta/PostCardMeta";
import NcModalprod from "components/NcModal/NcModalprod";
import { useDispatch } from "react-redux";
import ProductCardLikeAndComment from "components/PostCardLikeAndComment/ProductCardLikeAndComment";
import ProductCardSaveAction from "components/PostCardSaveAction/ProductCardSaveAction";
import ModalProduct from "components/ModalProduct/ModalProduct";
export interface Card11Props {
  className?: string;
  product;
  ratio?: string;
  hiddenAuthor?: boolean;
}

const Card11Product: FC<Card11Props> = ({
  className = "h-full",
  product,
  hiddenAuthor = false,
  ratio = "aspect-w-4 aspect-h-3",
}) => {
  const dispatch = useDispatch();

  const { label, createdAt, category, price, productImage } = product;

  const date = createdAt.substring(0, 10);

  const [isHover, setIsHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`nc-Card11 relative flex flex-col group [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="Card11"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      //
    >
      <div
        className={`block flex-shrink-0 relative w-full rounded-t-xl overflow-hidden ${ratio}`}
      >
        <div>
          <ProductFeaturedMedia product={product} isHover={isHover} />
        </div>
      </div>
      {/* <Link to={href} className="absolute inset-0"></Link> */}
      <span className="absolute top-3 inset-x-3">
        <Badge name={category} />
      </span>

      <div className="p-4 flex flex-col flex-grow space-y-3">
        <PostCardMeta meta={product} />

        <span className="text-xs text-neutral-500">{date}</span>

        <h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100 ">
          {label + " " + price + " $"}
        </h2>
        <div className="flex items-end justify-between mt-auto">
          <ProductCardLikeAndComment className="relative" postData={product} />
          <ProductCardSaveAction className="relative" postData={product} />

          <ModalProduct product={product} open={isOpen} />
        </div>
      </div>
    </div>
  );
};

export default Card11Product;
