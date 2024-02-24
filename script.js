document.addEventListener("DOMContentLoaded", function () {
    const planetsContainer = document.getElementById("planetsContainer");
    const paginationContainer = document.getElementById("paginationContainer");
  
    let nextUrl = "https://swapi.dev/api/planets/?format=json";
  
    const fetchPlanets = async (url) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        displayPlanets(data.results);
        displayPagination(data.next);
      } catch (error) {
        console.error("Error fetching planets:", error);
      }
    };
  
    const displayPlanets = (planets) => {
      planetsContainer.innerHTML = "";
      planets.forEach((planet) => {
        const residents = planet.residents.join(", ");
        const planetCard = `
          <div class="col-md-4 mb-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${planet.name}</h5>
                <p class="card-text"><strong>Climate:</strong> ${planet.climate}</p>
                <p class="card-text"><strong>Population:</strong> ${planet.population}</p>
                <p class="card-text"><strong>Terrain:</strong> ${planet.terrain}</p>
                <p class="card-text"><strong>Notable Residents:</strong> ${residents}</p>
              </div>
            </div>
          </div>
        `;
        planetsContainer.innerHTML += planetCard;
      });
    };
  
    const displayPagination = (next) => {
      paginationContainer.innerHTML = "";
      if (next) {
        const nextPage = document.createElement("button");
        nextPage.classList.add("btn", "btn-primary");
        nextPage.textContent = "Next";
        nextPage.addEventListener("click", () => {
          nextUrl = next;
          fetchPlanets(next);
        });
        paginationContainer.appendChild(nextPage);
      }
    };
  
    fetchPlanets(nextUrl);
  });
  