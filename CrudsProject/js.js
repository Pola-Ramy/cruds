let title = document.querySelector("#title");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.querySelector("#total");
let counter = document.querySelector("#counter");
let category = document.querySelector("#category");
let submit = document.querySelector("#submit");
let searchTitle = document.querySelector("#searchTitle");
let searchcategory = document.querySelector("#searchcategory");
let mood = "create";
let temp;
//get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#ab1717";
  }
}

//create products
let datapro;
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}

submit.onclick = function () {
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    counter: counter.value,
    category: category.value.toLowerCase(),
  };

  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newpro.counter <= 100
  ) {
    if (mood === "create") {
      if (newpro.counter > 1) {
        for (let i = 0; i < newpro.counter; i++) {
          datapro.push(newpro);
        }
      } else {
        datapro.push(newpro);
      }
    } else {
      datapro[temp] = newpro;
      mood = "create";
      submit.innerHTML = "create";
      counter.style.display = "block";
    }
    cleardata();
  }

  //save localstorage

  localStorage.setItem("product", JSON.stringify(datapro));
  console.log(datapro);

  showdata();
};

//clear inputs
function cleardata() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  counter.value = "";
  category.value = "";
}
//read
function showdata() {
  getTotal();
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    table += `
        <tr>
        <td>${i + 1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick= "updatedata(${i})" id="update">update</button></td>
        <td><button onclick= "deletedata(${i})" id="delete">delete</button></td>
    </tr> 
        `;
  }

  document.querySelector("#tbody").innerHTML = table;

  let btndeleteAll = document.querySelector("#deleteAll");
  if (datapro.length > 0) {
    btndeleteAll.innerHTML = `
    <button onclick='deleteALL()' >Delete All  (${datapro.length})</button>`;
  } else {
    btndeleteAll.innerHTML = "";
  }
}

showdata();
//delete
function deletedata(i) {
  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro);
  showdata();
}
function deleteALL() {
  localStorage.clear();
  datapro.splice(0);
  showdata();
}

//update
function updatedata(i) {
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  category.value = datapro[i].category;
  getTotal();
  counter.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
//search

let searchmood = "title";

function getSearchmood(id) {
  let search = document.querySelector("#search");
  if (id == "searchTitle") {
    searchmood = "title";
  } else {
    searchmood = "category";
  }
  search.placeholder = `Search By ${searchmood}`;
  search.focus();
  search.value = "";
  showdata();
}

function searchdata(value) {
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    if (searchmood == "title") {
      if (datapro[i].title.includes(value.toLowerCase())) {
        table += `
  <tr>
  <td>${i}</td>
  <td>${datapro[i].title}</td>
  <td>${datapro[i].price}</td>
  <td>${datapro[i].taxes}</td>
  <td>${datapro[i].ads}</td>
  <td>${datapro[i].discount}</td>
  <td>${datapro[i].total}</td>
  <td>${datapro[i].category}</td>
  <td><button onclick= "updatedata(${i})" id="update">update</button></td>
  <td><button onclick= "deletedata(${i})" id="delete">delete</button></td>
</tr> 
  `;
      }
    } else {
      if (datapro[i].category.includes(value.toLowerCase())) {
        table += `
  <tr>
  <td>${i}</td>
  <td>${datapro[i].title}</td>
  <td>${datapro[i].price}</td>
  <td>${datapro[i].taxes}</td>
  <td>${datapro[i].ads}</td>
  <td>${datapro[i].discount}</td>
  <td>${datapro[i].total}</td>
  <td>${datapro[i].category}</td>
  <td><button onclick= "updatedata(${i})" id="update">update</button></td>
  <td><button onclick= "deletedata(${i})" id="delete">delete</button></td>
</tr> 
  `;
      }
    }
  }
  document.querySelector("#tbody").innerHTML = table;
}
