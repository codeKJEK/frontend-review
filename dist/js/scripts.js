"use strict";

// app js
var imageContainer = document.querySelector(".review__image-container"),
    authorName = document.querySelector(".review__author-name"),
    authorJob = document.querySelector(".review__author-job"),
    authorReview = document.querySelector(".review__author-review"),
    previousBtn = document.querySelector(".review__prev-button"),
    nextBtn = document.querySelector(".review__next-button");
var currentReview = 0;
fetch("https://kjek-reviews.herokuapp.com/reviews").then(function (response) {
  return response.json();
}).then(function (reviews) {
  console.log(reviews);
  var review = reviews[currentReview];
  imageContainer.innerHTML = "";
  imageContainer.insertAdjacentHTML("afterbegin", "<img src=\"".concat(review.image[0].url, "\" alt=\"photo of ").concat(review.name, "\" class=\"review__author-img\">"));
  authorName.textContent = review.name;
  authorJob.textContent = review.job;
  authorReview.textContent = review.review;
  var authorImg = document.querySelector(".review__author-img");

  function showReview(currentReview) {
    var review = reviews[currentReview];
    authorImg.src = review.image[0].url;
    authorImg.setAttribute("alt", "image of ".concat(review.name));
    authorName.textContent = review.name;
    authorJob.textContent = review.job;
    authorReview.textContent = review.review;
  }

  previousBtn.addEventListener("click", function () {
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
});