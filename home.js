const button_all = document.getElementById("button_all");
const button_open = document.getElementById("button_open");
const button_closed = document.getElementById("button_closed");


const load_modals=(id)=>{
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(json => show_modals(json.data));
};


const show_modals=(cards)=>{
    const display_modal = document.getElementById("display_modal");
    display_modal.innerHTML = "";
    display_modal.innerHTML = `
    <h3 class="font-bold text-[24px] text-[#1F2937] mb-[8px]">Fix broken image uploads</h3>
    <div class="modal_top_flex flex gap-[8px] items-center">
        <button class="bg-[#00A96E] text-[#FFFFFF] text-[12px] font-medium rounded-full border-none outline-none px-[12px] py-[5px] flex gap-[2px] items-center">Opened</button>
        <ul class="flex gap-[8px] list-disc list-inside text-[12px] text-[#64748B] font-normal">
            <li>Opened by Fahim Ahmed</li>
            <li>22/02/2026</li>
        </ul>
    </div>
    <div class="card_lower_flex_items flex gap-[4px] mt-[24px]">
                <button class="bg-[#FEECEC] text-[#EF4444] text-[12px] font-medium rounded-full px-[15px] py-[4px] flex gap-[2px] items-center"><span><img src="assets/BugDroid.png" alt=""></span>bug</button>
                <button class="bg-[#FFF8DB] text-[#D97706] text-[12px] font-medium rounded-full px-[15px] py-[5px] flex gap-[2px] items-center"><span><img src="assets/Lifebuoy.png" alt=""></span>help wanted</button>
    </div>
    <p class="text-[16px] text-[#64748B] font-normal mt-[24px]">The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.</p>
    
    <div class="modal_lower_flex_part flex gap-[30%] p-[16px] bg-[#F8FAFC] rounded-[8px] mt-[24px]">
        <div class="modal_lower_left space-y-[4px]">
            <p class="text-[16px] text-[#64748B] font-normal">Assignee</p>
            <p class="text-[16px] text-[#1F2937] font-semibold">Fahim Ahmed</p>
        </div>
        <div class="modal_lower_right space-y-[4px]">
            <p class="text-[16px] text-[#64748B] font-normal">Priority:</p>
            <button class="bg-[#EF4444] text-[#FFFFFF] text-[12px] font-medium rounded-full border-none outline-none px-[12px] py-[5px] flex gap-[2px] items-center">HIGH</button>
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
}


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
        const carDiv = document.createElement("div");
        carDiv.className = "card w-[24.2%] shadow-[0px_0px_10px_rgba(209,213,219,0.5)]";
        carDiv.innerHTML = `
        <div class="card w-[100%] shadow-[0px_0px_2px_rgba(209,213,219,0.5)] ${card.priority === 'low' ? 'border-t-[4px] border-[#A855F7]' : 'border-t-[4px] border-[#00A96E]'}">

            <div class="card_upper_part shadow-sm rounded-t-[8px] w-[100%] p-[16px]">
                <div class="card_top_icons flex justify-between">
                <img onclick="load_modals(${card.id})" class="w-[24px] h-[24px] rounded-full" src="${card.priority === 'low' ? 'assets/closed.png' : 'assets/Open-Status.png'}" alt="">
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
                <p class="text-[12px] text-[#64748B] font-normal">assignee: ${card.assignee}</p>
                <p class="text-[12px] text-[#64748B] font-normal">createdAt: ${card.createdAt}</p>
                <p class="text-[12px] text-[#64748B] font-normal">updatedAt: ${card.updatedAt}</p>
            </div>

        </div>`
    card_container.append(carDiv);    
    }
};

loadCards();