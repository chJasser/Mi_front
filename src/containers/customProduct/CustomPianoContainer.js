import { StarIcon } from "@heroicons/react/solid";
import { RadioGroup } from "@headlessui/react";
import { useState, Suspense, useEffect } from "react";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";

import { Canvas } from "@react-three/fiber";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Pianoo from "./Pianoo";

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example2() {
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
  const [Hinges, setHinges] = useState("#FFF36B");
  const [Keys, setKeys] = useState("#FFFFFF");
  const [Piano, setPiano] = useState("#000000");
  const [HingesChanged, setHingesChanged] = useState(false);
  const [KeysChanged, setKeysChanged] = useState(false);
  const [PianoChanged, setPianoChanged] = useState(false);
  const [product, setProduct] = useState({
    name: "Basic Keyboard",
    price: 3000,
    changedPiano: false,
    changedKeys: false,
    changedHinges: false,
  });
  useEffect(() => {
    const { changedHinges, changedKeys, changedPiano } = product;
    changedHinges && setProduct({ ...product, price: product.price + 50 });
    changedKeys && setProduct({ ...product, price: product.price + 50 });
    changedPiano && setProduct({ ...product, price: product.price + 50 });
  }, [HingesChanged, KeysChanged, PianoChanged]);
  const handleKeysChanged = (e) => {
    setKeys(e.target.value);
    setKeysChanged(true);
    setProduct({ ...product, changedKeys: true });
  };
  const handlePianoChanged = (e) => {
    setPiano(e.target.value);
    setPianoChanged(true);
    setProduct({ ...product, changedPiano: true });
  };
  const handleHingesChanged = (e) => {
    setHinges(e.target.value);
    setHingesChanged(true);
    setProduct({ ...product, changedHinges: true });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setHinges("#FFF36B");
    setKeys("#FFFFFF");
    setPiano("#000000");
    setHingesChanged(false);
    setPianoChanged(false);
    setKeysChanged(false);
    setProduct({
      ...product,
      changedHinges: false,
      changedKeys: false,
      changedPiano: false,
      price: 3000,
    });
  };
  return (
    <div className=" container mx-auto flex items-center">
      {/* Image gallery */}
      <div className="card">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          {product.name}
        </h1>
        <div className="product-canvas mt-5">
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 1, 2], fov: 50 }}
          >
            <ambientLight intensity={0.7} />
            <spotLight
              intensity={0.5}
              angle={0.5}
              penumbra={1}
              position={[10, 15, 10]}
              castShadow
            />
            <Suspense fallback={null}>
              <Pianoo
                customColors={{
                    Hinges: Hinges,
                    Keys: Keys,
                    Piano: Piano,
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
                    id="Piano"
                    name="Piano"
                    value={Piano}
                    onChange={(e) => handlePianoChanged(e)}
                  />
                  <label>Piano</label>
                </div>

                <div>
                  <input
                    type="color"
                    id="Keys"
                    name="Keys"
                    value={Keys}
                    onChange={(e) => handleKeysChanged(e)}
                  />
                  <label>Keys</label>
                </div>
                <div>
                  <input
                    type="color"
                    id="Hinges"
                    name="Hinges"
                    value={Hinges}
                    onChange={(e) => handleHingesChanged(e)}
                  />
                  <label>Hinges</label>
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
