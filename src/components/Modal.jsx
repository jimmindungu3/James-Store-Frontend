import React, { useContext, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import CartContext from "../context/cartContext";

const Modal = ({ selectedProduct, closeModal }) => {
  const { addToCart, decrementProduct } = useContext(CartContext);

  useEffect(() => {
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden";

    // Re-enable scrolling when modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="flex justify-center items-center bg-gray-800 bg-opacity-50 overflow-y-auto fixed inset-0 z-2 ">
      <div className="p-4 bg-white rounded-lg flex flex-col justify-between items-center max-w-[720px] w-full relative max-h-[75vh] overflow-y-auto">
        <div className="w-full flex justify-between items-start mb-4">
          <h2 className="font-bold text-lg pr-8 break-words">
            {selectedProduct.title}
          </h2>
          <IoCloseSharp
            onClick={closeModal}
            className="text-red-900 text-4xl flex-shrink-0 cursor-pointer"
          />
        </div>

        <div className="mb-4 h-60 w-full flex justify-center items-center">
          <img
            className="h-full object-contain"
            src={selectedProduct.image}
            alt={selectedProduct.title}
          />
        </div>

        <p className="mt-4 w-full">{selectedProduct.description}</p>

        <div className="mt-4 flex justify-between items-center w-full">
          <div className="font-bold text-blue-600">
            $ {selectedProduct.price}
          </div>
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => addToCart(selectedProduct)}
              type="button"
              className="px-4 py-2 text-lg font-bold bg-gray-300 hover:bg-gray-400 active:bg-gray-300 rounded-l-md"
            >
              +
            </button>
            <button
              disabled
              type="button"
              className="px-4 py-2 text-lg font-bold bg-gray-300"
            >
              <PiShoppingCartSimpleBold />
            </button>
            <button
              onClick={() => decrementProduct(selectedProduct.id)}
              type="button"
              className="px-4 py-2 text-lg font-bold bg-gray-300 hover:bg-gray-400 active:bg-gray-300 rounded-r-md"
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
