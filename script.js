const picture = document.querySelector("img");
const searchBox = document.querySelector("input");
searchBox.value = "Spider man";

const fetchButton = document.querySelector("button");
// window.onload = fetchGif(searchBox.value,picture);
fetchButton.addEventListener("click", () => {
  if (searchBox.value == "") return;
  fetchGif(searchBox.value, picture);
});

function fetchGif(serchItem, img) {
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
  img.src = "loading.webp";

  fetch(request)
    .then(function (response) {
      console.log(response.status);
      if (response.status != 200) {
        throw new Error("re");
      }
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status}`);
      }
    })
    .then(function (response) {
      console.log(response.meta);

      img.src = response.data.images.original.url;
    })
    .catch(function (error) {
      console.log(error);
      img.src = "localhost-file-not-found.jpg";
    });
}
