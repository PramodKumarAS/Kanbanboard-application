const add_Ele = document.querySelector('.add');
const task_modal = document.querySelector('.modal-cont');
const textAreaCont = document.querySelector('.textArea-cont');
const remove = document.querySelector('.remove');
let removeAll = document.querySelector('.removeAll');

//#region  Handling modal-cont Popup
let flag = false;
function handlePopup(){
    
    add_Ele.addEventListener('click',()=>{
        
        flag=!flag;
        
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
    console.log(ev)
    if(ev.key==='Shift'){
        let textAreaVal = textAreaCont.value;
        
        //let ticketid =Math.random().toString(36).substring(2);
        const ticketid = shortid()
        createTicket(ticketColor,textAreaVal,ticketid)
    }
})

function createTicket(ticketColor,textAreaVal,ticketid){
    const mainCont = document.querySelector('.main-cont');
    console.log("Third")

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
    task_modal.style.display='none';
    textAreaCont.value='';

    pickPriority()
    lock(ticketcont)
    ReestPriorityColor()
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
        console.log(ticketColor)
    });
})
//#endregion

//#region  Remove all Tasks
removeAll.addEventListener('click',(ev)=>{
   
    const ticketCont = document.querySelectorAll('.ticket-cont');

    console.log(ticketCont)
    ticketCont.forEach(ticket=>{
        ticket.remove();
    })
})
//#endregion

//#region Remove Task by selecting them
let remFlag = false;
remove.addEventListener('click',(ev)=>{
    remFlag=!remFlag;
    const ticketCont = document.querySelectorAll('.ticket-cont');

    if(remFlag){
        remove.style.color="red";
        alert("Delete Tickets Activated")
    }

    else{
        remove.style.color="white";

    }
    for(let i=0; i<ticketCont.length; i++){
        removeTickets(ticketCont[i])
    }
})

function removeTickets(ticketCont){
        ticketCont.addEventListener('click',(ev)=>{
            if(remFlag=== true){
                ticketCont.remove();
            }
    })
}
//#endregion

//#region  Change Priority color
function pickPriority(){

    const COLORS =["lightpink","lightgreen","lightblue","black"];
    
    let ticketPriorityColor_Ele = document.querySelectorAll('.ticket-color');
    ticketPriorityColor_Ele.forEach(color=>{
        color.addEventListener('click',(ev)=>{

            const currColor = ev.target.style.backgroundColor;
            console.log(currColor);

            const currColorIndex = COLORS.indexOf(currColor);
            console.log(currColorIndex)

            let nextIndex = (currColorIndex+1)%COLORS.length;
            const nextColor = COLORS[nextIndex];
            console.log(nextColor)

            color.style.backgroundColor =nextColor;


        })
    })
}
//#endregion

//#region  locking mechanism
function lock(ticketcont){
    let lockflag=false;
    
    const lockEle = document.querySelectorAll('.fa-solid');
    console.log("Second")
    lockEle.forEach(lock=>{
        lock.addEventListener('click',(ev)=>{
            lockflag=!lockflag;
            const ticketareaEle = ticketcont.querySelector('.ticket-area');
            console.log(ticketareaEle)
            if(lockflag){
                lock.classList.replace('fa-lock','fa-unlock');
                ticketareaEle.setAttribute('contenteditable', "true"); 
            }
            else{
                lock.classList.replace('fa-unlock','fa-lock');
                ticketareaEle.setAttribute('contenteditable', "false"); 
            }
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
        console.log(selectedColor)

        const ticketCol = document.querySelectorAll('.ticket-color');
        console.log(ticketCol)

        for(let i=0; i<ticketCol.length; i++){
            const currCol = ticketCol[i].style.backgroundColor;
            console.log(currCol)

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
        console.log("Hw")

        const ticketCol = document.querySelectorAll('.ticket-color');

        for(let i=0; i<ticketCol.length; i++){
            ticketCol[i].parentElement.style.display='block';
        }
    })
}
//#endregion
