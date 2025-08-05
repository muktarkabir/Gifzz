const img = document.querySelector("img");
const searchBox = document.querySelector("input");
searchBox.value = "Spider man";

const fetchButton = document.querySelector("button");
// window.onload = fetchGif(searchBox.value);
fetchButton.addEventListener("click", () => {
  if (searchBox.value == "") return;
  fetchGif(searchBox.value);
});

function fetchGif(serchItem) {
  const baseUrl = "https://api.giphy.com/v1/gifs/translate?";
  const params = new URLSearchParams({
    api_key: "ljAkFGcbOLgGmMiRpo50W7sZxNWYxlsv",
    s: serchItem,
    weirdness: 8,
  });
  const request = new Request(`${baseUrl}${params}`, {
    mode: "cors",
    method: "GET",
  });
  img.src = 'loading.webp';
  fetch(request)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);

      img.src = response.data.images.original.url;
    });
}
