class Product {
	#name;
	#category;
	#price;
	#quantity;
	#price_total;
	#isInCart;
	#validForTotal
	constructor(name, category, price) {
		this.#name = name;
		this.#category = category;
		this.#price = price;
		this.#quantity = 0;
		this.#isInCart = false;
		this.#validForTotal = false;
	}
	PutOnCart() {
		if (!this.#isInCart) {
			this.#quantity++;
			this.#validForTotal = true;
			this.#DrawProductCart();
			this.#isInCart = true;
		} else {
			this.AddQuantiy();
		}
	}
	AddQuantiy() {
		this.#quantity++;
		this.#DrawProductCart();
	}
	RemoveQuantiy() {
		this.#quantity--;
		this.#DrawProductCart();
	}
	GetName() {
		return this.#name;
	}
	GetQuantity() {
		return this.#quantity;
	}
	GetIsInCart() {
		return this.#validForTotal;
	}
	GetPriceTotal() {
		return this.#price_total = this.#quantity * this.#price;
	}
	#DrawProductCart() {
		if (this.#isInCart) {
			document.querySelector(`#${this.#name}`).remove();
		}
		if (this.#quantity <= 0) {
			this.#isInCart = false;
			this.#quantity = 0;
			this.#validForTotal = false;
			document.querySelector('cart-bill-number').innerHTML = `$ 0`;
			document.querySelector(`#${this.#name}`).remove();
		}
		/*					Carrinho Container					*/
		const cartContainer = document.querySelector('cart-products-list-container');

		/*					Produto Container					*/
		const productContainer = document.createElement('cart-selected-product');
		cartContainer.appendChild(productContainer);
		productContainer.setAttribute('id', `${this.#name}`);

		/*					Produto Inicio Container			*/
		const produtoInicioContainer = document.createElement('selected-product-start');
		productContainer.appendChild(produtoInicioContainer);

		/*					Produto Icone						*/
		const produtoIconeContainer = document.createElement('selected-product-icon');
		produtoInicioContainer.appendChild(produtoIconeContainer);
		const produtoIcone = document.createElement('img');
		produtoIconeContainer.appendChild(produtoIcone);
		produtoIcone.setAttribute('src', 'assets/images/burger.png');

		/*					Produto Nome						*/
		const produtoNome = document.createElement('selected-product-name');
		produtoInicioContainer.appendChild(produtoNome);
		produtoNome.innerHTML = this.#name;

		/*					Produto Final Container				*/
		const produtoFinalContainer = document.createElement('selected-product-end');
		productContainer.appendChild(produtoFinalContainer);

		/*					Produto Botão Adicionar				*/
		const produtoAdd = document.createElement('selected-product-add');
		produtoFinalContainer.appendChild(produtoAdd);
		const produtoAddBotao = document.createElement('button');
		produtoAdd.appendChild(produtoAddBotao);
		produtoAddBotao.setAttribute('type', 'button');
		produtoAddBotao.setAttribute('class', 'cart-button');
		produtoAddBotao.innerHTML = '+';
		produtoAddBotao.addEventListener('click', () => {
			this.AddQuantiy();
		});

		/*					Produto Quantidade					*/
		const produtoQuant = document.createElement('selected-product-quant');
		produtoFinalContainer.appendChild(produtoQuant);
		produtoQuant.innerHTML = this.#quantity;

		/*					Produto Botão Remover				*/
		const produtoRemove = document.createElement('selected-product-remove');
		produtoFinalContainer.appendChild(produtoRemove);
		const produtoRemoveBotao = document.createElement('button');
		produtoRemove.appendChild(produtoRemoveBotao);
		produtoRemoveBotao.setAttribute('type', 'button');
		produtoRemoveBotao.setAttribute('class', 'cart-button');
		produtoRemoveBotao.innerHTML = '-';
		produtoRemoveBotao.addEventListener('click', () => {
			this.RemoveQuantiy();
		});
		/*					Produto Valor Total					*/
		const produtoValorTotal = document.createElement('selected-product-value');
		produtoFinalContainer.appendChild(produtoValorTotal);
		produtoValorTotal.innerHTML = `$ ${this.GetPriceTotal()}`;
		GetTotalPrice();
	}
	DrawProduct() {
		/*					Produtos Container					*/
		const itensContainer = document.querySelector('itens-container');

		/*					Produto Container					*/
		const containerProduto = document.createElement('product-container');
		itensContainer.appendChild(containerProduto);
		containerProduto.setAttribute('class', `hidden-element category-${this.#category}`);

		/*					Produto Nome						*/
		const nomeProdutoContainer = document.createElement('product-name');
		containerProduto.appendChild(nomeProdutoContainer);
		const nomeProdutoTexto = document.createElement('h3');
		nomeProdutoContainer.appendChild(nomeProdutoTexto);
		nomeProdutoTexto.innerHTML = this.#name;

		/*					Produto Imagem						*/
		const imagemProdutoContainer = document.createElement('product-image');
		containerProduto.appendChild(imagemProdutoContainer);
		const imagemProduto = document.createElement('img');
		imagemProdutoContainer.appendChild(imagemProduto);
		imagemProduto.setAttribute('src', 'assets/images/burger.png');

		/*					Produto Valor						*/
		const valorProdutoContainer = document.createElement('product-value-container');
		containerProduto.appendChild(valorProdutoContainer);
		const valorProduto = document.createElement('product-value');
		valorProduto.innerHTML = `$ ${this.#price}`;
		valorProdutoContainer.appendChild(valorProduto);

		/*					Produto Botão						*/
		const botaoAdicionar = document.createElement('button');
		valorProdutoContainer.appendChild(botaoAdicionar);
		botaoAdicionar.setAttribute('type', 'button');
		botaoAdicionar.setAttribute('class', 'product-button');
		botaoAdicionar.innerHTML = 'Add';
		botaoAdicionar.addEventListener('click', () => {
			this.PutOnCart();
		})
	}
}