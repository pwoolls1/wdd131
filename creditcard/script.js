const theForm = document.querySelector('#creditCardForm');

function displayError(msg) {
  document.querySelector('.errors').textContent = msg;
}

function isCardNumberValid(number) {
  // Only accept this exact number
  return number === '1234123412341234';
}

function submitHandler(event) {
  event.preventDefault();
  let errorMsg = '';
  displayError('');

  const cardNumber = document.querySelector('#cardNumber').value.trim();
  const expYear = Number(document.querySelector('#year').value);
  const expMonth = Number(document.querySelector('#month').value);

  // Check card number format
  if (!/^\d{16}$/.test(cardNumber)) {
    errorMsg += 'Card number must be 16 digits\n';
  } else if (!isCardNumberValid(cardNumber)) {
    errorMsg += 'Card number is not valid\n';
  }

  // Check expiration
  const currentDate = new Date();
  const fullYear = 2000 + expYear;

  if (
    fullYear < currentDate.getFullYear() ||
    (fullYear === currentDate.getFullYear() &&
      expMonth <= currentDate.getMonth())
  ) {
    errorMsg += 'Card is expired\n';
  }

  if (errorMsg !== '') {
    displayError(errorMsg);
    return;
  }

  // Success message
  theForm.innerHTML = '<h2>Payment Successful! 🎉</h2>';
}

theForm.addEventListener('submit', submitHandler);