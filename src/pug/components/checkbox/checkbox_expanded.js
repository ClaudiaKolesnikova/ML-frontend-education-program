const expandableCheckboxList = document.querySelector('.checkbox_expanded');
const checkboxTitle = expandableCheckboxList.querySelector('.checkbox__title');
const checkboxIcon = expandableCheckboxList.querySelector('.icon_expanded');
const checkboxList = expandableCheckboxList.querySelector('.checkbox__list');

checkboxTitle.addEventListener('click', () => {
  if(checkboxIcon.classList.contains('icon_expanded')) { 
    checkboxIcon.classList.remove('icon_expanded');
    checkboxList.style.display = 'none';
  } else {
    checkboxIcon.classList.add('icon_expanded');
    checkboxList.style.display = 'block'
  }
});