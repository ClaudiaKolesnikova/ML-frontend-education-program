import './datepicker.min.js';

const datepickerArrival = $('#datepicker-arrival').datepicker().data('datepicker');
const datepickerDepature = $('#datepicker-depature')[0];

const arrivalInput = $('#arrival-input')[0];
const depatureInput = $('#depature-input')[0];
const parentCard = $('.card-room-reservation')[0];


window.addEventListener('load', () => {
  const datepickersContainer = $('#datepickers-container')[0];
  if(parentCard) {
    parentCard.append(datepickersContainer);

    arrivalInput.click();
  }
})

$('#datepicker-arrival').datepicker({
  range: true,
  clearButton: true,
  navTitles: {
    days: 'MM <i>yyyy</i>'
  },
  onShow: openCalendar,
  onSelect: selectDate,
  onChangeMonth: replaceNavArrows,
});

function openCalendar() {
  const datepickerButtons = $('.datepicker--buttons');

  if(!($('#datepicker-apply').html())) {
    datepickerButtons.append('<span id="datepicker-apply" class="datepicker--apply">Применить</span>');
  }

  $('.datepicker--buttons').on('click', '#datepicker-apply', () => datepickerArrival.hide());

  replaceNavArrows();

  if(parentCard) {
    const datepickerCalendar = $('.datepicker.active')[0];
    datepickerCalendar.style.left = '419px';
    datepickerCalendar.style.top = '-1px';

    const date1 = new Date('2019-08-19');
    const date2 = new Date('2019-08-23');
    datepickerArrival.selectDate([date1,date2]);
  }
}

function selectDate() {
  const date = datepickerArrival.el.value;
  const dateArray = date.split(',');
  const dateArrival = dateArray[0];
  const dateDepature = dateArray[1];

  datepickerArrival.el.value = dateArrival;

  if(dateDepature) {
    datepickerDepature.value = dateDepature;
  } else {
    datepickerDepature.value = "";
  }
}

function replaceNavArrows() {
  const prevNavButton = $('.datepicker--nav-action[data-action="prev"]');
  const nextNavButton = $('.datepicker--nav-action[data-action="next"]');

  const prevButton = $('<div class="material-icons datepicker-icon">arrow_back</div>');
  const nextButton = $('<div class="material-icons datepicker-icon">arrow_forward</div>');

  prevNavButton.children().first().replaceWith(prevButton);
  nextNavButton.children().first().replaceWith(nextButton);
}

arrivalInput.addEventListener('click', () => {
  datepickerArrival.show();
});

depatureInput.addEventListener('click', () => {
  datepickerArrival.show();
});