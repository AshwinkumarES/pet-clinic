
document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.getElementById('timeSlotDropdown');
  const selected = document.getElementById('selectedTimeSlot');
  const optionsContainer = dropdown.querySelector('.dropdown-options');
  const optionsList = optionsContainer.querySelectorAll('.dropdown-option');

  selected.addEventListener('click', () => {
    optionsContainer.style.display = optionsContainer.style.display === 'block' ? 'none' : 'block';
  });

  optionsList.forEach(option => {
    option.addEventListener('click', () => {
      selected.textContent = option.textContent;
      optionsContainer.style.display = 'none';
      optionsList.forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
    });
  });


  document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target)) {
      optionsContainer.style.display = 'none';
    }
  });
});


const availDoctor =document.getElementById('type');

const submit=document.querySelector('.js-form-submit');
submit.addEventListener('click',(e)=>{

  const Doctor =availDoctor.value;

  localStorage.setItem('doctorId',Doctor);
})