import Link from "next/link";
import React, { useRef } from "react";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({ addToCart, removeFromCart, cart, subTotal, clearCart }) => {
  const ref = useRef();
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md sticky top-0 bg-white z-10">
      <div className="logo mx-5">
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-6 font-bold md:text-md ">
          <Link href="/covers">
            <li>Cover</li>
          </Link>
          <Link href="/tshirts">
            <li>Tshirt</li>
          </Link>
          <Link href="/skin-covers">
            <li>Skin-Cover</li>
          </Link>
        </ul>
      </div>
      <div className="cart absolute cursor-pointer top-4 right-0 mx-5 flex">
        <Link href="/login">
          {" "}
          <MdAccountCircle className="text-2xl md:text-3xl mx-2" />{" "}
        </Link>
        <AiOutlineShoppingCart
          onClick={toggleCart}
          className="text-2xl md:text-3xl"
        />
      </div>
      <div
        ref={ref}
        className={`w-72 h-[100vh] sideCart z-10 absolute top-0 right-0 bg-pink-100 px-8 py-10 transform transition-transform ${
          Object.keys(cart).length !== 0 ? "translate-x-0" : "translate-x-full"
        } `}
      >
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-5 right-2 cursor-pointer text-2xl"
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length === 0 && (
            <div className="my-4 font-semibold ">No Items Found.</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-5">
                  <div className="break-words w-2/3 font-semibold">
                    {cart[k].name}
                  </div>
                  <div className="flex items-center font-semibold justify-center w-1/3 text-lg">
                    <AiOutlineMinusCircle
                      className="cursor-pointer"
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                    />
                    <span className="mx-2 text-sm"> {cart[k].qty}</span>
                    <AiOutlinePlusCircle
                      className="cursor-pointer"
                      onClick={() => {
                        addToCart(
                          k,
                          1,
                          // cart[k].qty,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="font-bold my-2">Subtotal : ₹ {subTotal}</div>
        <div className="flex">
          <Link href="/checkout">
            <button className="flex mr-2  text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm">
              <BsFillBagCheckFill className="m-1" />
              Checkout
            </button>
          </Link>
          <button
            onClick={clearCart}
            className="flex mr-2  text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
