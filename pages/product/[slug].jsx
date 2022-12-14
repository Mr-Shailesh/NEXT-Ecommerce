import { useRouter } from "next/router";
import React, { useState } from "react";
import Product from "../../models/Product";
import mongoose from "mongoose";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const slug = ({ buyNow, addToCart, product, variants }) => {
  const router = useRouter();
  const { slug } = router.query;

  const [pin, setPin] = useState();
  const [service, setService] = useState();
  const [color, setColor] = useState(product.color);
  const [size, setSize] = useState(product.size);

  const checkServiceability = async (e) => {
    e.preventDefault();
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();

    if (pinJson.includes(parseInt(pin))) {
      setService(true);
      toast.success("Your pincode is serviceable!", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setService(false);
      toast.error("Sorry,Pincode not serviceable!", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const onChangePin = (e) => {
    setPin(e.target.value);
  };

  const refreshVariants = (newSize, newColor) => {
    let url = `/product/${variants[newColor][newSize]["slug"]}`;
    window.location = url;
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="container px-5 py-16 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <Image
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto px-24 object-cover object-top rounded"
            src={product.img}
            height={500}
            width={500}
            priority
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              COVERWALA.COM
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.title} ({product.size}/{product.color})
            </h1>

            <p className="leading-relaxed mt-3">{product.desc}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                {Object.keys(variants).includes("white") &&
                  Object.keys(variants["white"]).includes(size) && (
                    <button
                      onClick={() => refreshVariants(size, "white")}
                      className={`border-2  rounded-full w-6 h-6 focus:outline-none ${
                        color === "white" ? "border-black" : "border-gray-300"
                      }`}
                    ></button>
                  )}
                {Object.keys(variants).includes("red") &&
                  Object.keys(variants["red"]).includes(size) && (
                    <button
                      onClick={() => refreshVariants(size, "red")}
                      className={`border-2  ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none ${
                        color === "red" ? "border-black" : "border-gray-300"
                      }`}
                    ></button>
                  )}

                {Object.keys(variants).includes("yellow") &&
                  Object.keys(variants["yellow"]).includes(size) && (
                    <button
                      onClick={() => refreshVariants(size, "yellow")}
                      className={`border-2  ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none ${
                        color === "yellow" ? "border-black" : "border-gray-300"
                      }`}
                    ></button>
                  )}

                {Object.keys(variants).includes("black") &&
                  Object.keys(variants["black"]).includes(size) && (
                    <button
                      onClick={() => refreshVariants(size, "black")}
                      className={`border-2  ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${
                        color === "black" ? "border-gray-300" : "border-black"
                      }`}
                    ></button>
                  )}

                {Object.keys(variants).includes("green") &&
                  Object.keys(variants["green"]).includes(size) && (
                    <button
                      onClick={() => refreshVariants(size, "green")}
                      className={`border-2  ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none ${
                        color === "green" ? "border-black" : "border-gray-300"
                      }`}
                    ></button>
                  )}
                {Object.keys(variants).includes("blue") &&
                  Object.keys(variants["blue"]).includes(size) && (
                    <button
                      onClick={() => refreshVariants(size, "blue")}
                      className={`border-2  ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none ${
                        color === "blue" ? "border-black" : "border-gray-300"
                      }`}
                    ></button>
                  )}
                {Object.keys(variants).includes("magenta") &&
                  Object.keys(variants["magenta"]).includes(size) && (
                    <button
                      onClick={() => refreshVariants(size, "magenta")}
                      className={`border-2  ml-1 bg-fuchsia-500 rounded-full w-6 h-6 focus:outline-none ${
                        color === "magenta" ? "border-black" : "border-gray-300"
                      }`}
                    ></button>
                  )}
                {Object.keys(variants).includes("cyan") &&
                  Object.keys(variants["cyan"]).includes(size) && (
                    <button
                      onClick={() => refreshVariants(size, "cyan")}
                      className={`border-2  ml-1 bg-cyan-500 rounded-full w-6 h-6 focus:outline-none ${
                        color === "cyan" ? "border-black" : "border-gray-300"
                      }`}
                    ></button>
                  )}
                {Object.keys(variants).includes("pink") &&
                  Object.keys(variants["pink"]).includes(size) && (
                    <button
                      onClick={() => refreshVariants(size, "pink")}
                      className={`border-2  ml-1 bg-pink-500 rounded-full w-6 h-6 focus:outline-none ${
                        color === "pink" ? "border-black" : "border-gray-300"
                      }`}
                    ></button>
                  )}
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select
                    value={size}
                    onChange={(e) => {
                      refreshVariants(e.target.value, color);
                    }}
                    className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-ringlogo-200 focus:border-hover text-base pl-3 pr-10"
                  >
                    {Object.keys(variants[color]).includes("S") && (
                      <option value={"S"}>S</option>
                    )}
                    {Object.keys(variants[color]).includes("M") && (
                      <option value={"M"}>M</option>
                    )}
                    {Object.keys(variants[color]).includes("L") && (
                      <option value={"L"}>L</option>
                    )}
                    {Object.keys(variants[color]).includes("XL") && (
                      <option value={"XL"}>XL</option>
                    )}
                    {Object.keys(variants[color]).includes("XXL") && (
                      <option value={"XXL"}>XXL</option>
                    )}
                    {Object.keys(variants[color]).includes("Standard") && (
                      <option value={"Standard"}>Standard</option>
                    )}
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex ">
              <span className="title-font font-medium text-2xl text-gray-900">
                ???{product.price}
              </span>
              <button
                onClick={() => {
                  buyNow(
                    slug,
                    1,
                    product.price,
                    product.title,
                    product.size,
                    product.color
                  );
                }}
                className="flex ml-8 text-white bg-hover border-0 py-2 md:px-6 focus:outline-none hover:bg-logo rounded"
              >
                Buy Now
              </button>
              <button
                onClick={() => {
                  addToCart(
                    slug,
                    1,
                    product.price,
                    product.title,
                    product.size,
                    product.color
                  );
                }}
                className="flex ml-4 text-white bg-hover border-0 py-2 md:px-6 focus:outline-none hover:bg-logo rounded"
              >
                Add to Cart
              </button>
            </div>
            <form
              onSubmit={checkServiceability}
              className="pin mt-6 flex space-x-2 text-sm"
            >
              <input
                type="text"
                required
                onChange={onChangePin}
                placeholder="Enter your pincode"
                className="px-2 border-2 border-gray-400 rounded-md"
              />
              <button
                type="submit"
                className=" text-white bg-hover border-0 py-2 px-6 focus:outline-none hover:bg-logo rounded"
              >
                Check
              </button>
            </form>
            {!service && service != null && (
              <div className="text-red-700 text-sm mt-3">
                Sorry! We do not deliver to this pincode yet
              </div>
            )}
            {service && !service != null && (
              <div className="text-green-700 text-sm mt-3">
                Yay! This pincode is serviceable
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const getServerSideProps = async (ctx) => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let product = await Product.findOne({ slug: ctx.query.slug });
  let variants = await Product.find({
    title: product.title,
    category: product.category,
  });

  let colorSizeSlug = {};
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    },
  };
};

export default slug;
