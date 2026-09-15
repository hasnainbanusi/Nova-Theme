const products=[
{id:1,name:"Relaxed Wool Overshirt",category:"clothing",price:129,image:""},
{id:2,name:"Essential Knit Sweater",category:"clothing",price:89,image:""},
{id:3,name:"Studio Runner",category:"shoes",price:149,image:""},
{id:4,name:"Leather Mini Bag",category:"accessories",price:119,image:""},
{id:5,name:"Tailored Daily Trousers",category:"clothing",price:109,image:""},
{id:6,name:"Canvas Low Trainer",category:"shoes",price:99,image:""},
{id:7,name:"Sculpted Sunglasses",category:"accessories",price:79,image:""},
{id:8,name:"Heavyweight Tee",category:"clothing",price:49,image:""}
];
let cart=JSON.parse(localStorage.getItem("nova-cart")||"[]");

const grid=document.getElementById("productGrid");
function renderProducts(filter="all"){
  const list=filter==="all"?products:products.filter(p=>p.category===filter);
  grid.innerHTML=list.map((p,i)=>`<article class="product-card">
    <div class="product-image">${i<2?'<span class="badge">NEW</span>':""}<button class="quick-add" onclick="addToCart(${p.id})">ADD TO BAG</button></div>
    <div class="product-info"><h3>${p.name}<span class="price">$${p.price.toFixed(2)}</span></h3><p>${p.category[0].toUpperCase()+p.category.slice(1)}</p></div>
  </article>`).join("");
}
function addToCart(id){
  const item=cart.find(x=>x.id===id);
  if(item)item.qty++;
  else cart.push({id,qty:1});
  saveCart();openCart();
}
function saveCart(){localStorage.setItem("nova-cart",JSON.stringify(cart));renderCart();document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0)}
function renderCart(){
 const box=document.getElementById("cartItems");
 if(!cart.length){box.innerHTML='<div style="padding:50px 0;text-align:center;color:#777;font-size:13px">Your bag is empty.</div>';document.getElementById("cartTotal").textContent="$0.00";return}
 box.innerHTML=cart.map(x=>{let p=products.find(a=>a.id===x.id);return `<div class="cart-item"><div class="cart-thumb"></div><div><h4>${p.name}</h4><p>Qty: ${x.qty} · $${(p.price*x.qty).toFixed(2)}</p><button class="remove" onclick="removeFromCart(${p.id})">Remove</button></div><strong>$${(p.price*x.qty).toFixed(2)}</strong></div>`}).join("");
 document.getElementById("cartTotal").textContent="$"+cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0).toFixed(2);
}
function removeFromCart(id){cart=cart.filter(x=>x.id!==id);saveCart()}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("backdrop").classList.add("open")}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("backdrop").classList.remove("open")}
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{document.querySelector(".filter.active").classList.remove("active");b.classList.add("active");renderProducts(b.dataset.filter)}));
document.getElementById("cartBtn").onclick=openCart;document.getElementById("closeCart").onclick=closeCart;document.getElementById("backdrop").onclick=closeCart;
document.getElementById("menuBtn").onclick=()=>document.getElementById("nav").classList.toggle("mobile");
document.querySelectorAll(".nav a").forEach(a=>a.onclick=()=>document.getElementById("nav").classList.remove("mobile"));
const overlay=document.getElementById("searchOverlay"),input=document.getElementById("searchInput"),results=document.getElementById("searchResults");
document.getElementById("searchBtn").onclick=()=>{overlay.classList.add("open");input.focus()};
document.getElementById("closeSearch").onclick=()=>overlay.classList.remove("open");
input.oninput=()=>{let q=input.value.toLowerCase();results.innerHTML=products.filter(p=>p.name.toLowerCase().includes(q)).map(p=>`<div class="search-result">${p.name}<span style="float:right">$${p.price}</span></div>`).join("")};
document.getElementById("newsletterForm").onsubmit=e=>{e.preventDefault();e.target.innerHTML='<p style="padding:14px 0;font-size:12px">Thanks — you’re on the list.</p>'};
document.getElementById("checkout").onclick=()=>alert(cart.length?"Demo checkout: connect Stripe/Shopify/WooCommerce here.":"Your bag is empty.");
renderProducts();saveCart();