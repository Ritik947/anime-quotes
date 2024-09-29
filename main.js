(async () => {
  try {
    let btn = document.getElementById("btn-submit");
    let next_btn = document.getElementById("next-quote")
    btn.addEventListener("click", () => {
      btn.classList.toggle("invisible");
      next_btn.classList.toggle("invisible");
      showQuote();
    });
    next_btn.addEventListener("click", () => {
      reloadQuote();
    });
  }
  catch (error) {
    console.error(error)
  }
}) ();

async function fetchQuote() {
    const url = 'https://animechan.io/api/v1/quotes/random';
    const options = {cache: "no-cache"}
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`, options);
    if (response.status != 200) {
      console.log("Encountered an error \n Code " + response.status);
      return;
    }
    const data = await response.json();
    const quote_data = JSON.parse(data.contents).data;
    return  quote_data;
}

async function showQuote() {
    const quote_data = await fetchQuote();
    let wrap = document.getElementById("wrapper")
    let box = document.createElement("div");
    let source = document.createElement("div");
    source.id = "source";
    box.id = "quote";
    wrap.appendChild(box);
    box.innerText = quote_data.content;
    wrap.appendChild(source);
    source.innerHTML = quote_data.character.name + "<br/>(" + quote_data.anime.name + ")";
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
}

async function reloadQuote() {
  const quote_data = await fetchQuote();
  let box = document.getElementById("quote");
  let source = document.getElementById("source");
  box.innerText = quote_data.conten;
  source.innerHTML = quote_data.character.name + "<br/>(" + quote_data.anime.name + ")";
}

// async function get_config(request) {
//   const response = await fetch(request);
//   const body = await response.json();
//   return body;
// }