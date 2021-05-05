const bodyUrl = "http://localhost:38001";

async function showCheckboxes(button, checkbox) {
  const selectBox = document.querySelector(`${button}`);
  const checkboxes = document.querySelector(`${checkbox}`);
  selectBox.addEventListener("click", () => {
    checkboxes.classList.toggle("ativo");
  });
  const dados = await (await fetch(`${bodyUrl}/ingredient`)).json();
  dados.forEach((r) => {
    document.querySelector(`${checkbox}`).innerHTML += `
      <div class="form-check m-2">
        <input
          class="form-check-input"
          type="checkbox"
          id="${r.ingrediente}"
          value="${r.ingrediente}"
        />
        <label class="form-check-label" for="${r.ingrediente}">
          ${r.ingrediente}
        </label>
      </div>
      `;
  });
  return dados;
}
showCheckboxes(".selectBox", "#checkboxes");

function checkboxIngredients(query) {
  const ingredientsCheck = document.querySelectorAll(`${query}`);
  const ingredientes = [];
  ingredientsCheck.forEach((e) => {
    if (e.checked) {
      ingredientes.push(e.value);
    }
  });
  return ingredientes;
}

async function getLunchs() {
  const dados = await (await fetch(`${bodyUrl}/lunch`)).json();
  dados.forEach((r) => {
    document.querySelector(".dados-lanches").innerHTML += `
        <tr>
          <td>${r.lanche}</td>
          <td>${r.ingredientes}</td>
          <td>
            <button class="btn btn-warning" onclick="openModalUpdateLunch('${r.id}')" data-bs-toggle="modal"
            data-bs-target="#modal-update">EDITAR</button>
          </td>
          <td>
            <button class="btn btn-danger" onclick="deleteLunch('${r.id}')">DELETAR</button>
          </td>
        </tr>
      `;
  });
  return dados;
}
getLunchs();

async function deleteLunch(id) {
  await fetch(`${bodyUrl}/lunch/${id}`, {
    method: "DELETE",
  });
  return window.location.reload();
}

async function postLunchs() {
  const lanche = document.querySelector("#cadastrar-lanches #lanche").value;
  const ingredientes = checkboxIngredients("#checkboxes input");
  if (lanche && ingredientes.length > 0) {
    await fetch(`${bodyUrl}/lunch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        lanche,
        ingredientes,
      }),
    });
  }
  return window.location.reload();
}

async function openModalUpdateLunch(id) {
  const dados = await (await fetch(`${bodyUrl}/lunch/${id}`)).json();

  document.querySelector(".modal-content").innerHTML = `
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Ingrediente: ${dados.lanche}</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>

      <form id="modal-lanches" class="needs-validation" novalidate>
        <div class="modal-body">
          <div class="mb-3">
              <label for="lanche" class="form-label">Nome do lanche *</label>
              <input type="text" class="form-control" id="lanche" required />
            </div>
            <div class="mb-3">
              <div class="selectBox">
                <select class="form-select">
                  <option>Selecione os ingredientes *</option>
                </select>
                <div class="overSelect"></div>
              </div>
              <div id="checkboxes">
               
              </div>
            </div>
          </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" onclick="putLunchs('${dados.id}')">Save changes</button>
        </div>
      </form>

  `;

  showCheckboxes("#modal-lanches .selectBox", "#modal-lanches #checkboxes");
  const ingredientes = checkboxIngredients("#modal-lanches #checkboxes input");
  console.log(ingredientes);
}

async function putLunchs(id) {
  const lanche = document.querySelector("#modal-lanches #lanche").value;
  const ingredientes = checkboxIngredients("#modal-lanches #checkboxes input");
  console.log(ingredientes);
  if (lanche && ingredientes.length > 0) {
    await fetch(`${bodyUrl}/lunch/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        lanche,
        ingredientes,
      }),
    });
  }
  return window.location.reload();
}
