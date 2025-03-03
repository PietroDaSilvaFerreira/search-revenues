const chave = "JWPLM5kfakEMUADp91yudg==WBBt25jvhUZm3hBB";

async function searchRecipe(recipe) {
    const site = `https://api.api-ninjas.com/v1/recipe?query=${recipe}`;

    try {
        const resp = await fetch(site, {
            method: "GET",
            headers: { "X-Api-Key": chave }
        });

        if (!resp.ok) {
            throw new Error(`Erro ${resp.status}: ${resp.statusText}`);
        }

        const obj = await resp.json();
        console.log(obj);
        exibirReceitas(obj);
    } catch (erro) {
        console.error("Erro ao buscar receita:", erro);
    }
}

function exibirReceitas(receitas) {
    const conteiner = document.querySelector(".resultados");
    conteiner.innerHTML = "";

    if (receitas.length === 0) {
        conteiner.innerHTML = "<p class='error'>Nenhuma Receita Encontrada.</p>";
        return;
    } else {
        conteiner.innerHTML = `<p class='number-results'>Resultados Encontrados ${receitas.length}</p>`
    }

    receitas.forEach(receita => {
        const div = document.createElement("div");
        div.classList.add("receita");

        div.innerHTML = `
            <h3>${receita.title}</h3>
            <br>
            <p><strong>Ingredientes:</strong> ${receita.ingredients}</p>
            <br>
            <p><strong>Instruções:</strong> ${receita.instructions}</p>
            <br>
            <p><strong>Porções:</strong> ${receita.servings}</p>
        `;

        conteiner.appendChild(div);
    });
}

function clickButton() {
    const botao = document.querySelector(".lupa");
    const input = document.querySelector(".barra-de-pesquisa");

    botao.addEventListener("click", function () {
        let receita = input.value.trim();
        if (receita) searchRecipe(receita);
    });

    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            let receita = input.value.trim();
            if (receita) searchRecipe(receita);
        }
    });
}

clickButton();

function voltarAoTopo() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}