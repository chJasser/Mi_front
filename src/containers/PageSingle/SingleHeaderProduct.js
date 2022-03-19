import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import React, { FC, useEffect } from "react";
import SingleTitle from "./SingleTitle";
import { SinglePageType } from "./PageSingleTemp3Sidebar";
import PostMeta2 from "components/PostMeta2/PostMeta2";
import SingleMetaAction2 from "./SingleMetaAction2";
import { Helmet } from "react-helmet";
import Badge from "components/Badge/Badge";
import ProductCardLikeAndComment from "components/PostCardLikeAndComment/ProductCardLikeAndComment";
import ProductCardSaveAction from "components/PostCardSaveAction/ProductCardSaveAction";
import PostCardMeta from "components/PostCardMeta/PostCardMeta";

function SingleHeaderProduct(props) {
  const product = props.product;
  const user = props.user;
  useEffect(() => {
    console.log(user);
  }, []);
  const { category, reference, label, marque } = product;
  return (
    <>
      <Helmet>
        <title>product || MI Universe</title>
      </Helmet>
      <div className={`nc-SingleHeader `}>
        <div className="space-y-5">
          <Badge className="" name={category} />
          <SingleTitle mainClass="" title={label} />
          {!!reference && !false && (
            <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
              {reference}
            </span>
          )}
          <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-end space-y-5 sm:space-y-0 sm:space-x-5">
            <PostCardMeta meta={product} />
            <ProductCardLikeAndComment
              className="relative"
              postData={product}
            />
            <ProductCardSaveAction className="relative" postData={product} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleHeaderProduct;
