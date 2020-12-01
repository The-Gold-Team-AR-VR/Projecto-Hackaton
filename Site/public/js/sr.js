var terms = new Array();
var max = 6;
var i;

for (i=1;i<=max;i++) {
    terms[i] = new Array();
}

terms[1]['search'] = 'tete';
terms[1]['des'] = 'tete.html';
terms[1]['lnk'] = 'http://192.168.43.80:8080/tete.html';


terms[2]['search'] = 'gaz';
terms[2]['des'] = 'gaza.html';
terms[2]['lnk'] = 'http://192.168.43.80:8080/gaza.html';



function search() {


    var input = document.getElementById('searchbar').value.toLowerCase();
    var i=0;
    var list="";
    var pos=-1;

    if(input!="") {
        for(i=1; i<=max; i++) {
            pos= terms[i]['search'].indexOf(input);

            console.log(terms[i]['search']+pos);

            if(pos!=-1) {
                list= list + '<a class="search_lnk" href="' + terms[i]['des']+ '">'+terms[i]['des']+ '</a>' + '<br>';
            }
            pos=-1;
        }

        console.log(list);

        if(list==""){
            document.getElementById("listing").innerHTML = "";
            document.getElementById("listing").style.display = "none";
        } else {
            document.getElementById("listing").innerHTML = list;
            document.getElementById("listing").style.display = "block";
        }
    }
}