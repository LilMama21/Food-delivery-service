const cart = () => {
  const buttonCart = document.querySelector(".button-cart"); // Данные переменные доступна только внутри этой функции
  const modalCart = document.querySelector(".modal-cart");
  const close = modalCart.querySelector(".close");
  const body = modalCart.querySelector(".modal-body");
  const buttonSend = modalCart.querySelector(".button-primary");

  const resetCart = () => {
    body.innerHTML = "";
    localStorage.removeItem("cart");
    modalCart.classList.remove("is-open");
  };

  const incCount = (id) => {
    const cartArray = JSON.parse(localStorage.getItem("cart")); // Получаем массив из localStorage

    cartArray.map((item) => {
      if (item.id === id) {
        item.count++;
      }

      return item;
    });
    localStorage.setItem("cart", JSON.stringify(cartArray)); // Записываем изменения в localStorage
    renderItem(cartArray);
  };
  const decCount = (id) => {
    const cartArray = JSON.parse(localStorage.getItem("cart"));
    cartArray.map((item) => {
      if (item.id === id) {
        item.count = item.count > 0 ? item.count - 1 : 0;
        // if (item.count > 0) {
        //   item.count--;
        // } else {
        //   item.count = 0;
        // }
      }

      return item;
    });
    localStorage.setItem("cart", JSON.stringify(cartArray));
    renderItem(cartArray);
  };

  const renderItem = (data) => {
    body.innerHTML = "";
    data.forEach(({ name, price, id, count }) => {
      const divFoodRow = document.createElement("div");

      divFoodRow.classList.add("food-row");
      divFoodRow.innerHTML = `
          <span class="food-name">${name}</span>
          <strong class="food-price">${price} ₽</strong>
          <div class="food-counter">
            <button class="counter-button btn-dec" data-index"${id}">-</button>
            <span class="counter">${count}</span>
            <button class="counter-button btn-inc" data-index"${id}">+</button>
          </div>
      `;

      divFoodRow.querySelector(".btn-dec").addEventListener("click", () => {
        decCount(id);
      });

      divFoodRow.querySelector(".btn-inc").addEventListener("click", () => {
        incCount(id);
      });

      body.append(divFoodRow);
    });
  };
  // https://jsonplaceholder.typicode.com/posts

  /*              !!!ТУТ ВОЗНИКЛИ ТРУДНОСТИ!!!
    body.addEventListener("click", (e) => {
    e.preventDefault();

    if (e.target.classList.contains("btn-inc")) {
      // console.log(e.target.dataset.index); undefined
      incCount(e.target.dataset.index);
      // console.log("inc");
    } else if (e.target.classList.contains("btn-dec")) {
      // console.log("dec");
      decCount(e.target.dataset.index);
    }
  });
*/

  buttonSend.addEventListener("click", () => {
    const cartArray = localStorage.getItem("cart");
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: cartArray,
    })
      .then((response) => {
        if (response.ok) {
          resetCart();
        }
      })
      .catch((e) => {
        console.error(e);
      });
  });

  buttonCart.addEventListener("click", () => {
    if (localStorage.getItem("cart")) {
      renderItem(JSON.parse(localStorage.getItem("cart")));
    }

    modalCart.classList.add("is-open");
  });
  close.addEventListener("click", () => {
    modalCart.classList.remove("is-open");
  });
};
cart();
