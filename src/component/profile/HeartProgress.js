import React from "react";

const HeartProgress = ({ percentage }) => {
  const fillColor = percentage >= 100 ? "#FF0000" : "#1445FE";
  const strokeColor = percentage >= 100 ? "" : "stroke-[#1445FE]";
  return (
    <div className="relative w-[130px] h-[130px]">
      <svg
        className="w-full h-full"
        viewBox="0 0 24 24"
        style={{ transform: "rotate(0deg)" }}
      >
        <path
          d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
          className={`fill-none ${strokeColor} stroke-[0.5]`}
        />

        <path
          d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
          className="transition-[clip-path] duration-300 ease-in-out"
          style={{
            clipPath: `inset(${100 - percentage}% 0 0 0)`,
            fill: fillColor,
          }}
        />
      </svg>
    </div>
  );
};

export default HeartProgress;
