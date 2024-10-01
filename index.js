/**
 * Javascript du projet Pomodoro
 * @author Maxime "Fuyartt" JEAN
 */

let interval = null;
let reference_temps_travail_min;
let reference_temps_pause_min;
let periode = "work"
let faut_il_initialiser_timer = true;

gestion_local_storage()


/**
 * function  pour lancer l'intervale ou l'arreter
 * @param {boolean} option 
 */
function initialise_timer(option){
    if (option == true){
        interval = setInterval(decompte,1000);
    } else{
        clearInterval(interval);
    }
}
/**
 * Regarde si il y a des préférences de temps de travail et de pause dans le localstorage
 * si oui --> met à jour les variables globales 'reference_temps_travail_min' et 'reference_temps_pause_min'  avec les valeur du storage 
 *        --> met a jour l'affichage si les valeurs ont changées en fonction de la var 'periode'
 * si non --> met les variables globales à leurs valeurs de base
 */
function gestion_local_storage(){
    if(localStorage.length == 0){
        reference_temps_travail_min = 25
        reference_temps_pause_min = 5
    }else{
        let old_reference_temps_travail_min = reference_temps_travail_min;
        let old_rest_min = reference_temps_pause_min;
        reference_temps_travail_min = parseInt(localStorage.getItem("temps_travail"))
        reference_temps_pause_min = parseInt(localStorage.getItem("temps_pause"))
        if(periode == "work" && old_reference_temps_travail_min != reference_temps_travail_min ){
            document.getElementById("min").textContent = reference_temps_travail_min
            document.getElementById("sec").textContent = "00"
        }else if(periode == "rest" && old_rest_min != reference_temps_pause_min) {
            if(reference_temps_pause_min < 10){
                document.getElementById("min").textContent = "0" + reference_temps_pause_min
            }else{
                document.getElementById("min").textContent = reference_temps_pause_min
            }
            document.getElementById("sec").textContent = "00"
        }
        
    }
}
 /**
  * fonction utilisée par le bouton de rafraichissement de la page
  * --> recharge la page
  */
function reset(){
    location.reload();
}

/**
 * fonction utilisée par le bouton de lancement du chrono
 * appelle la function initialise_timer
 */

function lancement(){
    document.getElementById("lancer").hidden = true;
    if(faut_il_initialiser_timer == true){
        initialise_timer(true);
        faut_il_initialiser_timer = false;
    }

}

/**
 * cache la fenêtre du choix des préférences de temps
 */
function fermer_parametre(){
    document.getElementById("popup").style.display = "none";
}

/**
 * fonction de verification des champs d'input utilisée par la fonction application_parametre
 * --> verifie que la valeur des champs 'input_travail' et 'input_pause' soient des nombres entiers
 *     sinon : envoie des alerts
 * @param {String} input_travail 
 * @param {String} input_pause 
 * @returns {Boolean}
 */
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

/**
 * fonction de verification des champs d'input utilisée par la fonction application_parametre
 * --> verifie que la valeur des champs 'input_travail' et 'input_pause' rentre dans les intervalless attendues
 *     sinon : envoie des alerts
 * @param {String} input_travail 
 * @param {String} input_pause 
 * @returns {boolean}
 */
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
/**
 * fonction qui applique les préférences saisies. Appelle des fonctions pour vérifier le contenu des saisies.
 * Entre les valeurs saisies valides dans le localstorage eet appelle la fonction 'gestion_local_storage()'
 */
function apllication_parametre(){
    let input_travail = document.getElementById("input_travail").value;
    let input_pause = document.getElementById("input_pause").value;
    if(parametre_test_est_nombre(input_travail,input_pause)){
        if(parametre_test_interval(input_travail,input_pause)){
            localStorage.setItem("temps_travail",input_travail)
            localStorage.setItem("temps_pause",input_pause)
            gestion_local_storage()
            fermer_parametre()

         }

    }
        

}
/**
 * affiche la fenêtre de personnalisation des temps
 */
function ouvrir_parametre(){
    document.getElementById("popup").style.display = "block";
    document.getElementById("input_travail").placeholder  = reference_temps_travail_min
    document.getElementById("input_pause").placeholder  = reference_temps_pause_min
}
/**
 * fonction qui s'occupe du chrono appelée par un setInterval
 * --> désincremente les secondes à chaque appel
 * --> désincremente les minutes 
 * --> gère le changement de période
 * --> met à jour l'affichage
 */
function decompte(){
    let element_html_p_min = document.getElementById("min");
    let element_html_p_sec = document.getElementById("sec");
    element_html_p_sec.textContent = parseInt(element_html_p_sec.textContent) -1
    if(parseInt(element_html_p_sec.textContent)<10){
     if(parseInt(element_html_p_sec.textContent) == -1){
         element_html_p_sec.textContent = 59;
         element_html_p_min.textContent = parseInt(element_html_p_min.textContent) -1
         if(parseInt(element_html_p_min.textContent) < 10){
            if(parseInt(element_html_p_min.textContent) == -1){
                if(periode == "work"){
                    element_html_p_min.textContent = reference_temps_pause_min-1;
                    periode = "rest"
                    document.getElementById("p_travail").style.color ="white";
                    document.getElementById("p_pause").style.color ="lightgreen";
                    
                }else{
                    element_html_p_min.textContent = reference_temps_travail_min-1;
                    periode = "work"
                    document.getElementById("p_pause").style.color ="white";
                    document.getElementById("p_travail").style.color ="lightgreen";
                }
             } else{
                element_html_p_min.textContent = 0 +element_html_p_min.textContent
             }
             
             
         }
     } 
     else{
         element_html_p_sec.textContent = 0 +element_html_p_sec.textContent
     }
}
}