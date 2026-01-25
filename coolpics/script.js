const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', (e) => {
  console.log(e); // logs menu button click event

  navLinks.style.display =
    navLinks.style.display === 'block' ? 'none' : 'block';
});

const images = document.querySelectorAll('.gallery img');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.close-modal');

images.forEach(image => {
  image.addEventListener('click', (e) => {
    console.log(e); // logs image click event
    modal.classList.remove('hidden');
  });
});

closeModalBtn.addEventListener('click', (e) => {
  console.log(e); // logs close button click
  closeModal();
});

function closeModal() {
  modal.classList.add('hidden');
}