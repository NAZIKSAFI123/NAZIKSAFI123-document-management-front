import React from "react";
import { FaTimes } from "react-icons/fa";

function Modal({ title, isOpen, onClose, children }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white p-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {title}
                  </h4>
                  <button
                    onClick={onClose}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-transparent transition-colors duration-300 hover:bg-black/10"
                  >
                    <FaTimes className="font-semiboldy" />
                  </button>
                </div>
                <hr className="mt-4 " />
              </div>

              <div className="p-4">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
