import { StarIcon } from "@heroicons/react/solid";
import { RadioGroup } from "@headlessui/react";
import { useState, Suspense, useEffect } from "react";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";

import { Canvas } from "@react-three/fiber";
import Guitar from "./Guitar_model";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Violin from "./Vio";

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ViolinContainer() {
  const sizes = [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ];
  const [selectedSize, setSelectedSize] = useState();

  /**
   *
   */
  const [the_stick, setThe_stick] = useState("#E8B187");
  const [rest, setRest] = useState("#E8B187");
  const [chords, setChords] = useState("#B9B7BD");
  const [body, setBody] = useState("#4C2C2E");

  /**
   *
   */
  const [the_stickChanged, setThe_stickChanged] = useState(false);
  const [restChanged, setRestChanged] = useState(false);
  const [bodyChanged, setBodyChanged] = useState(false);
  const [chordsChanged, setChordsChanged] = useState(false);
  const [product, setProduct] = useState({
    name: "Basic Violin",
    price: 700,
    changedBody: false,
    changedChords: false,
    changedStick: false,
    changedRest: false,
  });
  useEffect(() => {
    const { changedBody, changedChords, changedRest, changedStick } = product;
    changedBody && setProduct({ ...product, price: product.price + 50 });
    changedChords && setProduct({ ...product, price: product.price + 50 });
    changedStick && setProduct({ ...product, price: product.price + 50 });
    changedRest && setProduct({ ...product, price: product.price + 50 });
  }, [bodyChanged, chordsChanged, restChanged, the_stickChanged]);
  const handleChordsChanged = (e) => {
    setChords(e.target.value);
    setChordsChanged(true);
    setProduct({ ...product, changedChords: true });
  };
  const handleStickChanged = (e) => {
    setThe_stick(e.target.value);
    setThe_stickChanged(true);
    setProduct({ ...product, changedStick: true });
  };
  const handleBodyChanged = (e) => {
    setBody(e.target.value);
    setBodyChanged(true);
    setProduct({ ...product, changedBody: true });
  };
  const handleRestChanged = (e) => {
    setRest(e.target.value);
    setRestChanged(true);
    setProduct({ ...product, changedRest: true });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setBody("#E8B187");
    setChords("#B9B7BD");
    setRest("#4C2C2E");
    setThe_stick("#4C2C2E");
    setBodyChanged(false);
    setRestChanged(false);
    setChordsChanged(false);
    setThe_stickChanged(false);
    setProduct({
      ...product,
      changedBody: false,
      changedRest: false,
      changedStick: false,
      changedChords: false,
      price: 700,
    });
  };
  return (
    <div className=" container mx-auto flex items-center">
      {/* Image gallery */}
      <div className="card">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          {product.name}
        </h1>
        <div className="product-canvas">
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0, 25], fov: 50 }}
          >
            <directionalLight position={[10, 10, 5]} intensity={2} />
            <directionalLight position={[-10, -10, -5]} intensity={1} />
            <ambientLight intensity={0.7} />
            <spotLight
              intensity={0.5}
              angle={0.5}
              penumbra={1}
              position={[10, 15, 10]}
              castShadow
            />
            <Suspense fallback={null}>
              <Violin
                customColors={{
                  rest: rest,
                  chords: chords,
                  body: body,
                  the_stick: the_stick,
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
            </Suspense>
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
            />
          </Canvas>
        </div>
      </div>

      {/* Product info */}
      <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8"></div>

        {/* Options */}
        <div className="mt-4 lg:mt-0 lg:row-span-3">
          <h2 className="sr-only">Product information</h2>
          <p className="text-3xl text-gray-900">${product.price}</p>

          {/* Reviews */}
          <div className="mt-6">
            <h3 className="sr-only">Reviews</h3>
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      reviews.average > rating
                        ? "text-gray-900"
                        : "text-gray-200",
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

          <form className="mt-10">
            {/* Colors */}
            <div>
              <h3 className="text-sm text-gray-900 font-medium">Color</h3>
              <div className="colors">
                <div>
                  <input
                    type="color"
                    id="face"
                    name="face"
                    value={the_stick}
                    onChange={(e) => handleStickChanged(e)}
                  />
                  <label>the stick</label>
                </div>
                <div>
                  <input
                    type="color"
                    id="face"
                    name="face"
                    value={rest}
                    onChange={(e) => handleRestChanged(e)}
                  />
                  <label>rest</label>
                </div>

                <div>
                  <input
                    type="color"
                    id="chords"
                    name="chords"
                    value={chords}
                    onChange={(e) => handleChordsChanged(e)}
                  />
                  <label>chords</label>
                </div>
                <div>
                  <input
                    type="color"
                    id="support"
                    name="support"
                    value={body}
                    onChange={(e) => handleBodyChanged(e)}
                  />
                  <label>body</label>
                </div>
              </div>
            </div>

            {/* Sizes */}
            <div className="mt-10">
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-900 font-medium">
                  Custom pictures
                </h3>
              </div>

              <RadioGroup
                value={selectedSize}
                onChange={setSelectedSize}
                className="mt-4"
              >
                <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                  {sizes.map((size) => (
                    <RadioGroup.Option
                      key={size.name}
                      value={size}
                      disabled={!size.inStock}
                      className={({ active }) =>
                        classNames(
                          size.inStock
                            ? "bg-white shadow-sm text-gray-900 cursor-pointer"
                            : "bg-gray-50 text-gray-200 cursor-not-allowed",
                          active ? "ring-2 ring-indigo-500" : "",
                          "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                        )
                      }
                    >
                      {({ active, checked }) => (
                        <>
                          <RadioGroup.Label as="p">
                            {size.name}
                          </RadioGroup.Label>
                          {size.inStock ? (
                            <div
                              className={classNames(
                                active ? "border" : "border-2",
                                checked
                                  ? "border-indigo-500"
                                  : "border-transparent",
                                "absolute -inset-px rounded-md pointer-events-none"
                              )}
                              aria-hidden="true"
                            />
                          ) : (
                            <div
                              aria-hidden="true"
                              className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none"
                            >
                              <svg
                                className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                stroke="currentColor"
                              >
                                <line
                                  x1={0}
                                  y1={100}
                                  x2={100}
                                  y2={0}
                                  vectorEffect="non-scaling-stroke"
                                />
                              </svg>
                            </div>
                          )}
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <ButtonPrimary
              onClick={(e) => handleSubmit(e)}
              type="submit"
              className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add to bag
            </ButtonPrimary>
            <ButtonPrimary
              type="button"
              onClick={(e) => handleCancel(e)}
              className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </ButtonPrimary>
          </form>
        </div>
      </div>
    </div>
  );
}
