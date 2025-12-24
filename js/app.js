const buttons = document.querySelectorAll(".state");
const cards = document.querySelectorAll(".card");

let currentPeriod = "weekly";
let data = [];

fetch("data.json")
    .then(res => res.json())
    .then(json =>{
        data = json;
        updateUI("daily");
    })

console.log(data)

    
function updateUI(period){
    cards.forEach( card => {
       const title = card.dataset.title;
       const item = data.find( d => d.title === title);
       console.log(item)
       if(!item) return;

       const current = item.timeframes[period].current;
       const previus = item.timeframes[period].previous;

       card.querySelector(".hours").textContent = `${current}hrs`;

       const label = getLabel(period);
       card.querySelector(".previous").textContent = `${label} - ${previus}hrs`;
    })
}

function getLabel(period){
    if(period === "daily") return "Yesterday";
    if(period === "weekly") return "Last Week";
    if(period === "monthly") return "Last Month";
}


buttons.forEach( btn => {
    btn.addEventListener("click", () => {
        buttons.forEach( b => b.classList.remove("active"));
        btn.classList.add("active");

        const period = btn.dataset.period;
        updateUI(period);
    })
})

