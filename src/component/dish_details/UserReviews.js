import React from "react";
import "../../css/dish_details/UserReviews.css";
import StarVoted from "../../img/nutritional_regimen/star-voted.png";
import Star from "../../img/nutritional_regimen/star.png";

const UserReviews = ({ reviews }) => {
  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <img key={i} src={i <= rating ? StarVoted : Star} alt="Star" />
      );
    }
    return stars;
  };

  return (
    <>
      <div id="section-6" className="user-reviews">
        <span className="user-reviews__title">Cảm nhận của mọi người</span>

        <div className="user-reviews__main">
          <div className="user-reviews__list">
            <ul>
              {reviews?.map((review, index) => (
                <li key={index} className="user-reviews__item">
                  <div className="user-reviews__avatar">
                    <img src={review.avatar} alt="avatar" />
                  </div>
                  <div className="user-reviews__content">
                    <span className="user-reviews__name">{review.name}</span>
                    <div className="user-reviews__rating">
                      {renderRating(review.rating)}
                    </div>
                    <span className="user-reviews__date">
                      {review.dateCreation}
                    </span>
                    <p>{review.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="user-reviews__send-review">
            <input type="text" placeholder="Nhập cảm nhận của bạn ..." />

            <button>
              GỬI <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserReviews;
