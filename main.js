(async ()=>{
  let btn = document.getElementById("btn-submit");
  let wrap = document.getElementById("wrapper");
  let config = await get_config("./config.json")
  btn.addEventListener("click", () => {
    btn.classList.toggle("invisible");
    showQuote(config);
  });
})();

function showQuote(config) {
  const url = 'https://animechan.io/api/v1/quotes/random';
  // const url = 'https://anime-quotes2.p.rapidapi.com/api/random';
  // const host = config["applications"]["anime_quotes"]["API_KEYS"][0]["host_name"]
  // const api_key = config["applications"]["anime_quotes"]["API_KEYS"][0]["api_key"]
  // console.log(api_key);
  // const options = {
  //   method: 'GET',
  //   headers: {
  //     'x-rapidapi-key': api_key,
  //     'x-rapidapi-host': host
  //   }
  // };

  fetch(url).then(function (res) {
    if (res.status != 200) {
      console.log("Encountered an error \n Code " + res.status);
      return;
    }
    res.json().then(function (data) {
      let quote = data;
      console.log(quote);
      let box = document.createElement("div");
      let source = document.createElement("div");
      source.id = "source";
      box.id = "quote";
      wrap.appendChild(box);
      box.innerText = quote.content;
      wrap.appendChild(source);
      source.innerHTML = quote.character.name + "<br/>(" + quote.anime.name + ")";
    });
  });
}

async function get_config(request) {
  const response = await fetch(request);
  const body = await response.json();
  return body;
}