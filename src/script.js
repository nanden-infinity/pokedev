const input = document.querySelector(".search");
input.addEventListener("keyup", (e) => {
  let searchTerm = Number(e.target.value);

  const url = `https://pokeapi.co/api/v2/pokemon?limit=${searchTerm}`;
  pegarDados(url);
});
async function pegarDados(dadosUrl) {
  const response = await (await fetch(dadosUrl)).json();
  const { results } = response;
  results.map(async ({ name, url }) => {
    const dadosPokemon = await (await fetch(url)).json();
    const {
      sprites: { front_default },
      types,
    } = dadosPokemon;

    puxarDados(name, front_default, types);
  });
}

function puxarDados(name, front_default, types) {
  const container = document.querySelector(".card--container div");
  const html =
    `  <div class="card bg-slate-100 p-4   border-2 hover:scale-105 hover:bg-header--color transition-all duration-300 ease-in-out group">
              <div class="flex justify-center items-center h-20 w-20"><img src="${front_default}" class="w-full h-full scale-120 object-cover" alt="" /></div>
              <h3 class="text-2xl font-bold font-mono group-hover:text-white">${name}</h3>
              <p class="text-sm  group-hover:font-bold  group-hover:text-gray-800">${types.map((type) => type.type.name).join(", ")}</p>
            </div>
            `.trim();
  container.insertAdjacentHTML("afterbegin", html);

  container.classList.add(
    "container",
    "mt-4",
    "mx-auto",
    "grid",
    "grid-cols-4",
    "gap-4",
    "iteams-center",
    "*:cursor-pointer",
    "*:rounded-md"
  );
}

pegarDados("https://pokeapi.co/api/v2/pokemon?limit=10");

const btnLogin = document.querySelector(".btn--login");
const modalContainer = document.querySelector(".modal--container");
const overlay = document.querySelector(".app").nextElementSibling;
btnLogin.addEventListener("click", () => {
  console.log(modalContainer);

  modalContainer.innerHTML = `
    <div class="modal bg-white p-4 rounded-md shadow-lg inset-12 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96">
      <h2 class="text-2xl font-bold mb-4">Login</h2>\
      <form>
        <input type="text" placeholder="Username" class="w-full p-2 mb-2 border rounded" required />
        <input type="password" placeholder="Password" class="w-full p-2 mb-4 border rounded" required />
        <button type="submit" class="bg-header--color text-white p-2 rounded">Login</button>
      </form>
      <button class="close-modal mt-4 text-red-500">Close</button>
    </div>
  `;
  if (modalContainer) {
    console.log(overlay);
    overlay.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
    document.querySelector(".app").innerHTML = "";
    document.querySelector(".close-modal").addEventListener("click", () => {
      modalContainer.style.display = "none";
      overlay.classList.add("hidden");

      document.body.innerHTML += `<div class="fixed inset-0 flex flex-col space-y-1 h-screen items-center justify-center bg-white bg-opacity-80 z-50">
        <svg class="animate-spin  h-12 w-12 text-header--color" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        <p class="text-header--color text-center">Loading...</p>
      </div>`;
      setTimeout(() => {
        location.reload();
      }, Math.random() * 3000); // Match the duration of the transition
    });
  }
});
