

let int1;


Notification.requestPermission((perm)=>{
    if(perm == 'granted'){
        int1 = setTimeout(() => {
            notify();
        }, 1000);
    }
});


////

let alerted = false;
function notify(msg){
    let n = new Notification(msg);
}
let int1;
int1 = setInterval(() => {
    if(document.querySelector('.gsrt.vk_bk.dDoNo.XcVN5d').innerText == '1:30 am'){
        alerted = true;
        clearInterval(int1);
        notify('its 1:30 am');
    }
}, 1000);