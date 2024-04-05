"use strict";
class ItemSource {
  constructor(name2, class2) {
    this.name = name2;
    this.class = class2;
  }
}

const data = [
  new ItemSource("JavaScript", "language"),
  new ItemSource("React", "framework"),
  new ItemSource("Vue", "framework"),
  new ItemSource("Angular", "framework"),
  new ItemSource("Python", "language"),
  new ItemSource("CSS", "style"),
  new ItemSource("SASS", "style"),
  new ItemSource("Webpack", "builder"),
  new ItemSource("Gulp", "builder"),
  new ItemSource("Parsel", "builder"),
];

(function () {
  const source = document.querySelector(".source2__box");

  let mainContent = "";
  data.map((item) => {
    mainContent += `
        <div class="${"source__box_item"} ${"all"} ${item.class}">
            ${item.name}
        </div>
      `;
  });

  source.insertAdjacentHTML("beforeend", mainContent);

  const sourceItems = document.querySelectorAll(".source__box_item");
  const result = document.querySelector(".result__box");
  const btnRight = document.querySelector(".button__box_right");
  const btnRightAll = document.querySelector(".button__box_rightAll");
  const btnLeft = document.querySelector(".button__box_left");
  const btnLeftAll = document.querySelector(".button__box_leftAll");
  const btnDelete = document.querySelector(".button__delete");
  const select = document.getElementById("sorting-options");
  const sortingItemsDropOptions = document.querySelectorAll(
    ".sorting__items-drop"
  );
  const resetBtn = document.querySelector(".button__reset");
  const addNew = document.querySelector(".button__new");
  const inputSearch = document.querySelector(".search");

  const initialItems = [];
  sourceItems.forEach((item) => {
    initialItems.push(item.innerText);
    localStorage.setItem("items", JSON.stringify(initialItems));
  });

  function saveToStorage(item) {
    const savedSource = JSON.parse(localStorage.getItem("items")) || [];
    localStorage.setItem("items", JSON.stringify([...savedSource, item]));
  }

  function handleClickMove(event) {
    if (event.target.classList.contains("source__box_item")) {
      event.target.classList.toggle("active");
    }
  }

  function handleBtnMove() {
    document.querySelectorAll(".source__box_item").forEach((item) => {
      if (item.classList.contains("active")) {
        result.appendChild(item);
        item.classList.remove("active");
      }
    });
  }
  function handleBtnMoveBack() {
    document.querySelectorAll(".source__box_item").forEach((item) => {
      if (item.classList.contains("active")) {
        source.appendChild(item);
        item.classList.remove("active");
      }
    });
  }
  function handleBtnMoveAll() {
    document.querySelectorAll(".source__box_item").forEach((item) => {
      result.appendChild(item);
    });
  }
  function handleBtnMoveAllBack() {
    document.querySelectorAll(".source__box_item").forEach((item) => {
      source.appendChild(item);
    });
  }

  for (let option of sortingItemsDropOptions) {
    option.onclick = function () {
      sorting(this.dataset.filter);
    };
  }
  function sorting(dropOption) {
    const updatedSource = document.querySelectorAll(".source__box_item");
    for (let item of updatedSource) {
      if (
        !item.classList.contains(dropOption) ||
        item.classList.contains("hide")
      ) {
        item.style.display = "none";
      } else {
        item.style.display = "block";
      }
    }
  }

  function handleAddNew() {
    const newSource = this.previousElementSibling.value.trim();
    if (newSource) {
      createRandomSource(newSource);
      this.previousElementSibling.value = "";
    } else {
      alert("Input field is empty");
    }
  }
  function createRandomSource(text) {
    const classList = ["language", "framework", "style", "builder"];
    let randomIndex = Math.floor(Math.random() * classList.length);
    let randomClass = classList[randomIndex];
    const div = document.createElement("div");
    div.innerText = text;
    div.className = "source__box_item";
    div.classList.add("all");
    div.classList.add("random");
    div.classList.add(randomClass);
    saveToStorage(div.innerText);
    source.append(div);
  }
  function search(event) {
    const searchText = event.target.value.trim().toLowerCase();
    if (searchText !== "") {
      document.querySelectorAll(".source__box_item").forEach((item) => {
        if (item.innerText.trim().toLowerCase().search(searchText) == -1) {
          item.classList.add("hide");
        } else {
          item.classList.remove("hide");
        }
      });
    } else {
      document.querySelectorAll(".source__box_item").forEach((item) => {
        item.classList.remove("hide");
      });
    }
  }

  function initialSources() {
    for (let i = 1; i <= initialItems.length; i++) {
      localStorage.setItem(
        "items",
        JSON.stringify(initialItems.filter((elem) => elem !== initialItems[i]))
      );
    }
    const updatedSource = document.querySelectorAll(".source__box_item");
    updatedSource.forEach((item) => {
      if (item.classList.contains("random")) {
        item.classList.add("hide");
      } else if (item.classList.contains("hide")) {
        item.classList.remove("hide");
        item.classList.remove("active");
        source.append(item);
      }
    });
  }

  function handleClickDeleteItem() {
    document.querySelectorAll(".source__box_item").forEach((item) => {
      if (item.classList.contains("active")) {
        item.classList.add("hide");
        const storageItem = JSON.parse(localStorage.getItem("items"));
        localStorage.setItem(
          "items",
          JSON.stringify(
            storageItem.filter((elem) => elem !== item.innerText.trim())
          )
        );
      }
    });
  }

  source.addEventListener("click", handleClickMove);
  result.addEventListener("click", handleClickMove);
  btnRight.addEventListener("click", handleBtnMove);
  btnLeft.addEventListener("click", handleBtnMoveBack);
  btnRightAll.addEventListener("click", handleBtnMoveAll);
  btnLeftAll.addEventListener("click", handleBtnMoveAllBack);
  btnDelete.addEventListener("click", handleClickDeleteItem);
  select.addEventListener("change", () => {
    sorting(select.value);
  });
  resetBtn.addEventListener("click", initialSources);
  addNew.addEventListener("click", handleAddNew);
  inputSearch.addEventListener("input", search);
})();
