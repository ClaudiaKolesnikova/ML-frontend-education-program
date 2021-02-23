import noUiSlider from 'nouislider';

$(function() {
  const sliderRangePrice = document.getElementById('sliderRangePrice');

  noUiSlider.create(sliderRangePrice, {
      start: [5000, 10000],
      connect: true,
      step: 1,
      range: {
          'min': 100,
          'max': 20000
      }
  });

  const priceSliderAmount = document.getElementById('amount');

  sliderRangePrice.noUiSlider.on('update', function (values) {
    values[0] = new Intl.NumberFormat('ru-RU').format(values[0]) + '₽';
    values[1] = new Intl.NumberFormat('ru-RU').format(values[1]) + '₽';
    priceSliderAmount.innerHTML = values.join(' - ');
  });

});