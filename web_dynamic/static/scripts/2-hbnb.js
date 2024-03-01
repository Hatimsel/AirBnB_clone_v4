document.addEventListener('DOMContentLoaded', () => {
  const apiStatus = $('div#api_status');

  $.ajax('http://0.0.0.0:5001/api/v1/status').done(function (data) {
    if (data.status === 'OK') {
      apiStatus.addClass('available');
    } else {
      apiStatus.removeClass('available');
    }
  });

  const checkbox = $('input');
  const divAmenities = $('DIV.amenities');
  const h4 = divAmenities.find('h4');
  let checkedAmenities = [];

  checkbox.on('click', () => {
  if (checkbox.is(':checked')) {
    checkedAmenities.push(checkbox.attr('data-id'));
    console.log(checkedAmenities);
  } else {
    const index = checkedAmenities.indexOf(checkbox.attr('data-id'));
    if (index !== -1) {
      checkedAmenities.splice(index, 1);
    }
    console.log(checkedAmenities);
  }
  })

  for (const amenity of checkedAmenities) {
    const li = $('<li>').text(amenity);
    h4.append(li);
  }
});
