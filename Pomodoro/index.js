function decompte(){
    let compteur_sec = 59;
    let compteur_min = 24
    let p_min = document.getElementById("min");
    let p_sec = document.getElementById("sec");
    let interval = setInterval(deroule,1000);

  /* p_sec.textContent = parseInt(p_sec.textContent) -1
   if(parseInt(p_sec.textContent)<10){
    if(parseInt(p_sec.textContent) == -1){
        p_sec.textContent = 59;
        p_min.textContent = parseInt(p_min.textContent) -1
        if(parseInt(p_min.textContent) < 10){
            p_min.textContent = 0 +p_min.textContent
            if(parseInt(p_min.textContent) == 0){
            }
        }
    } 
    else{
        p_sec.textContent = 0 +p_sec.textContent
    }
   }*/
    

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
             p_min.textContent = 0 +p_min.textContent
             if(parseInt(p_min.textContent) == 0){
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