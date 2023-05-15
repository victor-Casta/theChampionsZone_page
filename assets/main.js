const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "8bb1cd3413msh6dbffa5cf292ab2p143d1djsn27ae3c2d3cd2",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

const content = document.getElementById("content");

async function fetchPlaylistVideos() {
  try {
    const response = await fetch(
      "https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=PLTRckBbIqcx3Y5auh3xtQI0V6kYs2BZ9r&part=snippet&maxResults=20",
      options
    );

    const data = await response.json();
    const videos = data.items;

    let view = "";

    videos.forEach((video) => {
      const videoTitle = video.snippet.title;
      const videoThumbnail = video.snippet.thumbnails.high.url;
      const videoId = video.snippet.resourceId.videoId;

      view += `
          <div class="group relative">
          <div
            class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${videoThumbnail}" alt="${videoTitle}" class="w-full">
          </div>
          <div class="mt-4 flex justify-between cursor-pointer">
            <h3 class="text-sm text-gray-700">
            <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
              <span aria-hidden="true" class="absolute inset-0"></span>
              ${videoTitle}
              </a>
            </h3>
          </div>
        </div>
        `;
    });

    content.innerHTML = view;
  } catch (error) {
    console.error(error);
  }
}

fetchPlaylistVideos();

