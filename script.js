const products = [
  {name:"Pro Headphones", orders:312, revenue:"$18,720", growth:"+18.4%"},
  {name:"Smart Watch X", orders:248, revenue:"$14,880", growth:"+15.2%"},
  {name:"Ultra Laptop", orders:184, revenue:"$13,800", growth:"+11.7%"},
  {name:"Air Speaker", orders:166, revenue:"$8,300", growth:"+9.8%"},
  {name:"Fit Band 3", orders:129, revenue:"$5,160", growth:"+7.5%"}
];

const table = document.getElementById("productTable");
const search = document.getElementById("search");

function renderProducts(query=""){
  table.innerHTML = products.filter(p=>p.name.toLowerCase().includes(query.toLowerCase()))
    .map(p=>`<tr><td class="product-name">${p.name}</td><td>${p.orders}</td><td>${p.revenue}</td><td class="growth">${p.growth}</td></tr>`).join("");
}
renderProducts();
search.addEventListener("input", e=>renderProducts(e.target.value));

const data = {
  7:[200,170,185,125,145,75,45],
  30:[210,155,180,110,135,65,85],
  90:[180,145,120,155,105,90,50]
};
function drawChart(values){
  const line=document.getElementById("linePath");
  const area=document.getElementById("areaPath");
  const pts=document.getElementById("points");
  const max=220, w=700, h=250;
  const points=values.map((v,i)=>{
    const x=(i/(values.length-1))*w, y=h-(v/max)*h;
    return `${x},${y}`;
  }).join(" ");
  line.setAttribute("points",points);
  area.setAttribute("d",`M${points.replaceAll(" ", " L")} L${w},${h} L0,${h} Z`);
  pts.innerHTML=values.map((v,i)=>{
    const x=(i/(values.length-1))*w, y=h-(v/max)*h;
    return `<circle cx="${x}" cy="${y}" r="4"></circle>`;
  }).join("");
}
drawChart(data[7]);

document.querySelectorAll(".period").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".period").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    drawChart(data[btn.dataset.period]);
  });
});

document.getElementById("themeBtn").addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  document.getElementById("themeBtn").textContent=document.body.classList.contains("dark")?"☀":"☾";
});

document.getElementById("regionSelect").addEventListener("change",e=>{
  const toast=document.getElementById("toast");
  toast.textContent=e.target.value==="all"?"Showing all regions":`Showing ${e.target.options[e.target.selectedIndex].text} region`;
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),1800);
});

document.getElementById("exportBtn").addEventListener("click",()=>{
  const toast=document.getElementById("toast");
  toast.textContent="✓ Report prepared successfully!";
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),1800);
});
