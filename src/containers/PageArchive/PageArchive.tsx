import React, { FC, useEffect, useState, Fragment, useRef } from "react";
import ModalCategories from "./ModalCategories";
import ModalMarque from "./ModalMarque";
import { DEMO_POSTS } from "data/posts";
import { PostDataType, TaxonomyType } from "data/types";
import { DEMO_CATEGORIES, DEMO_TAGS } from "data/taxonomies";
import Pagination from "components/Pagination/Pagination";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ArchiveFilterListBox from "components/ArchiveFilterListBox/ArchiveFilterListBox";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import NcImage from "components/NcImage/NcImage";
import Card11 from "components/Card11/Card11";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import SectionGridCategory from "components/SectionGridCategoryBox/SectionGridCategory";
import ButtonSecondary from "components/Button/ButtonSecondary";
import SectionSliderNewAuthors from "components/SectionSliderNewAthors/SectionSliderNewAuthors";
import { DEMO_AUTHORS } from "data/authors";
import axios from "axiosInstance";
import Card11Product from "components/Card11/Card11Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, populateProducts } from "app/productslice/Productslice";
import {
  getLikedProducts,
  getBookmarkedProducts,
} from "app/productLikes/productLikes";
import SearchDropdown from "../../components/Header/SearchDropdown";
import { Popover, Transition } from "@headlessui/react";
import Input from "components/Input/Input";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import {RootState} from "../../app/store"
import {filterByMarque, filterByCategory} from "../../app/filterSlice/filterSlice"

import Modalcart from "./Modalcart";
//import ModalCategoriesprod from "./Modalcategoriesprod";
export interface PageArchiveProps {
  className?: string;
}
// Tag and category have same data type - we will use one demo data
const posts: PostDataType[] = DEMO_POSTS.filter((_, i) => i < 16);

const PageArchive: FC<PageArchiveProps> = ({ className = "" }) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const filter = useSelector((state: RootState) => state.filterSlice)
  console.log(filter)
  const [category, setCategory] = useState("");
  const [marque, setMarque] = useState("");
  const path = "http://localhost:3000/archive/the-demo-archive-slug";
  const myRef = useRef(null);
  const inputRef = React.createRef<HTMLInputElement>();
  const [value, setValue] = React.useState([0, 100]);
  let min = value[0] * 100;
  let max = value[1] * 100;
  
  const rangeSelector = (event, newValue) => {
    setValue(newValue);
    axios.get(`products/price?min=${min}&max=${max}`).then((res) => {
      setProducts(res.data);
    });
  };

  const executeScroll = () => myRef.current.scrollIntoView();
  let inputHandler = (e) => {
    if (e.target.value) {
      axios.get(`products/search?label=${e.target.value}`).then((res) => {
        console.log(res.data);
        setProducts(res.data);
      });
    } else {
      axios.get("products/filter").then((res) => {
        setProducts(res.data.products);
      });
    }
  };

  const filterCategory = () => {
    //setCategory(filter.category)
    axios
      .get(`products/fiter?category=${filter.category}`)
      .then((res) => {
        executeScroll();
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

 // setInterval(() => {filterCategory()}, 10000);

  const filterMarque = () => {
    //setMarque(filter.marque)
    axios
      .get(`products/marque?marque=${filter.marque}`)
      .then((res) => {
        executeScroll();
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const getAllProduct = () => {
    axios
      .get("products/filter")
      .then((res) => {
        console.log(res.data.products)
        dispatch(populateProducts(res.data.products))
        setProducts(res.data.products);
      })
      .catch(err => console.log(err.message))
  }


  useEffect(() => {
    axios
      .get("products/liked-products")
      .then((response) => {
        console.log(response);
        dispatch(getLikedProducts(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("products/bookmarked-products")
      .then((response) => {
        console.log(response);
        dispatch(getBookmarkedProducts(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
      getAllProduct();
    
  }, [dispatch]);

  

  
  const PAGE_DATA: TaxonomyType = DEMO_CATEGORIES[0];

  const FILTERS = [
    { name: "Most Recent" },
    { name: "Curated by Admin" },
    { name: "Most Appreciated" },
    { name: "Most Discussed" },
    { name: "Most Viewed" },
  ];

  return (
    
    <div
      className={`nc-PageArchive overflow-hidden ${className}`}
      data-nc-id="PageArchive"
    >
      <Helmet>
        <title>Our Products || MI Universe</title>
      </Helmet>


      {/* HEADER */}
      <div className="w-full px-2 xl:max-w-screen-2xl mx-auto">
        <div className="rounded-3xl relative aspect-w-16 aspect-h-16 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-6 overflow-hidden ">
          <NcImage
            containerClassName="absolute inset-0"
            src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
            <h2 className="inline-block align-middle text-5xl font-semibold md:text-7xl ">
              {PAGE_DATA.name}
            </h2>
            <span className="block mt-4 text-neutral-300">
              {PAGE_DATA.count} Articles
            </span>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}
      <div className="relative py-5 container">
        <BackgroundSection />
        <a onClick={() => {
          //dispatch(filterByCategory(filter.category))
          filterCategory()}}><SectionGridCategory /></a>
      </div>
      <div
        ref={myRef}
        className="container py-16 lg:py-28 space-y-16 lg:space-y-28"
      >
        <div>
          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
            <div className="flex space-x-2.5">
              {/*<ModalCategories categories={DEMO_CATEGORIES} />*/}
              {/*<ModalCategoriesprod/>*/}
              <a onClick={() => filterMarque()}><ModalMarque /></a>
              <Modalcart/>
            </div>
            <div className="block my-4 border-b w-full border-neutral-100 sm:hidden"></div>
            <div className="flex justify-end">
              <ArchiveFilterListBox lists={FILTERS} />
            </div>
          </div>
          {/* LOOP ITEMS */}

          {/* <div>
            <h1>Marque : </h1>
            yamaha: <input type="checkbox" />
            shure: <input type="checkbox" />
            gibson: <input type="checkbox" />
            harman: <input type="checkbox" />
            fender: <input type="checkbox" />
            steinway: <input type="checkbox" />
            roland: <input type="checkbox" />
          </div> */}

          <div
            style={{
              margin: "auto",
              display: "block",
              width: "fit-content",
            }}
          >
            <h3>What is your budget?</h3>
            <Slider
              value={value}
              onChange={rangeSelector}
              valueLabelDisplay="auto"
            />
            Your range of Price is between {min}$ and {max}$ 
          </div>

          

          <React.Fragment>
            <Popover className="relative">
              {({ open }) => {
                if (open) {
                  setTimeout(() => {
                    inputRef.current?.focus();
                  }, 100);
                }

                return (
                  <>
                    <Popover.Button className="text-2xl md:text-[28px] w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center">
                      <i className="las la-search"></i>
                    </Popover.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel
                        static
                        className="absolute right-0 z-10 w-screen max-w-sm mt-3"
                      >
                        <form action="" method="POST" className="relative">
                          <i className="las la-search absolute left-3 top-1/2 transform -translate-y-1/2 text-xl opacity-60"></i>
                          <Input
                            ref={inputRef}
                            type="search"
                            placeholder="Search by Label"
                            className="pl-10"
                            id="outlined-basic"
                            onChange={inputHandler}
                          />
                          <input type="submit" hidden value="" />
                        </form>
                      </Popover.Panel>
                    </Transition>
                  </>
                );
              }}
            </Popover>
          </React.Fragment>
          <ButtonPrimary onClick={() => getAllProduct()}>Get All Porduct</ButtonPrimary>
          {/* <div className="search">
        <input
          id="outlined-basic"
          type="search"
          onChange={inputHandler}
          placeholder="Search By Label"
        />
        </div> */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
            {products.map((product) => (
              <Card11Product key={product._id} product={product} />
            ))}
          </div>

          {/* <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
            {products.map((product) => (
              <Card11Product key={product._id} product={product} />
            ))}
          </div> */}
          {/* PAGINATIONS */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination />
            <ButtonPrimary>Show me more</ButtonPrimary>
          </div>
        </div>

        {/* MORE SECTIONS */}
        {/* === SECTION 5 === */}
        {/* <div className="relative py-16">
          <BackgroundSection /> */}
        {/* <SectionGridCategoryBox
            categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}
          /> */}
        {/* <SectionGridCategory/>
          <div className="text-center mx-auto mt-10 md:mt-16">
            <ButtonSecondary>Show me more</ButtonSecondary>
          </div>
        </div> */}

        {/* === SECTION 5 === */}
        <SectionSliderNewAuthors
          heading="Top elite authors"
          subHeading="Discover our elite writers"
          authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
        />

        {/* SUBCRIBES */}
        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default PageArchive;
