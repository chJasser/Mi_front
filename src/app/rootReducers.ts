import bookmarkReducer from "./bookmarks/bookmarksSlice";
import postLikesReducer from "./postLikes/postLikes";
import commentLikesReducer from "./commentLikes/commentLikes";
import darkmodeReducer from "./darkmode/darkmode";
import pagesReducer from "./pages/pages";
import mediaRunningReducer from "./mediaRunning/mediaRunning";
import userSlice from "./slices/userSlice";
import Productslice from "./productslice/Productslice";
import carteSlice from "./cartslice/carteSlice";

const rootReducers = {
  bookmark: bookmarkReducer,
  postLike: postLikesReducer,
  darkmode: darkmodeReducer,
  commentLikes: commentLikesReducer,
  pages: pagesReducer,
  mediaRunning: mediaRunningReducer,
  product:Productslice,
  user: userSlice,
  cart: carteSlice,
  
};

export default rootReducers;
