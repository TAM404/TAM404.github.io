function engineV1(str) {
    
    newstr = ""
    exerice= 0 ;
    str = str.split("\n");
    for (var i = 0; i < str.length; i++) {
        line = HTMLescape(str[i]);
        if (line.length != 0) {
            line = escaper(line).trim();

            if (line.startsWith("#")) {
                if (line.startsWith("##")) {
                    if (line.startsWith("###")) {
                        // ###
                        newstr += "<h3>" + line.slice(3) + "</h3>";
                    } else {
                        // ##
                        newstr += "<h2>" + line.slice(2) + "</h2>";
                    }
                } else {
                    // #
                    newstr += "<h1>" + line.slice(1) + "</h1>";
                }
            }
            else if (line.startsWith("[[[")) {
                newstr += "<img src=\" " + line.slice(3) + " \">";
            } 
            else if(line.startsWith("(((")){
                widget = line.slice(3).trim().split(" ");
                switch(widget[0]){
                    case "note":
                        newstr += "<dev class='note'>";
                        break;
                    case "gray":
                        newstr += "<dev class='gray'>";
                        break;
                    case "exercice":
                        newstr += "<details class='exercice' open>"
                        + "<summary class='exerciceSummary'>" + camelCase(widget.join(" ")) + "</summary>";
                        exerice++;
                        break;              
                    case "hint":
                        newstr += "<details class='hint'>"
                        + "<summary class='hintSummary'>" + camelCase(widget.join(" ")) + "</summary>";
                        break;
                    case "solution":
                        newstr += "<details class='solution'>"
                        + "<summary class='solutionSummary'>" + camelCase(widget.join(" ")) + "</summary>";
                        break;
                    case "warning":
                        newstr += "<details class='warning'>"
                        + "<summary class='warningSummary'>" + camelCase(widget.join(" ")) + "</summary>";
                        break;
                        
                    case "optionMulti":
                        newstr+=
                              '<input type="checkbox" id="optionMulti'+i+'"  name="'+exerice+'" value="'+
                            HTMLescape(widget.slice(1).join(" ")) +'">'
                              +'<label for="optionMulti' + i + '">'+'';
                        break;
                                
                    case "option":
                       newstr+=
                              '<input type="radio" id="option'+i+'" name="'+exerice+'" value="'+
                            HTMLescape(widget.slice(1).join(" ")) +'">'
                              +'<label for="option' + i + '">'+'';
                        break;
                    case "optionText":
                        newstr+=
                              '<input type="text" id="optiontext'+i+'" name="'+exerice+'" value="'+
                            HTMLescape(widget.slice(1).join(" ")) +'">'
                              +'<label for="optiontext' + i + '">'+'';
                        break;
                    case "optionNumber":
                         newstr+=
                              '<input type="number" id="optionNumber'+i+'"  name="'+exerice+'" value="'+
                            HTMLescape(widget.slice(1).join(" ")) +'">'
                              +'<label for="optionNumber' + i + '">'+'';
                        break;
                    case "check":
                        newstr+=
                              '<button class="checker-button">'
                            +(
                                (widget.slice(1).join(" ").length>0)
                                  ?
                                  widget.slice(1).join(" ") 
                                  :
                                  'Check Answer'
                            )
                            
                            +'</button>';
                        break;
                    default:
                        newstr+="";
                }
            }
            else if(line.startsWith(")))")){
                widget = line.slice(3).trim().split(" ");
                switch(widget[0]){
                    case "note":
                        newstr += "</dev>";
                        break;
                    case "gray":
                        newstr += "</dev>";
                        break;
                    case "exercice":
                        newstr += "</details>";
                        exerice++;
                        break;
                    case "hint":
                        newstr += "</details>";
                        break;
                    case "solution":
                        newstr += "</details>";
                        break;
                    case "warning":
                        newstr += "</details>";
                        break;
                    case "optionMulti":
                        newstr+="</label></div>";
                        break;
                    case "option":
                        newstr+="</label></div>";
                        break;
                    case "optionText":
                        newstr+="</label></div>";
                        break;
                    case "optionNumber":
                        newstr+="</label></div>";
                        break;
                    case "":
                        newstr+="</details>";
                        exerice++;
                        break;
                }
            }
            else{

                list = line.split("*");
                line = "";
                for (var j = 0; j < list.length; j++) {
                    if (j % 2)
                        line += "<b>" + list[j] + "</b>";
                    else
                        line += list[j];
                }

                list = line.split("^");
                line = "";
                for (var j = 0; j < list.length; j++) {
                    if (j % 2)
                        line += "<span style='color:#d94600;'>" + list[j] + "</span>";
                    else
                        line += list[j];
                }

                newstr += line + "</br>";

            }
        } else {
            newstr += "</br>";
        }
    }
    return newstr;
}

function camelCase(str){
    return str.slice(0,1).toUpperCase() + str.slice(1);
}
function HTMLescape(str) {
    return str.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

function HtmlEncode(s) {
    return "&#" + s.charCodeAt() + ";";
}

function escaper(str) {

    str2 = ""
    for (var i = 0; i < str.length - 1; i++) {
        if (str[i] == '\\') {
            str2 += HtmlEncode(str[i + 1]);
            i++;
        } else {
            str2 += str[i];
        }
    }
    return str2 + str[i];
}

function set_sidebar(data){
    $("#title").html( HTMLescape( data["name"] ) );
    newhtml = "";
    for(var i=0;i< data["sections"].length ;i++){
        section =data["sections"][i];
        newhtml += '<details><summary>' 
                + section["name"]+"</summary>";
        for(var j=0 ; j < section["lessons"].length ; j++){
            newhtml += 
                "<p><a href='?page="+section["lessons"][j]["path"] +"&course="+course+"'>"
                + section["lessons"][j]["name"] 
                + " </a></p>";
        }
        newhtml += "</details>";
    }
    $("#list").html( newhtml );
}

function treatQues(e){
    b=$('label[for="'+e.id+'"]')[0];
    switch(e.type){
        case "radio":
            b.classList=""; if(e.checked){
            if( e.value.trim() == "T" ){
        
                b.classList.add("correct");
            }
            else{
    
                b.classList.add("false");                
            }
            }
            break;
        case "checkbox":
            b.classList=""; if(e.checked){
            if( e.value.trim() == "T" ){
            
                b.classList.add("correct");
            }
            else{
             
                b.classList.add("false");                
            }
            }
            else{
                if( e.value.trim() == "T" ){
                   
                    b.classList.add("missing");
                }
            }
    }
}


function addListeners(){
        $(".checker-button").click(function(){ $(this).parent().children().toArray().forEach((e)=>treatQues(e)); })
}
