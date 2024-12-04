
function addCart() {
    // Add item to cart
    const idContainer = document.getElementById("hehe");
    fetch(url + "/cart", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userID: user.id,
            productID: idContainer.innerText,
            quantity: 1
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert("Add to cart successfully");
            } else {
                alert(data.message);
            }
        })
}