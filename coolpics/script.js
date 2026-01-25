const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
  navLinks.style.display =
    navLinks.style.display === 'block' ? 'none' : 'block';
});

const images = document.querySelectorAll('.gallery img');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.close-modal');

images.forEach(image => {
  image.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });
});

closeModalBtn.addEventListener('click', closeModal);

modal.addEventListener('click', event => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

function closeModal() {
  modal.classList.add('hidden');
}