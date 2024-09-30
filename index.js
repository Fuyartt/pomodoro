let interval = null;
let work_min = 24;
let rest_min = 4;
let work_or_rest = "work"
let decompteur = true;
document.getElementById("p_travail").style.color ="lightgreen";


function initialize(option){
    if (option == true){
        interval = setInterval(deroule,1000);
    } else{
        clearInterval(interval);
    }
}

function reset(){
    location.reload();
}

function decompte(){
    document.getElementById("lancer").hidden = true;
    if(decompteur == true){
        initialize(true);
        decompteur = false;
    }

}

function parametrer(){
    document.getElementById("popup").style.display = "flex";
}

function deroule(){
    let p_min = document.getElementById("min");
    let p_sec = document.getElementById("sec");
    p_sec.textContent = parseInt(p_sec.textContent) -1
    if(parseInt(p_sec.textContent)<10){
     if(parseInt(p_sec.textContent) == -1){
         p_sec.textContent = 59;
         p_min.textContent = parseInt(p_min.textContent) -1
         if(parseInt(p_min.textContent) < 10){
            if(parseInt(p_min.textContent) == -1){
                if(work_or_rest == "work"){
                    p_min.textContent = rest_min;
                    work_or_rest = "rest"
                    document.getElementById("p_travail").style.color ="grey";
                    document.getElementById("p_pause").style.color ="lightgreen";
                    
                }else{
                    p_min.textContent = work_min;
                    work_or_rest = "work"
                    document.getElementById("p_pause").style.color ="grey";
                    document.getElementById("p_travail").style.color ="lightgreen";
                }
             } else{
                p_min.textContent = 0 +p_min.textContent
             }
             
             
         }
     } 
     else{
         p_sec.textContent = 0 +p_sec.textContent
     }
}
}


let lancer = document.getElementById("lancer")
//lancer.addEventListener('click',decompte(),false);