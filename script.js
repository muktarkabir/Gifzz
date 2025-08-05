const img = document.querySelector("img");
const baseUrl = "https://api.giphy.com/v1/gifs/translate?";
const params = new URLSearchParams({api_key:"ljAkFGcbOLgGmMiRpo50W7sZxNWYxlsv",s:"monkey",weirdness:8});
const request = new Request(`${baseUrl}${params}`, {
  mode: "cors",
  method: "GET",
});
fetch(request)
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    console.log(response);

    img.src = response.data.images.original.url;
  });
