const container = document.getElementById("container");

async function getRandomPerson() {
  try {
    const server = "https://randomuser.me/api";
    const response = await fetch(server, {
      method: "GET",
    });

    const responseResult = await response.json();
    return responseResult.results[0];
  } catch (error) {
    console.error("Error fetching random user:", error);
  }
}

async function add() {
  const person = await getRandomPerson();

  const temple = `
    <div class="card">
        <img src="${person.picture.large}" class="card-img-top" alt="error">
        <div class="card-body">
            <p class="card-text"><b>Cell:</b><br>${person.cell}</p>
            <p class="card-text"><b>Country:</b><br>${person.location.country}</p>
            <p class="card-text"><b>Email:</b><br>${person.email}</p>
            <p class="card-text"><b>Coordinates:</b><br>[${person.location.coordinates.latitude}; ${person.location.coordinates.longitude}]</p>
        </div>
    </div>`;

  container.insertAdjacentHTML("afterbegin", temple);
}

function del() {
  container.innerHTML = "";
}

add();
