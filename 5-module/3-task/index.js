function initCarousel(slides = 4) {
  const arrowRight = document.querySelector('.carousel__arrow_right');
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  const inner = document.querySelector('.carousel__inner');

let currentPos = 0
const slideRight = () => {
  currentPos +=1;
  inner.style.transform = `translateX(-${inner.offsetWidth * (currentPos)}px)`;
  checkButtons();
}

const slideLeft = () => {
  currentPos -=1;
  inner.style.transform = `translateX(-${inner.offsetWidth * (currentPos)}px)`;
  checkButtons();
}

const checkButtons = () => {
  if (currentPos === 0) {
    arrowLeft.style.display = 'none';
  } else {
    arrowLeft.style.display = '';
  }

  if (currentPos === slides - 1) {
    arrowRight.style.display = 'none';
  } else {
    arrowRight.style.display = '';
  }
}

checkButtons();
arrowLeft.addEventListener('click', slideLeft);
arrowRight.addEventListener('click', slideRight);

}
