const button_all = document.getElementById("button_all");
const button_open = document.getElementById("button_open");
const button_closed = document.getElementById("button_closed");
const issue_count = document.getElementById("issue_count");


function buttonColor(clickedButtonId){
    const buttonsId = ["button_all", "button_open", "button_closed"];
    buttonsId.forEach(id=>{
        const btn = document.getElementById(id);
        if(btn){
            btn.classList.remove("bg-[#4A00FF]");
        }
    });
    const activeBtn = document.getElementById(clickedButtonId);
    if(activeBtn){
        activeBtn.classList.add("bg-[#4A00FF]");
    }
}


function show_all(){
    loadCards();
};

function show_open(){
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(json =>{
        const allData = json.data;
        const openCards = allData.filter(cards=> cards.status === 'open');
        displayCards(openCards);
    });
};


function show_closed(){
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(json =>{
        const allData = json.data;
        const closedCards = allData.filter(cards=> cards.status === 'closed');
        displayCards(closedCards);
    });
};


const load_modals=(id)=>{
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(json=>{
        const all_data = json.data;
        const singleCard = all_data.find(item=>item.id === id);
        show_modals(singleCard);
    })
};


const show_modals=(cards)=>{
    console.log(cards);
    const display_modal = document.getElementById("display_modal");
    display_modal.innerHTML = "";
    
         display_modal.innerHTML = `
    <h3 class="font-bold text-[24px] text-[#1F2937] mb-[8px]">${cards.title}</h3>
    <div class="modal_top_flex flex gap-[8px] items-center">
        <button class="${cards.status === 'open' ? 'bg-[#00A96E]' : 'bg-[#A855F7]'} text-[#FFFFFF] text-[12px] font-medium rounded-full border-none outline-none px-[12px] py-[5px] flex gap-[2px] items-center">${cards.status}</button>
        <ul class="flex gap-[8px] list-disc list-inside text-[12px] text-[#64748B] font-normal">
            <li>${cards.status === 'open'?'Opened By:' : 'Closed By:'} ${cards.assignee ? cards.assignee : 'not mentioned'}</li>
            <li>Updated At: ${cards.updatedAt}</li>
        </ul>
    </div>
    <div class="card_lower_flex_items flex gap-[4px] mt-[24px]">
                <button class="${cards.labels[0] === 'enhancement'? 'bg-[#DEFCE8] text-[#00A96E]': 'bg-[#FEECEC] text-[#EF4444]'} text-[12px] font-medium rounded-full px-[15px] py-[4px] flex gap-[2px] items-center"><span><img src="${cards.labels[0] === 'enhancement' ? 'assets/sparkle.png' : 'assets/BugDroid.png'}" alt=""></span>${cards.labels[0]}</button>
                <button class="bg-[#FFF8DB] text-[#D97706] text-[12px] font-medium rounded-full px-[15px] py-[5px] flex gap-[2px] items-center"><span><img src="assets/Lifebuoy.png" alt=""></span>${cards.labels[1]?cards.labels[1] : "no label here" }</button>
    </div>
    <p class="text-[16px] text-[#64748B] font-normal mt-[24px]">${cards.description}}</p>
    
    <div class="modal_lower_flex_part flex gap-[30%] p-[16px] bg-[#F8FAFC] rounded-[8px] mt-[24px]">
        <div class="modal_lower_left space-y-[4px]">
            <p class="text-[16px] text-[#64748B] font-normal">Assignee:</p>
            <p class="text-[16px] text-[#1F2937] font-semibold">${cards.assignee ? cards.assignee : 'not mentioned'}</p>
        </div>
        <div class="modal_lower_right space-y-[4px]">
            <p class="text-[16px] text-[#64748B] font-normal">Priority:</p>
            <button class="${cards.priority === 'medium' ? 'bg-[#FFF6D1] text-[#F59E0B]' : cards.priority === 'low' ? 'bg-[#EEEFF2] text-[#9CA3AF]' : 'bg-[#FEECEC] text-[#EF4444]'} text-[12px] font-medium rounded-full border-none outline-none px-[12px] py-[2px] flex gap-[2px] items-center">${cards.priority}</button>
        </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-neutral bg-[#4A00FF] border-none rounded-[4px]">Close</button>
      </form>
    </div>
  </div>`;
    
    document.getElementById("my_modal_5").showModal();
};


const loadCards=()=>{
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(json => displayCards(json.data));
};


const displayCards=(cards)=>{
    const card_container = document.getElementById("card_container");
    card_container.innerHTML = "";
    issue_count.innerText = cards.length;
    for(let card of cards){
        const carDiv = document.createElement("div");
        carDiv.className = "card sm:w-[24.2%] w-[100%] shadow-[0px_0px_10px_rgba(209,213,219,0.5)]";
        carDiv.innerHTML = `
        <div class="card w-[100%] shadow-[0px_0px_2px_rgba(209,213,219,0.5)] ${card.status === 'closed' ? 'border-t-[4px] border-[#A855F7]' : 'border-t-[4px] border-[#00A96E]'}">

            <div class="card_upper_part shadow-sm rounded-t-[8px] w-[100%] p-[16px]">
                <div class="card_top_icons flex justify-between">
                <img onclick="load_modals(${card.id})" class="w-[24px] h-[24px] rounded-full" src="${card.status === 'closed' ? 'assets/closed.png' : 'assets/Open-Status.png'}" alt="">
                <button class="${card.priority === 'medium' ? 'bg-[#FFF6D1] text-[#F59E0B]' : card.priority === 'low' ? 'bg-[#EEEFF2] text-[#9CA3AF]' : 'bg-[#FEECEC] text-[#EF4444]'} text-[12px] font-medium rounded-full px-[15px] py-[5px]">${card.priority}</button>
            </div>

            <div class="card_midle_text">
                <h3 class="text-[14px] text-[#1F2937] font-semibold mt-[12px]">${card.title}</h3>
                <p class="text-[12px] text-[#64748B] font-normal mt-[8px]">${card.description}</p>
            </div>

            <div class="card_lower_flex_items flex gap-[4px] mt-[12px]">
                <button class="${card.labels[0] === 'enhancement'? 'bg-[#DEFCE8] text-[#00A96E]': 'bg-[#FEECEC] text-[#EF4444]'} text-[12px] font-medium rounded-full px-[15px] py-[3px] flex gap-[2px] items-center"><span><img src="${card.labels[0] === 'enhancement' ? 'assets/Sparkle.png' : 'assets/BugDroid.png'}" alt=""></span>${card.labels[0]}</button>
                <button class="bg-[#FFF8DB] text-[#D97706] text-[12px] font-medium rounded-full px-[15px] py-[3px] flex gap-[2px] items-center"><span><img src="assets/Lifebuoy.png" alt=""></span>${card.labels[1]?card.labels[1] : "no label here" }</button>
            </div>
            </div>

            <div class="card_lower_part shadow-sm rounded-b-[8px] w-[100%] p-[16px] space-y-[8px]">
                <p class="text-[12px] text-[#64748B] font-normal">author: ${card.author}</p>
                <p class="text-[12px] text-[#64748B] font-normal">createdAt: ${card.createdAt}</p>
            </div>

        </div>`
    card_container.append(carDiv);    
    }
};

loadCards();


document.getElementById("Search_button").addEventListener("click",()=>{
    const Search_input = document.getElementById("Search_input");
    const search_value = Search_input.value.trim().toLowerCase();
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res=>res.json())
    .then(json=>{
        const all_data = json.data;
        const cards = all_data.filter(card=>{
            const cardTitle = card.title ? card.title.toLowerCase() : "";
            return cardTitle.includes(search_value);
        });
        displayCards(cards);
    });
});