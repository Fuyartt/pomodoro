let interval = null;
let work_min = 25;
let rest_min = 5;
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

function fermer_parametre(){
    document.getElementById("popup").style.display = "none";
}


function parametre_test_est_nombre(input_travail,input_pause){
    if(input_travail == ""){
        alert("le champs du temps de travail ne doit contenir que des chiffres")
        return false
    } else{
        if(!Number.isInteger(parseFloat(input_travail))){
            alert("le champs du temps de travail ne doit contenir que des nombres entier")
            return false
        }
    }
    if(input_pause == ""){
        alert("le champs du temps de pause ne doit contenir que des chiffres")
        return false
    } else{
        if(!Number.isInteger(parseFloat(input_pause))){
            alert("le champs du temps de pause ne doit contenir que des nombres entier")
            return false
        }
    }
    return true
}


function parametre_test_interval(input_travail,input_pause){
    if(parseFloat(input_travail) < 10 || parseFloat(input_travail) > 120 ){
        alert("le temps de travail doit être compris entre 10 et 120 minutes")
        return false
    }
    if(parseFloat(input_pause) < 2 || parseFloat(input_pause) > 30 ){
        alert("le temps de pause doit être compris entre 2 et 30 minutes")
        return false
    }
    if(parseFloat(input_pause) > parseFloat(input_travail)){
        alert("le temps de pause ne peut pas être plus grand que le temps de travail")
        return false
    }
    return true
}

function apllication_parametre(){
    let input_travail = document.getElementById("input_travail").value;
    let input_pause = document.getElementById("input_pause").value;
    if(parametre_test_est_nombre(input_travail,input_pause)){
        if(parametre_test_interval(input_travail,input_pause)){
            document.getElementById("min").textContent = input_travail
            document.getElementById("sec").textContent = "00"
            work_min = parseInt(input_travail);
            rest_min = parseInt(input_pause);
            fermer_parametre()

         }

    }
        

}

function ouvrir_parametre(){
    document.getElementById("popup").style.display = "block";
    document.getElementById("input_travail").placeholder  = work_min
    document.getElementById("input_pause").placeholder  = rest_min
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