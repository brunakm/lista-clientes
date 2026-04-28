const apiUrl = "https://crudcrud.com/api/50d325f75d114e32ac856086e5501f34/clientes";

const form = document.getElementById("form-cliente");
const listaClientes = document.getElementById("lista-clientes");

// listar clientes
async function carregarClientes() {
    listaClientes.innerHTML = "";
    try {
        const resposta = await fetch(apiUrl);

        const clientes = await resposta.json();

        clientes.forEach(clientes => {
            const li =  document.createElement("li");

            li.innerHTML = `
                <div>
                    <strong>${clientes.nome}</strong><br>
                    ${clientes.email}
                </div>

                <button class="excluir">
                    Excluir
                </button>
            `;

            // botão de excluir
            li.querySelector("button").addEventListener("click", () => {
                excluCliente(clientes._id);
            });

            listaClientes.appendChild(li);
        });
    } catch (erro) {
        console.log("Erro ao carregar cleintes", erro);
    }
}

// cadastrar clientes
form.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const nome = document.getElementById("nome").value;

    const email = document.getElementById("email").value;

    const novoCliente = {
        nome, email
    };

    try {
      await fetch(apiUrl, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(novoCliente)
        });

        form.reset();

        carregarClientes();
    } catch (erro) {
        console.log("Erro ao cadastrar cliente", erro);
    }
});

// excluir clientes
async function excluCliente(id) {
    try {
        await fetch(`${apiUrl}/${id}`, {
            method: "DELETE"
        });

        carregarClientes();
    } catch (erro) {
        console.log("Erro  ao excluir cliente", erro);
    }
}

// carregar clientes ao abrir a página
carregarClientes();