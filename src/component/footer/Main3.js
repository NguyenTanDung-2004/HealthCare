import React from "react";

const Main3 = () => {
  return (
    <div
      id="main3"
      className="bg-[#1445fe] rounded-3xl h-[250px] shadow-lg px-[20px] sm:px-[50px] lg:px-[180px] flex flex-col lg:flex-row justify-between items-center mb-5 mt-[420px] gap-5"
    >
      {/* Văn bản chỉ hiển thị trên màn hình lớn */}
      <span className="text-white text-xl font-sans text-center lg:text-left hidden sm:block">
        Subscribe to our newsletter to get the latest updates and healthcare
        tips.
      </span>

      {/* Form luôn hiển thị, nhưng sẽ điều chỉnh kích thước tùy theo màn hình */}
      <form className="w-full lg:w-[550px] h-auto sm:h-[380px] bg-[#c3cffd] rounded-3xl p-5 sm:p-10 sticky transform -translate-y-[30%] shadow-[2px_2px_10px_5px_rgba(0,23,105,0.3)]">
        <div className="mb-5 flex flex-col sm:flex-row justify-between">
          <input
            type="text"
            placeholder="Last Name"
            id="lastname"
            className="w-full sm:w-[190px] h-[46px] px-3 rounded-lg border-none bg-white text-blue-500 focus:outline-[#1445fe] mb-3 sm:mb-0"
          />
          <input
            type="text"
            placeholder="First Name"
            id="firstname"
            className="w-full sm:w-[190px] h-[46px] px-3 rounded-lg border-none bg-white text-blue-500 focus:outline-[#1445fe]"
          />
        </div>
        <div className="mb-5">
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="w-full h-[46px] px-3 rounded-lg border-none bg-white text-blue-500 focus:outline-[#1445fe]"
          />
        </div>
        <div className="mb-5">
          <textarea
            placeholder="Message"
            id="message"
            className="w-full h-[100px] px-3 py-2 rounded-lg border-none bg-white text-blue-500 resize-y focus:outline-[#1445fe]"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full p-4 text-white text-lg font-sans bg-[#1445fe] rounded-lg cursor-pointer hover:opacity-80"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Main3;
