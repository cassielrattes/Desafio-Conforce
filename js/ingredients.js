const bodyUrl = "http://localhost:38001";

function changeCoin(coin) {
  return coin.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}

async function getIngredients() {
  const dados = await (await fetch(`${bodyUrl}/ingredient`)).json();
  dados.forEach((r) => {
    document.querySelector(".dados-ingredientes").innerHTML += `
         <tr>
            <td>${r.ingrediente}</td>
            <td>${changeCoin(r.valor)}</td>
            <td>
              <button class="btn btn-warning" onclick="openModalUpdateIngredients('${
                r.id
              }')" data-bs-toggle="modal"
              data-bs-target="#modal-update">EDITAR</button>
            </td>
            <td>
              <button class="btn btn-danger" onclick="deleteIngredients('${
                r.id
              }')">DELETAR</button>
            </td>
          </tr>
      `;
  });
  return dados;
}
getIngredients();

async function postIngredients() {
  const ingrediente = document.querySelector(
    "#cadastrar-ingredientes #ingrediente"
  ).value;
  const valor = +document.querySelector("#cadastrar-ingredientes #valor").value;
  if (ingrediente && valor) {
    await fetch(`${bodyUrl}/ingredient`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        ingrediente,
        valor,
      }),
    });
  }
  return window.location.reload();
}

async function deleteIngredients(id) {
  await fetch(`${bodyUrl}/ingredient/${id}`, {
    method: "DELETE",
  });
  return window.location.reload();
}

async function openModalUpdateIngredients(id) {
  const dados = await (await fetch(`${bodyUrl}/ingredient/${id}`)).json();
  document.querySelector(".modal-content").innerHTML = `
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Ingrediente: ${
          dados.ingrediente
        }</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>

      <form id="modal-ingredientes" class="needs-validation" novalidate>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-12 mb-3">
              <label for="ingrediente" class="form-label">Ingrediente *</label>
              <input
                type="text"
                id="ingrediente"
                class="form-control"
                placeholder="${dados.ingrediente}"
                required
              />
            </div>
             <div class="col-sm-12 mb-3">
              <label for="valor" class="form-label">Valor *</label>
              <input
                type="number"
                id="valor"
                class="form-control"
                placeholder="${changeCoin(dados.valor)}"
                required
              />
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
          <button type="button" class="btn btn-primary" onclick="putIngredients('${
            dados.id
          }')">Save changes</button>
        </div>
      </form>

  `;
}

async function putIngredients(id) {
  const ingrediente = document.querySelector("#modal-ingredientes #ingrediente")
    .value;
  const valor = +document.querySelector("#modal-ingredientes #valor").value;
  if (ingrediente && valor) {
    await fetch(`${bodyUrl}/ingredient/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        ingrediente,
        valor,
      }),
    });
  }
  return window.location.reload();
}
