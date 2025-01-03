import React from "react";
import "../../css/dish_details/CookingInstructions.css";
import Video from "../../img/dish_details/video.mp4"; // Đường dẫn đến video mặc định

const CookingInstructions = ({
  first,
  second,
  video,
  img1,
  flagBloodPressure,
  flagBloodGlucose,
  flagHeart,
}) => {
  const defaultVideo = Video;

  const handleVideoClick = () => {
    if (video) {
      window.open(video, "_blank");
    } else {
      window.open(defaultVideo, "_blank");
    }
  };

  // Tạo chuỗi hạn chế
  const restrictions = [flagBloodPressure, flagBloodGlucose, flagHeart]
    .filter(Boolean)
    .join(", ");
  const hasRestrictions = restrictions.length > 0;

  return (
    <>
      <div id="section-4" className="cooking-instructions">
        <span className="cooking-instructions__title">HƯỚNG DẪN CHẾ BIẾN</span>

        <div className="cooking-instructions__main">
          <div className="cooking-instructions__item">
            <div className="video-container" onClick={handleVideoClick}>
              <video
                className="instruction-video"
                src={video || defaultVideo}
                muted
                loop
              ></video>
              <div className="video-overlay">▶</div>
            </div>

            <div className="cooking-instructions__text">
              <span>Hạn chế</span>
              <ul>
                {hasRestrictions ? (
                  <li className="text-red-700 font-semiBold">
                    Những người có bệnh về {restrictions}
                  </li>
                ) : (
                  <li>không có</li>
                )}
              </ul>
            </div>
          </div>

          <div className="cooking-instructions__item reverse">
            <div className="cooking-instructions__img">
              <img src={img1} alt="" />
            </div>

            <div className="cooking-instructions__text">
              <span>Cách làm</span>

              <ul>
                {second?.length > 0 ? (
                  second.map((ingredient, index) => (
                    <li key={index}>
                      • Bước {index + 1}: {ingredient}
                    </li>
                  ))
                ) : (
                  <li>Chưa có</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <span className="cooking-instructions__footer1">Thưởng thức nào !</span>
        <span className="cooking-instructions__footer2">
          Cùng nhau thưởng thức món ăn này, đảm bảo sẽ có những giây phút thật
          vui vẻ và đáng nhớ.
        </span>
      </div>
    </>
  );
};

export default CookingInstructions;
