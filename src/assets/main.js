const urlVideos =
  "https://youtube-v31.p.rapidapi.com/search?channelId=UCX6OQ3DkcsbYNE6H8uQQuVA&part=snippet%2Cid&order=date&maxResults=10";
const urlChannel =
  "https://youtube-v31.p.rapidapi.com/channels?part=snippet%2Cstatistics&id=UCX6OQ3DkcsbYNE6H8uQQuVA";

const content = null || document.getElementById("content");
const description = null || document.querySelector("#description");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": undefined,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

(async () => {
  // prettier-ignore
  try {
    const videos = await fetchData(urlVideos);
    let view = videos.items.map(
      (video) =>
        `<div class="group relative">
        <div class="aspect-w-1 aspect-h-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
          <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full" />
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${video.snippet.title}
          </h3>
        </div>
      </div>`
    ).join("");
    content.innerHTML = view;
  
    const channel = await fetchData(urlChannel);
    const info = channel.items[0].snippet.description;
    description.innerHTML = info;
  } catch (error) {
    console.log(error);
  }
})();
