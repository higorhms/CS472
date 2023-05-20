const API_KEY = `Q4HZ3vTP3HQdbocUoZBa3H2Vy2cbv1Hqvhbeongx`; 

$(document).ready(
  function () {
    $("#view_button").click(getPicture);
  });

  function getPicture () {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${$("#date").val()}`)
    .then(response => response.json())
    .then(showPicture)
    .catch(noPicture);
  };

  function showPicture(data) {
    $("#title").text(`Title: ${data.title}`);
    $("#pic").attr("src", data.url);
  };

  function noPicture(error) {
    console.log(error);
    alert(error.responseText);
  };