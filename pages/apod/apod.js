$(document).ready(
  function () {
    $("#view_button").click(getPicture);
  });

  function getPicture () {
    $.ajax({
      url: "https://api.nasa.gov/planetary/apod",
      type: "GET",
      data: { api_key: "Q4HZ3vTP3HQdbocUoZBa3H2Vy2cbv1Hqvhbeongx",
      date: $("#date").val() },
      dataType: "json",
      "success": showPicture,
      "error": noPicture
    });
  };

  function showPicture(data) {
    $("#title").text(`Title: ${data.title}`);
    $("#pic").attr("src", data.url);
  };

  function noPicture(error) {
    alert(error.responseText);
  };