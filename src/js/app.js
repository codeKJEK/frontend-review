// app js
const imageContainer = document.querySelector(".review__image-container"),
authorName = document.querySelector(".review__author-name"),
authorJob = document.querySelector(".review__author-job"),
authorReview = document.querySelector(".review__author-review"),
previousBtn = document.querySelector(".review__prev-button"),
nextBtn = document.querySelector(".review__next-button");

let currentReview = 0;

fetch("https://kjek-reviews.herokuapp.com/reviews")
.then(response => response.json())
.then(reviews => {
  console.log(reviews)
  const review = reviews[currentReview];
  imageContainer.innerHTML = "";
  imageContainer.insertAdjacentHTML("afterbegin", `<img src="${review.image[0].url}" alt="photo of ${review.name}" class="review__author-img">`);
  authorName.textContent = review.name;
  authorJob.textContent = review.job;
  authorReview.textContent = review.review;
  const authorImg = document.querySelector(".review__author-img");

  function showReview(currentReview) {
    const review = reviews[currentReview];
    authorImg.src = review.image[0].url;
    authorImg.setAttribute("alt", `image of ${review.name}`);
    authorName.textContent = review.name;
    authorJob.textContent = review.job;
    authorReview.textContent = review.review;
  }
  previousBtn.addEventListener("click", () => {
    currentReview--;
    if (currentReview < 0) {
      currentReview = reviews.length - 1;
    }
    showReview(currentReview);
  });
  nextBtn.addEventListener("click", function () {
    currentReview++;
    if (currentReview > reviews.length - 1) {
      currentReview = 0;
    }
    showReview(currentReview);
  });
})