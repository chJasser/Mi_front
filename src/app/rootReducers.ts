import bookmarkReducer from "./bookmarks/bookmarksSlice";
import postLikesReducer from "./postLikes/postLikes";
import commentLikesReducer from "./commentLikes/commentLikes";
import darkmodeReducer from "./darkmode/darkmode";
import pagesReducer from "./pages/pages";
import mediaRunningReducer from "./mediaRunning/mediaRunning";
import userSlice from "./slices/userSlice";
import Productslice from "./productslice/Productslice";

import carteslics from "../app/cartslice/carteslics";
import productLikeSlice from "../app/productLikes/productLikes";
import productReviewsSlice from "./productReviews/productReviews";
const rootReducers = {
  bookmark: bookmarkReducer,
  postLike: postLikesReducer,
  darkmode: darkmodeReducer,
  commentLikes: commentLikesReducer,
  pages: pagesReducer,
  mediaRunning: mediaRunningReducer,
  product: Productslice,
  user: userSlice,
  productLikes: productLikeSlice,
  productReviews: productReviewsSlice,
  carteslics: carteslics,
};

export default rootReducers;
