const expandableCheckboxList = document.querySelector('.expandable-checkbox-list');
const checkboxTitle = expandableCheckboxList.querySelector('.checkbox-title');
const checkboxIcon = expandableCheckboxList.querySelector('.checkbox-title__icon');
const checkboxList = expandableCheckboxList.querySelector('.checkbox-list');

checkboxTitle.addEventListener('click', () => {
  if(checkboxIcon.classList.contains('checkbox-title__icon_expanded')) { 
    checkboxIcon.classList.remove('checkbox-title__icon_expanded');
    checkboxList.style.display = 'none';
  } else {
    checkboxIcon.classList.add('checkbox-title__icon_expanded');
    checkboxList.style.display = 'block'
  }
});