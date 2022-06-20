/*
*   VARIÁVEIS
*/
const caminhoCategorias = `http://localhost:3000/categories`;
const caminhoItems = `http://localhost:3000/items`;
const productsList = [];
/*
*   FUNÇÕES
*/
const GetTotalPrice = async () => {
	let valorTotal = 0;
	for (let produto of productsList) {
		if (produto.GetIsInCart()) {
			valorTotal += produto.GetPriceTotal();
		}
	}
	document.querySelector('cart-bill-number').innerHTML = `$ ${valorTotal}`;
}
const FilterProducts = async (categoria) => {
	const containerProdutos = document.querySelector('itens-container').children;
	for (let produto of containerProdutos) {
		if (categoria == 0) {
			produto.classList.remove('hidden-element');
		} else if (produto.classList.contains(`category-${categoria}`)) {
			produto.classList.remove('hidden-element');
		} else {
			produto.classList.add('hidden-element');
		}
	};
}
const GetCategorys = async () => {
	try {
		const res = await fetch(caminhoCategorias, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json"
			}
		});
		return await res.json();
	} catch (erro) {
		console.log(erro);
	}
}
const DrawCategorias = async () => {
	// Pega as categorias e armazena numa lista
	const categorias = await GetCategorys();
	// Pega o container das categorias
	const categoriaContainer = document.querySelector('category-container');
	// Cria um objeto html para cada categoria na lista
	categorias.forEach(categoria => {
		// Cria o container do botão
		const botaoContainer = document.createElement('span');
		// Insere o container do botão dentro do container das categorias
		categoriaContainer.appendChild(botaoContainer);
		// Cria o elemento botão
		const botao = document.createElement('button');
		// Define o tipo do botão para botao kek
		botao.setAttribute('type', 'button');
		// Adiciona a classe do botão
		botao.setAttribute('class', 'default-button');
		// Define o texto do botão
		botao.innerHTML = `${categoria.name}`;
		// Passa o botão para dentro do container do botão
		botaoContainer.appendChild(botao);
		// Adiciona um gatilho no botão para fazer a filtragem dos produtos
		botaoContainer.addEventListener('click', () => {
			FilterProducts(categoria.id);
		})
	});
}
const GetProducts = async () => {
	fetch(caminhoItems, {
		method: 'GET',
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(response => {
			if (response.ok) {
				return response.json();
			}
		})
		.then(products => {
			for (let item of products) {
				const product = new Product(item.name, item.category, item.price);
				product.DrawProduct();
				productsList.push(product);
			}
			FilterProducts(0);
		})
}
DrawCategorias();
GetProducts();