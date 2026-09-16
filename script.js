const products = {
    castle: {
        name: "Fantasy Castle Pack",
        price: "12,90 €",
        image: "https://placehold.co/800x500/312e81/ffffff?text=Fantasy+Castle",
        alt: "Fantasiatyylinen linnapaketti",
        description:
            "Rakenna näyttävä fantasiamaailma valmiilla linnan osilla.",
        features: [
            "Yli 40 rakennusosaa",
            "Optimoitu Roblox Studioon",
            "Mukana tornit, portit ja koristeet"
        ]
    },

    vehicles: {
        name: "City Vehicle Pack",
        price: "8,90 €",
        image: "https://placehold.co/800x500/075985/ffffff?text=City+Vehicles",
        alt: "Kaupunkiajoneuvojen asset-paketti",
        description:
            "Lisää kaupunkipeliisi kuusi kevyttä ja tyylikästä ajoneuvoa.",
        features: [
            "Kuusi erilaista ajoneuvoa",
            "Selkeä kansiorakenne",
            "Mobiiliystävälliset mallit"
        ]
    },

    ui: {
        name: "Adventure UI Kit",
        price: "6,90 €",
        image: "https://placehold.co/800x500/166534/ffffff?text=Adventure+UI",
        alt: "Seikkailupelin käyttöliittymäpaketti",
        description:
            "Valmis käyttöliittymäpaketti seikkailu- ja roolipeleihin.",
        features: [
            "Valikot ja painikkeet",
            "Yli 30 kuvaketta",
            "Helposti vaihdettavat värit"
        ]
    }
};

let cartCount = Number(localStorage.getItem("cartCount")) || 0;

function updateCart() {
    const counters = document.querySelectorAll(".cart-count");

    for (const counter of counters) {
        counter.textContent = cartCount;
    }
}

function showProduct() {
    const productArea = document.querySelector("#product-details");

    if (!productArea) {
        return;
    }

    const parameters = new URLSearchParams(window.location.search);
    const productId = parameters.get("id");
    const product = products[productId] || products.castle;

    document.title = product.name + " – BloxAssets";

    productArea.className = "product-details";

    productArea.innerHTML = `
        <img
            src="${product.image}"
            alt="${product.alt}"
            width="800"
            height="500"
        >

        <div class="product-information">
            <h1>${product.name}</h1>
            <p>${product.description}</p>
            <p class="price">${product.price}</p>

            <h2>Paketti sisältää</h2>
            <ul>
                ${product.features
                    .map(function(feature) {
                        return "<li>" + feature + "</li>";
                    })
                    .join("")}
            </ul>

            <button id="add-to-cart" class="button" type="button">
                Lisää ostoskoriin
            </button>

            <p id="cart-message"
               class="message"
               role="status"
               aria-live="polite"></p>
        </div>
    `;

    const cartButton = document.querySelector("#add-to-cart");

    cartButton.addEventListener("click", function() {
        cartCount = cartCount + 1;
        localStorage.setItem("cartCount", cartCount);

        updateCart();

        document.querySelector("#cart-message").textContent =
            product.name + " lisättiin ostoskoriin.";
    });
}

updateCart();
showProduct();