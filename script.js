const add_Ele = document.querySelector('.add');
const task_modal = document.querySelector('.modal-cont');
const textAreaCont = document.querySelector('.textArea-cont');
const remove = document.querySelector('.remove');
let removeAll = document.querySelector('.removeAll');
let taskArray=[];

//#region local storage Note:Whenever dealing with JSON.parse always use try catch block to handling it.
if(localStorage.getItem("tickets")){

    try {
        let tickets = JSON.parse(localStorage.getItem("tickets"));
        tickets.forEach((ticket)=>{
    
            createTicket(ticket.ticketColor,ticket.textAreaVal,ticket.ticketid);
        })
    } catch (error) {
        console.log("There seems to be an error in creating ticket");
        localStorage.removeItem("tickets");
    }
   
}
//#endregion

//#region  Handling modal-cont Popup
let flag = false;
function handlePopup(){
    
    add_Ele.addEventListener('click',()=>{
        
        //flag=!flag;
        if (flag === true) {
            flag = false
        } else {
            flag = true;
        }
    
        if(flag){
            task_modal.style.display ='flex';
        }
        
        else{
            task_modal.style.display ='none'
        }
    });
    
}

handlePopup();
//#endregion

//#region  Create Ticket dynamically
let ticketColor='lightpink  ';
task_modal.addEventListener('keydown',(ev)=>{
    console.log(ev.key);
    if(ev.key==='Tab'){
        let textAreaVal = textAreaCont.value;
        
        //let ticketid =Math.random().toString(36).substring(2);
        const ticketid = shortid()
        createTicket(ticketColor,textAreaVal,ticketid);
    }
})


function createTicket(ticketColor,textAreaVal,ticketid){

    const mainCont = document.querySelector('.main-cont');

    const ticketcont = document.createElement('div');
    ticketcont.classList.add('ticket-cont');
    ticketcont.innerHTML=`
                    <div class="ticket-color" style="background-color: ${ticketColor}"></div>
                    <div class="ticket-id">${ticketid}</div>
                    <div class="ticket-area">${textAreaVal}</div>
                    <div class="ticket-lock">
                        <i class="fa-solid fa-lock"></i>                        
                    `;

    mainCont.appendChild(ticketcont);
    taskArray.push({ticketColor,textAreaVal,ticketid});
    localStorage.setItem("tickets",JSON.stringify(taskArray));
    task_modal.style.display='none';
    textAreaCont.value='';

    pickPriority(ticketcont);
    lock(ticketcont);
    ReestPriorityColor();
}
//#endregion

//#region  to get the Active Ticket color
const colors = document.querySelectorAll('.priority-color');

colors.forEach(color=>{
    color.addEventListener('click',(ev)=>{
        for(let i=0; i<colors.length; i++){
            colors[i].classList.remove('active');
        }

        color.classList.add('active');
        ticketColor = color.getAttribute('data-color');
    });
})
//#endregion

//#region  Remove all Tasks
removeAll.addEventListener('click',(ev)=>{
   
    const ticketCont = document.querySelectorAll('.ticket-cont');

    ticketCont.forEach(ticket=>{
        ticket.remove();
        localStorage.removeItem("tickets");
    })
})
//#endregion

//#region Remove Task by selecting them
let remFlag = false;
remove.addEventListener('click',(ev)=>{
    remFlag=!remFlag;
    const ticketCont = document.querySelectorAll('.ticket-cont');
    if(ticketCont.length===0){
        alert("No Ticekts found to remove.")
    }

    else if(remFlag){
        remove.style.color="red";
        alert("Delete Tickets Activated")
    }

    else{
        remove.style.color="white";
    }

    for(let i=0; i<ticketCont.length; i++){
        removeTickets(ticketCont[i]);
    }
})

function removeTickets(ticketCont){
       const id = ticketCont.querySelector('.ticket-id').innerText;

        ticketCont.addEventListener('click',(ev)=>{
            if(remFlag=== true){
                ticketCont.remove();
                const ticketIndex = getTicketIdx(id);
                taskArray.splice(ticketIndex,1);
                localStorage.setItem("tickets",JSON.stringify(taskArray));
            }
    })
}
//#endregion

//#region  Change Priority color
function pickPriority(ticketcont){

    const COLORS =["lightpink","lightgreen","lightblue","black"];
    
    let ticketPriorityColor_Ele = ticketcont.querySelector('.ticket-color');
    ticketPriorityColor_Ele.addEventListener('click',(ev)=>{

            const currColor = ticketPriorityColor_Ele.style.backgroundColor;

            const currColorIndex = COLORS.indexOf(currColor);

            let nextIndex = (currColorIndex+1)%COLORS.length;
            const nextColor = COLORS[nextIndex];

            ticketPriorityColor_Ele.style.backgroundColor =nextColor;


        })
    
}

//#endregion

//#region  locking mechanism
function lock(ticketcont){
    let lockflag=false;
    
    const lockEle = document.querySelectorAll('.fa-solid');
    lockEle.forEach(lock=>{
        lock.addEventListener('click',(ev)=>{
            lockflag=!lockflag;
            const ticketareaEle = ticketcont.querySelector('.ticket-area');
            let id = ticketcont.querySelector('.ticket-id').innerText;

            const ticketIndex = getTicketIdx(id);

            if(lockflag){
                lock.classList.replace('fa-lock','fa-unlock');
                ticketareaEle.setAttribute('contenteditable', "true"); 
            }
            else{
                lock.classList.replace('fa-unlock','fa-lock');
                ticketareaEle.setAttribute('contenteditable', "false"); 
            }

            taskArray[ticketIndex].textAreaVal = ticketareaEle.innerText;
            localStorage.setItem("tickets",JSON.stringify(taskArray));
        })
    })
}
//#endregion

//#region  Ticket Filter By Priority Color
function filterByPriorityColor(){
    const colors = document.querySelectorAll('.color');
    colors.forEach(color=>{
        color.addEventListener('click',(ev)=>{
        const selectedColor =color.classList[0];

        const ticketCol = document.querySelectorAll('.ticket-color');

        for(let i=0; i<ticketCol.length; i++){
            const currCol = ticketCol[i].style.backgroundColor;

            if(currCol===selectedColor){
                ticketCol[i].parentElement.style.display='block';
            }else{
                ticketCol[i].parentElement.style.display='none';

            }
        }
    })
    })
}
filterByPriorityColor()
//#endregion

//#region  Reset Filter
function ReestPriorityColor(){
    const reset = document.querySelector('.reset');
    reset.addEventListener('click',(ev)=>{

        const ticketCol = document.querySelectorAll('.ticket-color');

        for(let i=0; i<ticketCol.length; i++){
            ticketCol[i].parentElement.style.display='block';
        }
    })
}
//#endregion

//#region  GetTicket Index
function getTicketIdx(id) {
    // find the ticket obj index from my LS.
    // that is the ticket that needs to be updated.

    let ticketIdx = taskArray.findIndex(function (ticketObj) {
        return ticketObj.ticketid === id;
    })

    return ticketIdx;
}
//#endregion