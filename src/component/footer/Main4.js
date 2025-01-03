import React from "react";
import LogoImg from "../../img/home_out/logo.png";

const Main4 = (props) => {
  console.log(props);
  return (
    <div
      id="main4"
      className="w-full bg-white rounded-[30px] p-8 sm:p-[30px_40px] md:p-[30px_180px]  shadow-[0px_0px_2px_rgba(255,255,255,0.3)]"
    >
      <div className="main4-body mt-10 mb-10 flex flex-col md:flex-row justify-between gap-10 md:gap-0">
        <div className="main4-logo flex flex-row justify-center items-start gap-5">
          <img src={LogoImg} alt="logo.png" className="w-[60px] -mt-[14px]" />
          <span className="text-[var(--color-health-care)] text-[22px] font-bold">
            Health Care
          </span>
        </div>

        <div className="item w-full md:w-auto">
          <span className="title text-black text-[22px] font-bold">
            Quick Links
          </span>
          <ul className="mt-12 list-none">
            <li className="mb-2">
              <a
                href="#"
                className="text-[#595858] font-itim hover:text-[var(--color-health-care)]"
              >
                Home
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="text-[#595858] font-itim hover:text-[var(--color-health-care)]"
              >
                Our Services
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="text-[#595858] font-itim hover:text-[var(--color-health-care)]"
              >
                Contact Us
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="text-[#595858] font-itim hover:text-[var(--color-health-care)]"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        <div className="item w-full md:w-auto">
          <span className="title text-black text-[22px] font-bold">
            Contact Us
          </span>
          <div className="contact-list mt-12 flex flex-col gap-2.5 text-[#595858] font-itim">
            <span className="contact-info">Address: {props.address}</span>
            <span className="contact-info">Phone: {props.phone}</span>
            <span className="contact-info">
              Email:{" "}
              <a
                href={`mailto:${props.email}`}
                className="hover:text-[var(--color-health-care)]"
              >
                {props.email}
              </a>
            </span>
          </div>
        </div>

        <div className="item w-full md:w-auto">
          <span className="title text-black text-[22px] font-bold">Social</span>
          <div className="social-list mt-12">
            <a
              href="https://www.facebook.com/UIT.Fanpage"
              className="text-[#595858] text-[24px] mr-2 hover:text-[var(--color-health-care)]"
            >
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a
              href="https://www.instagram.com/yyan.g293/"
              className="text-[#595858] text-[24px] mr-2 hover:text-[var(--color-health-care)]"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="https://www.tiktok.com/@tuyensinhuit"
              className="text-[#595858] text-[24px] mr-2 hover:text-[var(--color-health-care)]"
            >
              <i className="fa-brands fa-tiktok"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="main4-line w-full border-[2px] border-[#595858] rounded-[20px] mb-2.5"></div>

      <div className="main4-footer w-full flex justify-center mb-2.5">
        <span className="text-[#595858] font-itim">&copy; HeathCare 2024</span>
      </div>
    </div>
  );
};

export default Main4;
