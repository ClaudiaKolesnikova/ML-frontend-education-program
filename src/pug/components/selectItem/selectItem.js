const selectRoom = document.querySelector('#roomSelect');
const selectGuest = document.querySelector('#guestSelect');

const roomElements = getElements(selectRoom);
const guestElements = getElements(selectGuest);

const state = {
  rooms: {
    bedroom: 2,
    bed: 2,
    bathroom: 0,
  },
  guests: {
    adult: 2,
    child: 0,
    infant: 0,
  }
}

changeCurrentOption();

roomElements.itemRound.forEach(item => {
  item.addEventListener('click', changeNumber);
});

guestElements.itemRound.forEach(item => {
  item.addEventListener('click', changeNumber);
});

function getElements(select) {
  const selectHeader = select.querySelector('.select__header');
  const itemRound = select.querySelectorAll('.item__round');
  const apply = select.querySelector('.select__apply');
  const clear = select.querySelector('.select__clear');
  return {selectHeader, itemRound, apply, clear};
}

function clearNumberOptions(select, state, elements) {
  const numbers = select.querySelectorAll('.item__number');
  numbers.forEach(item => item.innerText = 0);

  Object.keys(state).forEach((key) => state[key] = 0);

  hideClearButton(elements);
}

function showApplyButton(elements) {
  elements.apply.classList.add('is-active');
}

function showClearButton(elements) {
  elements.clear.classList.add('is-active');
}

function hideClearButton(elements) {
  elements.clear.classList.remove('is-active');
}

function selectToggle() {
  this.parentElement.classList.toggle('is-active');
}

function changeCurrentOption() {
  const textCurrentRoom = `${state.rooms.bedroom} спальни, ${state.rooms.bed} кровати, ${state.rooms.bathroom} ванные комнаты`;
  const currentElemenetRoom = selectRoom.querySelector('.select__current');
  currentElemenetRoom.innerText = textCurrentRoom;

  let textCurrentGuest = `${state.guests.adult + state.guests.child} гостя, ${state.guests.infant} младенец`;
   if(!Object.values(state.guests).reduce((accum, curr) => accum + curr, 0)) {
    textCurrentGuest = 'Сколько гостей';
  } else if(!state.guests.infant) {
    textCurrentGuest = `${state.guests.adult + state.guests.child} гостя`;
  }

  const currentElemenetGuest = selectGuest.querySelector('.select__current');
  currentElemenetGuest.innerText = textCurrentGuest;
}

function changeNumber() {
  const operation = this.dataset.operation;
  const dataType = this.parentElement.dataset.datatype;
  const option = this.parentElement.dataset.option;
  const currentNumberElem = this.parentElement.querySelector('.item__number');
  let numberValue;

  if(operation === "minus") {
    numberValue = state[dataType][option] ? --state[dataType][option] : 0;
  } else if (operation === "plus") {
    numberValue = ++state[dataType][option];
  }

  currentNumberElem.innerText = numberValue;

  if(["bedroom", "bed", "bathroom"].includes(option)) {
    showApplyButton(roomElements);

    if(Object.values(state.rooms).reduce((accum, curr) => accum + curr, 0)) {
      showClearButton(roomElements);
    } else {
      hideClearButton(roomElements);
    }
  } else if(["adult", "child", "infant"].includes(option)) {
    showApplyButton(guestElements);

    if(Object.values(state.guests).reduce((accum, curr) => accum + curr, 0)) {
      showClearButton(guestElements);
    } else {
      hideClearButton(guestElements);
    }
  }
  changeCurrentOption();
}

roomElements.selectHeader.addEventListener('click', selectToggle);
guestElements.selectHeader.addEventListener('click', selectToggle);

roomElements.clear.addEventListener('click', () => clearNumberOptions(selectRoom, state.rooms, roomElements));
guestElements.clear.addEventListener('click', () => clearNumberOptions(selectGuest, state.guests, guestElements));

roomElements.apply.addEventListener('click', function() {
  changeCurrentOption();

  selectRoom.classList.remove('is-active');
})

guestElements.apply.addEventListener('click', function() {
  changeCurrentOption();

  selectGuest.classList.remove('is-active');
})