function calculateOrder() {
    var name = document.getElementById('name');
    var number = document.getElementById('number');
    var email = document.getElementById('email');
    var output = document.getElementById('order');

    var dishes = document.getElementsByClassName('card');

    var total = 0;

    var formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    output.innerHTML = '';

    if (verifyDataEntry(name, number, email) && verifyQuantity())
    {
        output.innerHTML = `<p>Caro <strong>${name.value}</strong></p> <br> Seguem os dados do seu pedido. <br><br> O seu pedido é: <br> <ul>`;

        for (var i = 0; i < dishes.length; i++)
        {
            var dish_name = dishes[i].querySelector('.card-title').innerText.trim();
            var price = parseFloat(dishes[i].querySelector('.card-text > input[name="price"]').value);
            var quantity = parseFloat(dishes[i].querySelector(`input[id="${i + 1}"]`).value);

            if (quantity > 0)
            {
                output.innerHTML += `<li>Prato: ${dish_name} - Preço unitário: ${formatter.format(price)} - Quantidade: ${quantity} - Total: ${formatter.format(price * quantity)}.</li>`;

                total += price * quantity;
            }
        }

        output.innerHTML += `</ul> <p><strong>Preço final ${formatter.format(total)}</strong></p>`;
    }
}

function verifyQuantity()
{
    var dishes = document.getElementsByClassName('card');
    var quantity = 0;

    for (var i = 0; i < dishes.length; i++)
    {
        quantity += parseFloat(dishes[i].querySelector(`input[id="${i + 1}"]`).value);
    }

    if (quantity > 0)
    {
        return true;
    }
    else
    {
        document.getElementById('order').innerHTML = '<p style="color: #ff0000;">Selecione pelo menos um produto para efetuar o pedido.</p>';
        return false;
    }
}

function verifyDataEntry(name, number, email) {
    var allowed = true;

    if (!name.value)
    {
        document.querySelector('label[id="labelNameError"]').innerHTML = "Insira seu nome";
        allowed = false;
    }
    else
    {
        document.querySelector('label[id="labelNameError"]').innerHTML = "";
    }

    if (!number.value)
    {
        document.querySelector('label[id="labelNumberError"]').innerHTML = "Insira seu número";
        allowed = false;
    }
    else
    {
        document.querySelector('label[id="labelNumberError"]').innerHTML = "";
    }

    if (!email.value)
    {
        document.querySelector('label[id="labelEmailError"]').innerHTML = "Insira seu email";
        allowed = false;
    }
    else
    {
        document.querySelector('label[id="labelEmailError"]').innerHTML = "";
    }

    return allowed;
}