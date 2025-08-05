const picture = document.querySelector("img");
const searchBox = document.querySelector("input");
searchBox.value = "Spider man";

const fetchButton = document.querySelector("button");
// window.onload = fetchGif(searchBox.value,picture);
fetchButton.addEventListener("click", function () {
  if (searchBox.value == "" || this.classList.contains("inactive")) return;
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
  img.src = "assets/loading.webp";
  fetchButton.classList.add("inactive");

  fetch(request)
    .then(function (response) {
      console.log(response.status);
      if (response.status != 200) {
        if (response.status == 429){
          throw new Error(`${response.status} API rate limit exceeded`);
          
        }
        throw new Error(`${response.status}`);
      }
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status}`);
      }
    })
    .then(function (response) {
      img.src = response.data.images.original.url;
      fetchButton.classList.remove("inactive");
    })
    .catch(function (error) {
      console.log(error);
      img.src = "assets/localhost-file-not-found.jpg";
      fetchButton.classList.remove("inactive");
    });
}
