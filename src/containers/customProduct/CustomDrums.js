import { StarIcon } from "@heroicons/react/solid";
import { RadioGroup } from "@headlessui/react";
import { useState, Suspense, useEffect } from "react";
import { ContactShadows, Environment, OrbitControls, Stars } from "@react-three/drei";

import { Canvas } from "@react-three/fiber";
import Guitar from "./Guitar_model";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Electrique from "./Electrique";
import Drums from "./Drums";

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CustomDrums() {
  const [selectedSize, setSelectedSize] = useState();
  const [face, setFace] = useState("#E8B187");
  const [chords, setChords] = useState("#B9B7BD");
  const [body, setBody] = useState("#4C2C2E");
  const [circulos, setCirculos] = useState("#FFF36B");
  const [bodyChanged, setBodyChanged] = useState(false);
  const [chordsChanged, setChordsChanged] = useState(false);
  const [faceChanged, setFaceChanged] = useState(false);
  const [circulosChanged, setCirculosChanged] = useState(false);
  const [product, setProduct] = useState({
    name: "Basic Drums",
    price: 1000,
    changedBody: false,
    changedChords: false,
    changedFace: false,
    changedCirculos: false,
  });
  useEffect(() => {
    const { changedBody, changedChords, changedFace, changedCirculos } =
      product;
    changedBody && setProduct({ ...product, price: product.price + 50 });
    changedChords && setProduct({ ...product, price: product.price + 50 });
    changedFace && setProduct({ ...product, price: product.price + 50 });
    changedCirculos && setProduct({ ...product, price: product.price + 50 });
  }, [bodyChanged, chordsChanged, faceChanged, circulosChanged]);
  const handleChordsChanged = (e) => {
    setChords(e.target.value);
    setChordsChanged(true);
    setProduct({ ...product, changedChords: true });
  };
  const handleFaceChanged = (e) => {
    setFace(e.target.value);
    setFaceChanged(true);
    setProduct({ ...product, changedFace: true });
  };
  const handleBodyChanged = (e) => {
    setBody(e.target.value);
    setBodyChanged(true);
    setProduct({ ...product, changedBody: true });
  };
  const handleCirculosChanged = (e) => {
    setCirculos(e.target.value);
    setProduct({ ...product, changedBody: true });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setBodyChanged(false);
    setFaceChanged(false);
    setChordsChanged(false);
    setCirculosChanged(false);
    setProduct({
      ...product,
      changedBody: false,
      changedFace: false,
      changedChords: false,
      changedCirculos: false,
      price: 300,
    });
  };
  return (
    <div className="container mx-auto mt-2 mb-10 flex items-center">
      {/* Image gallery */}
      <div className="card">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl dark:text-neutral-300">
          {product.name}
        </h1>
        <div className="product-canvas">
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0, 50], fov: 65 }}
          >
            <ambientLight intensity={0.7} />

            <Suspense fallback={null}>
              <Drums
                customColors={{
                  face: face,
                  chords: chords,
                  body: body,
                  circulos: circulos,
                }}
              />
              <Environment preset="city" />
              <ContactShadows
                rotation-x={Math.PI / 2}
                position={[0, -0.8, 0]}
                opacity={0.25}
                width={10}
                height={10}
                blur={1.5}
                far={0.8}
              />
              <Stars
                radius={100} // Radius of the inner sphere (default=100)
                depth={50} // Depth of area where stars should fit (default=50)
                count={5000} // Amount of stars (default=5000)
                factor={4} // Size factor (default=4)
                saturation={0} // Saturation 0-1 (default=0)
                fade // Faded dots (default=false)
              />
            </Suspense>
            <OrbitControls
              enablePan={true}
              enableZoom={false}
              enableRotate={true}
            />
          </Canvas>
        </div>
      </div>

      {/* Product info */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-1 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8"></div>

        {/* Options */}
        <div className="mt-4 lg:mt-0 lg:row-span-3">
          <h2 className="mb-3 text-gray-900 dark:text-neutral-300">Product information</h2>
          <p className="text-3xl text-gray-900 dark:text-neutral-300">${product.price}</p>

          {/* Reviews */}
          <div className="mt-4">
            <h3 className="sr-only">Reviews</h3>
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      reviews.average > rating
                        ? "text-gray-900 star"
                        : "text-gray-200 emptyStar",
                      "h-5 w-5 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="sr-only">{reviews.average} out of 5 stars</p>
              <a
                href={reviews.href}
                className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                {reviews.totalCount} reviews
              </a>
            </div>
          </div>

          <form className="mt-6">
            {/* Colors */}
            <div>
              <h3 className="text-md text-gray-900 font-medium dark:text-neutral-300">Color :</h3>
              <div className="colors">
                <div>
                  <label>Circulos </label>
                  <input
                    type="color"
                    id="support"
                    name="support"
                    value={circulos}
                    onChange={(e) => handleCirculosChanged(e)}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-10">
              <ButtonPrimary
                onClick={(e) => handleSubmit(e)}
                type="submit"
                className="mr-5 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add to bag
              </ButtonPrimary>
              <ButtonPrimary
                type="button"
                onClick={(e) => handleCancel(e)}
                className="cancel bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </ButtonPrimary>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
