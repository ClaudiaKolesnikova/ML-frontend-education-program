let selectRoom = document.querySelector('#roomSelect');
let selectGuest = document.querySelector('#guestSelect');

function getElements(select) {
  let selectHeader = select.querySelector('.select__header');
  let itemRound = select.querySelectorAll('.item__round');
  let apply = select.querySelector('.select__apply');
  let clear = select.querySelector('.select__clear');
  return {selectHeader, itemRound, apply, clear};
}

let roomElements = getElements(selectRoom);
let guestElements = getElements(selectGuest);

let bedroomNumber = 2;
let bedNumber = 2;
let bathroomNumber = 0;

let adultNumber = 2;
let childrenNumber = 0;
let infantNumber = 0;

changeCurrentOption();

roomElements.selectHeader.addEventListener('click', selectToggle);
guestElements.selectHeader.addEventListener('click', selectToggle);

roomElements.itemRound.forEach(item => {
    item.addEventListener('click', changeNumber)
});

guestElements.itemRound.forEach(item => {
    item.addEventListener('click', changeNumber)
});

roomElements.clear.addEventListener('click', clearRoomOptions);
guestElements.clear.addEventListener('click', clearGuestOptions);

function clearRoomOptions() {
  let numbers = selectRoom.querySelectorAll('.item__number');
  numbers.forEach(item => item.innerText = 0);

  bedroomNumber = bedNumber = bathroomNumber = 0;

  hideClearButton(roomElements);
}

function clearGuestOptions() {
  let numbers = selectGuest.querySelectorAll('.item__number');
  numbers.forEach(item => item.innerText = 0);

  adultNumber = childrenNumber = infantNumber = 0;

  hideClearButton(guestElements);
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
  let textCurrentRoom = `${bedroomNumber} спальни, ${bedNumber} кровати, ${bathroomNumber} ванные комнаты`;
  let currentElemenetRoom = selectRoom.querySelector('.select__current');
  currentElemenetRoom.innerText = textCurrentRoom;

  let textCurrentGuest = `${adultNumber + childrenNumber} гостя, ${infantNumber} младенец`;
  if(infantNumber == 0) {
    textCurrentGuest = `${adultNumber + childrenNumber} гостя`;
  }
  let currentElemenetGuest = selectGuest.querySelector('.select__current');
  currentElemenetGuest.innerText = textCurrentGuest;
}

function changeNumber() {
  let operation = this.dataset.operation;
  let option = this.parentElement.dataset.option;
  let currentNumberElem = this.parentElement.querySelector('.item__number');
  let numberValue;

  if(operation === "minus") {
    if(option === "bedroom") {
      numberValue = bedroomNumber > 0 ? --bedroomNumber : 0;
    } else if(option === "bed") {
      numberValue = bedNumber > 0 ? --bedNumber : 0;
    } else if(option === "bathroom") {
      numberValue = bathroomNumber > 0 ? --bathroomNumber : 0;
    } else if(option === "adult") {
      numberValue = adultNumber > 0 ? --adultNumber : 0;
    } else if(option === "child") {
      numberValue = childrenNumber > 0 ? --childrenNumber : 0;
    } else if(option === "infant") {
      numberValue = infantNumber > 0 ? --infantNumber : 0;
    }
  } else if (operation === "plus") {
    if(option === "bedroom") {
      numberValue = ++bedroomNumber;
    } else if(option === "bed") {
      numberValue = ++bedNumber;
    } else if(option === "bathroom") {
      numberValue = ++bathroomNumber;
    } else if(option === "adult") {
      numberValue = ++adultNumber;
    } else if(option === "child") {
      numberValue = ++childrenNumber;
    } else if(option === "infant") {
      numberValue = ++infantNumber;
    }
  }
  currentNumberElem.innerText = numberValue;

  if(option === "bedroom" || option === "bed" || option === "bathroom") {
    showApplyButton(roomElements);

    if(bedroomNumber == 0 && bedNumber == 0 && bathroomNumber == 0) {
      hideClearButton(roomElements);
    } else {
      showClearButton(roomElements);
    }
  } else if(option === "adult" || option === "child" || option === "infant") {
    showApplyButton(guestElements);
    
    if(adultNumber == 0 && childrenNumber == 0 && infantNumber == 0) {
      hideClearButton(guestElements);
    } else {
      showClearButton(guestElements);
    }
  }
}

roomElements.apply.addEventListener('click', function() {
  changeCurrentOption();

  selectRoom.classList.remove('is-active');
})

guestElements.apply.addEventListener('click', function() {
  changeCurrentOption();

  selectGuest.classList.remove('is-active');
})