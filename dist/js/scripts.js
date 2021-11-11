"use strict";

// app js
var imageContainer = document.querySelector(".reviews__img-container"),
    authorName = document.querySelector(".reviews__author-name"),
    authorJob = document.querySelector(".reviews__author-job"),
    authorReview = document.querySelector(".reviews__author-review"),
    previousBtn = document.querySelector(".reviews__prev-button"),
    nextBtn = document.querySelector(".reviews__next-button");
var currentReview = 3;
fetch("https://kjek-reviews.herokuapp.com/reviews").then(function (response) {
  return response.json();
}).then(function (reviews) {
  var review = reviews[currentReview];
  imageContainer.innerHTML = "";
  imageContainer.insertAdjacentHTML("afterbegin", "<img src=\"".concat(review.imageURL, "\" alt=\"photo of ").concat(review.name, "\" class=\"reviews__author-img\">"));
  authorName.textContent = review.name;
  authorJob.textContent = review.job;
  authorReview.textContent = review.review;
  var authorImg = document.querySelector(".reviews__author-img");

  function showReview(currentReview) {
    var review = reviews[currentReview];
    authorImg.src = review.imageURL;
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
}); // // show review based on id
// function showReview(reviewId) {
//     const author = reviews[reviewId];
//     authorImg.src = author.image;
//     authorName.textContent = author.name;
//     authorJob.textContent = author.job;
//     authorReview.textContent = author.review;
// }
// .then(response => response.json())
// .then(data => data.forEach(review => {
//   let info = {
//     id: review.id
//   }
//   reviews.push(info)
// }))
// Promise.all
// load initial item

window.addEventListener("DOMContentLoaded", function () {}); //   // show next person
//   nextBtn.addEventListener("click", function () {
//     currentItem++;
//     if (currentItem > reviews.length - 1) {
//       currentItem = 0;
//     }
//     showPerson(currentItem);
//   });
//   // show prev person
//   prevBtn.addEventListener("click", function () {
//     currentItem--;
//     if (currentItem < 0) {
//       currentItem = reviews.length - 1;
//     }
//     showPerson(currentItem);
//   });