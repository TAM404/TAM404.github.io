
function engineV1(str) {
    newstr = ""
    str = str.split("\n");
    for (var i = 0; i < str.length; i++) {
        line = HTMLescape(str[i]);
        if (line.length != 0) {
            line = escaper(line);

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
                widget = line.slice(3).trim();
                switch(widget){
                    case "note":
                        newstr += "<dev class='note'>";
                        break;
                    case "gray":
                        newstr += "<dev class='gray'>";
                        break;
                    default:
                        newstr+="";
                }
            }
            else if(line.startsWith(")))")){
                widget = line.slice(3).trim();
                switch(widget){
                    case "note":
                        newstr += "</dev>";
                        break;
                    case "gray":
                        newstr += "</dev>";
                        break;
                    default:
                        newstr+="";
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
                "<p><a href='"+section["lessons"][j]["path"] +"'>"
                + section["lessons"][j]["name"] 
                + " </a></p>";
        }
        
        newhtml += "</details>";
        
    }
    $("#list").html( newhtml );
}
