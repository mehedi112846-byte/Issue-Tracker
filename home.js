const button_all = document.getElementById("button_all");
const button_open = document.getElementById("button_open");
const button_closed = document.getElementById("button_closed");

const loadCards=()=>{
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(json => displayCards(json.data));
};


const displayCards=(cards)=>{
    const card_container = document.getElementById("card_container");
    card_container.innerHTML = "";
    // conditions will be here
    for(let card of cards){
        console.log(card);
        const carDiv = document.createElement("div");
        carDiv.className = "card w-[24.2%] shadow-[0px_0px_10px_rgba(209,213,219,0.5)]";
        carDiv.innerHTML = `
        <div class="card w-[100%] shadow-[0px_0px_2px_rgba(209,213,219,0.5)]">

            <div class="card_upper_part shadow-sm rounded-t-[8px] w-[100%] p-[16px]">
                <div class="card_top_icons flex justify-between">
                <img class="w-[24px] h-[24px] rounded-full" src="assets/Open-Status.png" alt="">
                <button class="bg-[#FEECEC] text-[#EF4444] text-[12px] font-medium rounded-full px-[15px] py-[5px]">${card.priority}</button>
            </div>

            <div class="card_midle_text">
                <h3 class="text-[14px] text-[#1F2937] font-semibold mt-[12px]">${card.title}</h3>
                <p class="text-[12px] text-[#64748B] font-normal mt-[8px]">${card.description}</p>
            </div>

            <div class="card_lower_flex_items flex gap-[4px] mt-[12px]">
                <button class="bg-[#FEECEC] text-[#EF4444] text-[12px] font-medium rounded-full px-[15px] py-[3px] flex gap-[2px] items-center"><span><img src="assets/BugDroid.png" alt=""></span>${card.labels[0]}</button>
                <button class="bg-[#FFF8DB] text-[#D97706] text-[12px] font-medium rounded-full px-[15px] py-[3px] flex gap-[2px] items-center"><span><img src="assets/Lifebuoy.png" alt=""></span>${card.labels[1]}</button>
            </div>
            </div>

            <div class="card_lower_part shadow-sm rounded-b-[8px] w-[100%] p-[16px] space-y-[8px]">
                <p class="text-[12px] text-[#64748B] font-normal">author: ${card.author}</p>
                <p class="text-[12px] text-[#64748B] font-normal">assignee: ${card.assignee}</p>
                <p class="text-[12px] text-[#64748B] font-normal">createdAt: ${card.createdAt}</p>
                <p class="text-[12px] text-[#64748B] font-normal">updatedAt: ${card.updatedAt}</p>
            </div>

        </div>`
    card_container.append(carDiv);    
    }
};

loadCards();