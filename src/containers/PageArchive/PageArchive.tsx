import React, { FC, useEffect, useState, Fragment, useRef } from "react";
import ModalMarque from "./ModalMarque";
import { DEMO_POSTS } from "data/posts";
import { PostDataType, TaxonomyType } from "data/types";
import { DEMO_CATEGORIES } from "data/taxonomies";
import Pagination from "components/Pagination/Pagination";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ArchiveFilterListBox from "components/ArchiveFilterListBox/ArchiveFilterListBox";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import NcImage from "components/NcImage/NcImage";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionGridCategory from "components/SectionGridCategoryBox/SectionGridCategory";
import SellersSlider from "components/SectionSliderNewAthors/SellersSlider";
import { DEMO_AUTHORS } from "data/authors";
import axios from "axiosInstance";
import Card11Product from "components/Card11/Card11Product";
import { useDispatch, useSelector } from "react-redux";
import { populateProducts } from "app/productslice/Productslice";
import background from "../../images/shop5.jpg";
import { isAuthenticated } from "app/slices/userSlice";
import {
  getLikedProducts,
  getBookmarkedProducts,
} from "app/productLikes/productLikes";
import { Popover, Transition } from "@headlessui/react";
import Input from "components/Input/Input";
import Slider from "@material-ui/core/Slider";
import { RootState } from "../../app/store";
import {
  filterByMarque,
  filterByCategory,
} from "../../app/filterSlice/filterSlice";

import Modalcart from "./Modalcart";
import Marque from "../../components/Tag/Marque";
import NcModal from "../../components/NcModal/NcModal";
import { Link } from "react-router-dom";
import Heading from "../../components/Heading/Heading";
import CardCategory from "../../components/CardCategory2/CardCategory";
// import Radio from "@material-tailwind/react/Radio";
//import ModalCategoriesprod from "./Modalcategoriesprod";
export interface PageArchiveProps {
  className?: string;
}

const PageArchive: FC<PageArchiveProps> = ({ className = "" }) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const filter = useSelector((state: RootState) => state.filterSlice);
  const prod = useSelector((state: RootState) => state.product);
  const myRef = useRef(null);
  const inputRef = React.createRef<HTMLInputElement>();
  const [value, setValue] = React.useState([0, 100]);
  let min = value[0] * 100;
  let max = value[1] * 100;

  const marques = [
    "yamaha",
    "shure",
    "gibson",
    "harman",
    "fender",
    "steinway",
    "roland",
    "others",
  ];

  let categories = [
    "guitars",
    "keyboards",
    "strings",
    "brass",
    "percussions",
    "woodwind",
    "others",
  ];

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const rangeSelector = (event, newValue) => {
    setValue(newValue);
    axios.get(`products/price?min=${min}&max=${max}`).then((res) => {
      setProducts(res.data);
    });
  };

  const executeScroll = () => myRef.current.scrollIntoView();

  // let inputHandler = (e) => {
  //   if (e.target.value) {
  //     axios.get(`products/search?label=${e.target.value}`).then((res) => {
  //       setProducts(res.data);
  //     });
  //   } else {
  //     axios.get("products/filter").then((res) => {
  //       setProducts(res.data.products);
  //     });
  //   }
  // };

  const inputHandler = (e) => {
    if (e.target.value) {
      axios
        .get("products/filter")
        .then((res) => {
          setProducts(
            res.data.products.filter((product) =>
              product.label
                .toLowerCase()
                .startsWith(e.target.value.toLowerCase())
            )
          );
        })
        .catch((err) => console.log(err.message));
    } else {
      axios.get("products/filter").then((res) => {
        setProducts(res.data.products);
      });
    }
  };

  const filterMarque = (marque) => {
    axios
      .get(`products/marque?marque=${marque}`)
      .then((res) => {
        executeScroll();
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const filterCatgory = (cat) => {
    axios
      .get("products/filter")
      .then((res) => {
        let p = res.data.products.filter((product) => {
          return product.category === cat;
        });
        setProducts(p);
        dispatch(populateProducts(p));
        // dispatch(changeValid(false));
        executeScroll();
      })
      .catch((err) => console.log(err.message));
  };
  const getAllProduct = () => {
    axios
      .get("products/filter")
      .then((res) => {
        dispatch(populateProducts(res.data.products));
        setProducts(res.data.products);
        //dispatch(changeValid(true));
      })
      .catch((err) => console.log(err.message));
  };

  const getNewProducts = () => {
    axios
      .get("products/filter")
      .then((res) => {
        setProducts(
          res.data.products.filter((product) => product.state === "new")
        );
      })
      .catch((err) => console.log(err.message));
  };

  const getUsedProducts = () => {
    axios
      .get("products/filter")
      .then((res) => {
        setProducts(
          res.data.products.filter((product) => product.state === "used")
        );
      })
      .catch((err) => console.log(err.message));
  };

  /* ---------------- Alaa ------------------------------ */
  const isAuth = useSelector(isAuthenticated);
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

    // if(window.location.href === "http://localhost:3000/mi/archive/the-demo-archive-slug?seller"){
    //   dispatch(populateProducts(p));
    //   console.log(p)
    //   setProducts(p);
    // }
    getAllProduct();
  }, [dispatch]);

  const renderModalContent = () => {
    return (
      <div className="flex flex-wrap dark:text-neutral-200">
        {marques.map((tag) => (
          <div
            onClick={() => {
              filterMarque(tag);
              closeModal();
            }}
          >
            <Marque key={tag} tag={tag} className="mr-2 mb-2" />
          </div>
        ))}
      </div>
    );
  };

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
            //src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            src={background}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
            <h2 className="inline-block align-middle text-5xl font-semibold md:text-7xl ">
              {/* {PAGE_DATA.name} */}
              Welcome
            </h2>
            <span className="block mt-4 text-neutral-300">
              {/* {products.length} Articles */}
              To Mi-Shop
            </span>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}
      <div className="relative py-16 container">
        <div className="category">
          <BackgroundSection />
          {/* Category */}
          <div className={`nc-SectionGridCategoryBox relative`}>
            <Heading
              desc="Discover over 100 Articles"
              className="inline-flex items-center mb-10 headCategory"
            >
              Instruments
            </Heading>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 md:gap-8">
              {categories.map((item, index) => (
                <Link
                  to={`/mi/archive/the-demo-archive-slug?category=${item}`}
                  className="inline-flex items-center"
                  onClick={() => {
                    filterCatgory(item);
                  }}
                >
                  <CardCategory
                    key={index}
                    category={item}
                    products={products}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Marque */}
      <div
        ref={myRef}
        className="container py-16 lg:py-10 space-y-16 lg:space-y-28"
      >
        <div>
          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
            <div className="flex space-x-2.5">
              {/*<ModalCategories categories={DEMO_CATEGORIES} />*/}
              {/*<ModalCategoriesprod/>*/}
              <NcModal
                isOpenProp={modalIsOpen}
                contentExtraClass="max-w-screen-md"
                triggerText={
                  <span
                    onClick={() => openModal()}
                    className="hidden sm:inline"
                  >
                    Marques
                  </span>
                }
                modalTitle="Discover other tags"
                renderContent={renderModalContent}
              />
              {/* <button onClick={() => filterMarque()}><ModalMarque /></button> */}
              <Modalcart />
            </div>
            {/*  */}
            {/* Label */}
            <div className="block my-4 border-b w-full border-neutral-100 sm:hidden"></div>
            <div className="flex justify-end">
              {/* <ArchiveFilterListBox lists={FILTERS} /> */}
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
            </div>
          </div>
          {/*  */}
          {/* Price */}
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

          {/* <Link 
          to ={`/mi/archive/the-demo-archive-slug`}> */}
          <div className="flex justify-between">
            <ButtonPrimary onClick={() => getAllProduct()}>
              Show All Porducts
            </ButtonPrimary>
            <div className="radio-buttons">
              New
              <input
                id="mac"
                value="new"
                name="platform"
                type="radio"
                onChange={() => getNewProducts()}
              />
              / Used
              <input
                id="linux"
                value="used"
                name="platform"
                type="radio"
                onChange={() => getUsedProducts()}
              />
            </div>
            {/* <ButtonPrimary disabled={filter.valid}>Filter</ButtonPrimary> */}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
            {products.map((product) => (
              <Card11Product key={product._id} product={product} />
            ))}
          </div>
          {/* PAGINATIONS */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination />
            <ButtonPrimary>Show me more</ButtonPrimary>
          </div>
        </div>
        {/* === SECTION 5 === */}
        <hr />
        <SellersSlider
          heading="Top elite authors"
          subHeading="Discover our elite writers"
          authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
          //products={products}
        />
        <hr />
        {/* SUBCRIBES */}
        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default PageArchive;
