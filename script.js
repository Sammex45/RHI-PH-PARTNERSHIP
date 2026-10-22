const partnerForm = document.querySelector('#partner-form');
const formStatus = document.querySelector('#form-status');
const submitButton = partnerForm.querySelector('button[type="submit"]');

partnerForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(partnerForm).entries());
  data._subject = `Port Harcourt partnership form — ${data.fullName}`;
  data._template = 'table';

  submitButton.disabled = true;
  formStatus.textContent = 'Sending your partnership form…';

  try {
    const response = await fetch('https://formsubmit.co/ajax/revivalhubph1@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok || result.success !== 'true') {
      throw new Error(result.message || 'The form could not be sent.');
    }

    formStatus.textContent = 'Thank you. Your partnership form has been sent successfully.';
    partnerForm.reset();
  } catch (error) {
    formStatus.textContent = 'We could not send your form right now. Please try again or email revivalhubph1@gmail.com.';
  } finally {
    submitButton.disabled = false;
  }
});
