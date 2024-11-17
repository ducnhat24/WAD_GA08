function showNav() {
  const navBar = document.querySelector(".header__sidebar");
  navBar.style.transform = "translateX(0)";
  navBar.style.opacity = "1";
  const navBtn = document.querySelector(".header__btn__nav");
  navBtn.style.opacity = "0.3";
}

function hideNav() {
  const navBar = document.querySelector(".header__sidebar");
  navBar.style.transform = "translateX(100%)";
  navBar.style.opacity = "0";
  const navBtn = document.querySelector(".header__btn__nav");
  navBtn.style.opacity = "1";
}

function notify(obj) {
  const main = document.getElementById("notify");
  const icons = {
    success: "fa-check",
    error: "fa-info",
    warning: "fa-exclamation",
  };
  if (main) {
    const el = document.createElement("div");
    el.classList.add("notify");
    el.classList.add("notify--" + obj.type);

    el.innerHTML = `
            <div class="notify__icon">
                <i class="fa-solid ${icons[obj.type]}"></i>
            </div>
            <div class="notify__content">
                <div class="notify__content__title">
                    ${obj.type}
                </div>
                <div class="notify__content__msg">
                    ${obj.msg}
                </div>
            </div>
            <div class="notify__close">
                <i class="fa-solid fa-x"></i>
            </div>
        `;

    main.appendChild(el);
    setTimeout(() => {
      main.removeChild(main.firstElementChild);
    }, 3500);
  }
}

function handleSubmitSignup() {
  console.log("Signup form submitted");
  const username = document.querySelector("#signup__username").value;
  const email = document.querySelector("#signup__email").value;
  const password = document.querySelector("#signup__password").value;
  if (!email || !password || !username) {
    notify({
      type: "warning",
      msg: "Please fill all fields",
    });
    return;
  }

  // Send data to server
  fetch("/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      notify({
        type: data.status,
        msg: data.msg,
      });
      if (data.status === "success") {
        setTimeout(() => {
          location.href = "/user/login";
        }, 3500);
      }
    })
    .catch((error) => {
      notify({
        type: "error",
        msg: error.message,
      });
    });
}

function handleSubmitLogin() {
  const useraccount = document.querySelector("#login__useraccount").value;
  const password = document.querySelector("#login__password").value;
  if (!useraccount || !password) {
    notify({
      type: "warning",
      msg: "Please fill all fields",
    });
    return;
  }

  // Send data to server
  fetch("/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ useraccount, password }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      notify({
        type: data.status,
        msg: data.msg,
      });

      if (data.status === "success") {
        setTimeout(() => {
          location.href = "/";
        }, 3500);
      }
    })
    .catch((error) => {
      alert("There was an error processing your request.");
    });
}

function handleLogout() {
  console.log("Logout form submitted");
  fetch("/user/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      notify({
        type: data.status,
        msg: data.msg,
      });

      if (data.status === "success") {
        setTimeout(() => {
          location.reload(true);
        }, 3500);
      }
    })
    .catch((error) => {
      notify({
        type: "error",
        msg: error.message,
      })
    });
}

$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
  });
});

// function handleSearch() {
//   const query = document.querySelector("#search__bar__product").value;
//   console.log("Search query: ", query);
//   if (!query) {
//     notify({
//       type: "warning",
//       msg: "Please enter a search query",
//     });
//     return;
//   }

//   location.href = "/product/search?keysearch=" + query;
//   // Send data to server
// }

function handleSearch() {
  const query = document.querySelector("#search__bar__product").value;
  const selectedBrands = Array.from(document.querySelectorAll("input[type=checkbox]:checked"))
    .map(checkbox => checkbox.id.replace('checkbox_', ''));
  const selectedSort = document.querySelector("input[name=sort]:checked")?.id || '';
  const priceRange = document.querySelector("input[type=range]").value;

  // Kiểm tra nếu không có từ khóa tìm kiếm
  if (!query) {
    notify({
      type: "warning",
      msg: "Please enter a search query",
    });
    return;
  }

  // Tạo query string từ các giá trị đã thu thập
  const queryParams = {
    keysearch: query,
    brands: selectedBrands.join(','),  // Chuyển mảng thành chuỗi
    sort: selectedSort,
    price: priceRange
  };

  // Chuyển các giá trị vào URL query string
  const queryString = new URLSearchParams(queryParams).toString();

  // Điều hướng đến trang tìm kiếm với các tham số đã chọn
  location.href = "/product/search?" + queryString;

  // Send data to server (sẽ xử lý trên server)
}
