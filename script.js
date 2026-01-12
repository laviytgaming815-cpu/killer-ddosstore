// ===== Full Price List =====
let products = [
  // BGMI
  {name:"BGMI UC 65", game:"BGMI", price:60, discount:10},
  {name:"BGMI UC 145", game:"BGMI", price:125, discount:5},
  {name:"BGMI UC 360", game:"BGMI", price:300, discount:10},
  {name:"BGMI UC 660", game:"BGMI", price:600, discount:15},
  {name:"BGMI UC 1200", game:"BGMI", price:1000, discount:20},
  {name:"BGMI UC 2500", game:"BGMI", price:2400, discount:25},

  // Free Fire
  {name:"FF Diamonds 50", game:"Free Fire", price:50, discount:5},
  {name:"FF Diamonds 100", game:"Free Fire", price:100, discount:0},
  {name:"FF Diamonds 300", game:"Free Fire", price:300, discount:10},
  {name:"FF Diamonds 500", game:"Free Fire", price:500, discount:15},
  {name:"FF Diamonds 1000", game:"Free Fire", price:1000, discount:20},
  {name:"FF Diamonds 2000", game:"Free Fire", price:2000, discount:25},

  // COD Mobile
  {name:"COD CP 60", game:"COD Mobile", price:60, discount:0},
  {name:"COD CP 125", game:"COD Mobile", price:125, discount:10},
  {name:"COD CP 300", game:"COD Mobile", price:300, discount:15},
  {name:"COD CP 600", game:"COD Mobile", price:600, discount:20},
  {name:"COD CP 1200", game:"COD Mobile", price:1200, discount:25},
  {name:"COD CP 2500", game:"COD Mobile", price:2500, discount:30}
];

let selectedGame = "BGMI";

// ===== Render Products =====
function renderProducts(){
  const list = document.getElementById("product-list");
  list.innerHTML = '';
  products.filter(p=>p.game===selectedGame || selectedGame==="All").forEach((p,i)=>{
    let finalPrice = p.price - (p.price*p.discount/100);
    let card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h3>${p.name}</h3>
      <p>Price: <span style="text-decoration:line-through">₹${p.price}</span> → <span style="color:#00f5ff;">₹${finalPrice}</span></p>
      ${p.discount>0?`<span class="discount-badge">-${p.discount}% OFF</span>`:''}`;
    card.addEventListener('click',()=>openModal(p));
    list.appendChild(card);
  });
}
renderProducts();

// ===== Tabs click =====
document.querySelectorAll('.tab-button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.tab-button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    selectedGame = btn.dataset.game;
    renderProducts();
  });
});

// ===== Modal logic =====
const modal = document.getElementById('orderModal');
const modalProductName = document.getElementById('modalProductName');
const modalPrice = document.getElementById('modalPrice');
const modalQty = document.getElementById('modalQty');
const payButton = document.getElementById('payButton');
const codeSection = document.getElementById('codeSection');
const deliveredCode = document.getElementById('deliveredCode');
const spanClose = document.querySelector('.close');

function openModal(product){
  let finalPrice = product.price - (product.price*product.discount/100);
  modalProductName.innerText = product.name;
  modalPrice.innerText = finalPrice;
  modalQty.value = 1;
  codeSection.style.display = 'none';
  deliveredCode.innerText = '';
  modal.dataset.productIndex = products.indexOf(product);
  modal.style.display = 'block';
}

spanClose.onclick = ()=> modal.style.display='none';
window.onclick = e=>{if(e.target==modal) modal.style.display='none';}

// ===== Simulated QR / UPI Payment =====
payButton.onclick = ()=>{
  let index = modal.dataset.productIndex;
  let product = products[index];
  let qty = parseInt(modalQty.value);
  // Deliver first available codes
  let code = product.codes.slice(0,qty).join(', ');
  codeSection.style.display = 'block';
  deliveredCode.innerText = code || "No codes available";
};
