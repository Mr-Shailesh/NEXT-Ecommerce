import React from "react";
import Link from "next/link";
import Product from "../models/Product";
import mongoose from "mongoose";
import Image from "next/image";

const cover = ({ products }) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys(products).length === 0 && (
              <p>
                Sorry, All the Covers are currently out of stock. New stock
                coming soon. Stay Tuned !
              </p>
            )}
            {Object.keys(products).map((item) => {
              return (
                <div
                  key={products[item]._id}
                  className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-5 "
                >
                  <Link href={`/product/${products[item].slug}`}>
                    <div className="block relative  rounded overflow-hidden ">
                      <Image
                        alt="ecommerce"
                        className="m-auto md:mx-0  h-[30vh] md:h-[36vh] block"
                        src={products[item].img}
                        height={500}
                        width={500}
                        priority
                      />
                    </div>
                  </Link>
                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {products[item].category}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {products[item].title}
                    </h2>
                    <p className="mt-1">₹{products[item].price}</p>
                    <div className="mt-1">
                      {products[item].size.includes("S") && (
                        <span className="border border-gray-300 px-1 mx-1">
                          S
                        </span>
                      )}
                      {products[item].size.includes("M") && (
                        <span className="border border-gray-300 px-1 mx-1">
                          M
                        </span>
                      )}
                      {products[item].size.includes("L") && (
                        <span className="border border-gray-300 px-1 mx-1">
                          L
                        </span>
                      )}
                      {products[item].size.includes("XL") && (
                        <span className="border border-gray-300 px-1 mx-1">
                          XL
                        </span>
                      )}
                      {products[item].size.includes("XXL") && (
                        <span className="border border-gray-300 px-1 mx-1">
                          XXL
                        </span>
                      )}
                    </div>
                    <div className="mt-1">
                      {products[item].color.includes("white") && (
                        <button className="border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {products[item].color.includes("red") && (
                        <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {products[item].color.includes("green") && (
                        <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {products[item].color.includes("blue") && (
                        <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {products[item].color.includes("magenta") && (
                        <button className="border-2 border-gray-300 ml-1 bg-rose-900 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {products[item].color.includes("cyan") && (
                        <button className="border-2 border-gray-300 ml-1 bg-cyan-500 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {products[item].color.includes("pink") && (
                        <button className="border-2 border-gray-300 ml-1 bg-pink-500 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let products = await Product.find({ category: "Cover" });

  let cover = {};
  for (let item of products) {
    if (item.title in cover) {
      if (
        !cover[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        cover[item.title].color.push(item.color);
      }
      if (
        !cover[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        cover[item.title].size.push(item.size);
      }
    } else {
      cover[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        cover[item.title].color = [item.color];
        cover[item.title].size = [item.size];
      }
    }
  }

  return {
    props: {
      products: JSON.parse(JSON.stringify(cover)),
    },
  };
};

export default cover;
