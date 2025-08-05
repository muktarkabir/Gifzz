const picture = document.querySelector("img");
const searchBox = document.querySelector("input");
searchBox.value = "Spider man";

const fetchButton = document.querySelector("button");
window.onload = fetchGif(searchBox.value,picture);
fetchButton.addEventListener("click", function () {
  if (searchBox.value == "" || this.classList.contains("inactive")) return;
  fetchGif(searchBox.value, picture);
});
//TODO: Add download gif functionality.

async function fetchGif(serchItem, img) {
  const baseUrl = "https://api.giphy.com/v1/gifs/translate?";
  const params = new URLSearchParams({
    api_key: "ljAkFGcbOLgGmMiRpo50W7sZxNWYxlsv",
    s: serchItem,
    weirdness: 4,
  });
  const request = new Request(`${baseUrl}${params}`, {
    mode: "cors",
    method: "GET",
  });
  fetchButton.classList.add("inactive");
  img.src = "assets/loading.webp";

  try {
    const responseData = await fetch(request);
    if (responseData.status != 200) {
      if (responseData.status == 429) {
        throw new Error(`${responseData.status} API rate limit exceeded`);
      }
      throw new Error(`${responseData.status}`);
    }
    const jsonData = await responseData.json();
    if (jsonData.data.length == 0) {
      throw new Error(`Nothing found`);
    }
    img.src = jsonData.data.images.original.url;
    fetchButton.classList.remove("inactive");
  } catch (error) {
    console.error(error);
    img.src = "assets/localhost-file-not-found.jpg";
    fetchButton.classList.remove("inactive");
  }
}
