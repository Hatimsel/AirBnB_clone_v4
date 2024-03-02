document.addEventListener('DOMContentLoaded', () => {
  const button = $(':button');

  button.on('click', () => {
    let amenities = {'amenities': clicked};

    $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        data: JSON.stringify(amenities),
        contentType: 'application/json',
        dataType: 'json',
        success: (data) => {
            $('.places article').remove();

            data.forEach((place) => {
                var placeInfo = '<article>' +
                    '<div class="title"><h2>' + place.name + '</h2><div class="price_by_night">' + place.price_by_night + '</div></div>' +
                    '<div class="information">' +
                    '<div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + place.max_guest + ' Guests</div>' +
                    '<div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + place.number_rooms + ' Bedrooms</div>' +
                    '<div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + place.number_bathrooms + ' Bathroom</div>' +
                    '</div>' +
                    '<div class="user"><div class="description">' + place.description + '</div></article>';

                $('.places').append(placeInfo);
            });
        }
    });
  });

  const apiStatus = $('div#api_status');

  $.ajax('http://0.0.0.0:5001/api/v1/status').done(function (response) {
    if (response.status === 'OK') {
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

  $.ajax({url: 'http://0.0.0.0:5001/api/v1/places_search/',
  type: 'POST', data: '{}', contentType: 'application/json',
  dataType: 'json', success: (data) => {
      data.foreach((place) => {
        let placeInfo = '<article>' +
                '<div class="title"><h2>' + place.name + '</h2><div class="price_by_night">' + place.price_by_night + '</div></div>' +
                '<div class="information">' +
                '<div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + place.max_guest + ' Guests</div>' +
                '<div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + place.number_rooms + ' Bedrooms</div>' +
                '<div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + place.number_bathrooms + ' Bathroom</div>' +
                '</div>' +
                '<div class="user"><div class="description">' + place.description + '</div></article>';
            $('.places').append(placeInfo);
      })
    });
});
