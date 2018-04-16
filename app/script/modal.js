const modal = document.querySelector("#modal");
const closeButton = document.querySelector("#close-button");
const openButton = document.querySelectorAll(".open-button");
const modalBackground = document.querySelector(".modal__background");

closeButton.addEventListener("click", function() {
  toggleModal();
});

modalBackground.addEventListener("click", function() {
  toggleModal();
});

for (let i = 0; i < openButton.length; i++) {
  openButton[i].addEventListener("click", function(event) {
    toggleModal();
  });
}

function toggleModal() {
  modal.classList.toggle("closed");
  document.body.classList.toggle("modal-opened");
}
