const auth = () => {
  const buttonAuth = document.querySelector(".button-auth"); //Универсальный метод передачи элемента по class (.), id (#)
  const buttonOut = document.querySelector(".button-out");
  const userName = document.querySelector(".user-name");
  const modalAuth = document.querySelector(".modal-auth");
  const closeAuth = document.querySelector(".close-auth");
  const logInForm = document.getElementById("logInForm"); //Старый метот передачи элемента по id
  const inputLogin = document.getElementById("login");
  const inputPassword = document.getElementById("password");
  const buttonCart = document.querySelector(".button-cart");

  const login = (user) => {
    buttonAuth.style.display = "none";
    userName.style.display = "flex";
    buttonOut.style.display = "flex";
    modalAuth.style.display = "none";
    buttonCart.style.display = "flex";

    userName.textContent = user.login;
  };

  const logout = () => {
    buttonAuth.style.display = "flex";
    userName.style.display = "none";
    buttonOut.style.display = "none";
    userName.textContent = "";
    localStorage.removeItem("user");
    buttonCart.style.display = "none";
  };

  buttonOut.addEventListener("click", () => {
    logout();
  });

  buttonAuth.addEventListener("click", () => {
    modalAuth.style.display = "flex";
  });

  closeAuth.addEventListener("click", () => {
    modalAuth.style.display = "none";
  });

  logInForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const user = {
      login: inputLogin.value,
      password: inputPassword.value,
    };
    localStorage.setItem("user", JSON.stringify(user));
    login(user);
  });

  if (localStorage.getItem("user")) {
    login(JSON.parse(localStorage.getItem("user")));
  }
};
auth();
