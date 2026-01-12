// ===== Products with Discount =====
let products = [
  {name:"BGMI UC 60", game:"BGMI", price:60, discount:10},
  {name:"BGMI UC 125", game:"BGMI", price:125, discount:0},
  {name:"FF Diamonds 50", game:"Free Fire", price:50, discount:5},
  {name:"FF Diamonds 100", game:"Free Fire", price:100, discount:0},
  {name:"COD CP 60", game:"COD Mobile", price:60, discount:0},
  {name:"COD CP 125", game:"COD Mobile", price:125, discount:10},
  {name:"All Games Mystery Box", game:"All", price:200, discount:10},
  {name:"All Games Exclusive Skin", game:"All", price:500, discount:20}
];

// ===== Render Products =====
function renderProducts() {
  const list = document.getElementById("product-list");
  if(!list) return;
  list.innerHTML = '';
  products.forEach((p,i)=>{
    let finalPrice = p.price - (p.price*p.discount/100);
    let card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h3>${p.name}</h3>
      <p>Game: ${p.game}</p>
      <p>Price: <span style="text-decoration:line-through">₹${p.price}</span> → <span style="color:#00f5ff;">₹${finalPrice}</span></p>
      ${p.discount>0 ? `<span class="discount-badge">-${p.discount}% OFF</span>` : ''}
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
    let finalPrice = p.price - (p.price*p.discount/100);
    opt.value = p.name;
    opt.innerText = `${p.name} - ₹${finalPrice}`;
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
    li.innerHTML = `${p.name} - ₹${p.price} - ${p.game} - ${p.discount}% 
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
    const discount=document.getElementById("productDiscount").value;
    const game=document.getElementById("productGame").value;
    products.push({name:name,price:Number(price),discount:Number(discount),game:game});
    renderProducts();
    renderAdminProducts();
  });
  renderAdminProducts();
}
