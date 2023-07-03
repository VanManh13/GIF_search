const GIPHY_KEY = 'ASsWZ0gcuUrRWSAJQrrSCM7rgBhxolXY';

(function () {
  function giphySearch(keyword) {
    return fetch(`http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${GIPHY_KEY}&limit=1`)
      .then(response => response.json());
  }

  function appendImage(img) {
    let div = document.createElement('div');
    div.classList.add('img-wrapper');

    let innerDiv = document.createElement('div');
    innerDiv.classList.add('inner');
    innerDiv.appendChild(img);

    div.appendChild(innerDiv);
    document.getElementById('thumbs').appendChild(div);
  }

  document.getElementById('searchForm').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    let input = document.getElementById('searchInput');
    await main(input.value);
  });

  async function main(keyword) {
    const result = await giphySearch(keyword);

    let promises = [];
    result.data.forEach(gif => {
      let img = document.createElement('img');
      img.src = gif.images.original.url;

      promises.push(new Promise((resolve, reject) => {
        img.onload = resolve;
      }));

      appendImage(img);
    });

    await Promise.all(promises);
  }
})();