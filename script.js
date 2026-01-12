// ===== Products System =====
let products = [
  {name:"BGMI UC", game:"BGMI", price:100},
  {name:"Free Fire Diamonds", game:"Free Fire", price:50},
  {name:"All Games Item", game:"All", price:200}
];

function renderProducts() {
  const list = document.getElementById("product-list");
  if(!list) return;
  list.innerHTML = '';
  products.forEach((p,i)=>{
    let card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h3>${p.name}</h3>
      <p>Game: ${p.game}</p>
      <p>Price: ₹${p.price}</p>
      <a class="btn" href="https://wa.me/7986460527?text=I%20want%20${p.name}" target="_blank">Buy</a>`;
    list.appendChild(card);
  });
}
renderProducts();

// ===== Order Form =====
const orderForm = document.getElementById("orderForm");
if(orderForm){
  const productSelect = document.getElementById("product");
  products.forEach(p=>{
    let opt = document.createElement('option');
    opt.value = p.name;
    opt.innerText = `${p.name} - ₹${p.price}`;
    productSelect.appendChild(opt);
  });

  orderForm.addEventListener('submit',e=>{
    e.preventDefault();
    const name = document.getElementById("name").value;
    const game = document.getElementById("game").value;
    const product = document.getElementById("product").value;
    const quantity = document.getElementById("quantity").value;
    const msg = `Name:${name}, Game:${game}, Product:${product}, Qty:${quantity}`;
    window.open(`https://wa.me/7986460527?text=${encodeURIComponent(msg)}`);
  });
}

// ===== Login System =====
const loginForm = document.getElementById("loginForm");
if(loginForm){
  loginForm.addEventListener('submit',e=>{
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if(username==="admin" && password==="admin123"){
      alert("Admin Login Success");
      window.location.href="admin.html";
    } else {
      alert("User Login Success");
      window.location.href="index.html";
    }
  });
}

// ===== Admin Panel =====
const addForm = document.getElementById("addProductForm");
const adminList = document.getElementById("adminProductList");
function renderAdminProducts(){
  if(!adminList) return;
  adminList.innerHTML = '';
  products.forEach((p,i)=>{
    let li = document.createElement('li');
    li.innerHTML = `${p.name} - ₹${p.price} - ${p.game} 
      <button onclick="deleteProduct(${i})">Delete</button>`;
    adminList.appendChild(li);
  });
}
function deleteProduct(i){products.splice(i,1);renderProducts();renderAdminProducts();}
if(addForm){
  addForm.addEventListener('submit',e=>{
    e.preventDefault();
    const name=document.getElementById("productName").value;
    const price=document.getElementById("productPrice").value;
    const game=document.getElementById("productGame").value;
    products.push({name:name,price:Number(price),game:game});
    renderProducts();
    renderAdminProducts();
  });
  renderAdminProducts();
}