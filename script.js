const img = document.querySelector("img");
console.log(img);

fetch(
  "https://api.giphy.com/v1/gifs/translate?api_key=ljAkFGcbOLgGmMiRpo50W7sZxNWYxlsv&s=flying sausage",
  { mode: "cors" }
).then(function (response) {
    return response.json();
  }).then(function (response) {
    console.log(response);
    
    img.src = response.data.images.original.url;
  });
