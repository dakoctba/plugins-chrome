//this extention created by ----> fadyAyoobDev@gmail.com

var count=0;
var lastMembers;
var currentMembers;

var intScroll= setInterval(function(){},100);


function msgHandler(msg) {
    if (msg === 'start' || msg.name === 'start' ) {
      checkUrl();
    }
}

function checkUrl(){
    url=document.URL;
    
    if( url.indexOf('www.facebook.com/groups')>=0 && url.indexOf('/members/')>=0 ){
        start()
    }
    else{
        showErrorMsg();
    }
}

function start(){
    //
    currentMembers= saveToVar();
    lastMembers= saveToVar();
    
    intScroll= setInterval(function(){scrollFunction(); },500);
}

function collectData(data){
     rows = [["name", "profileLink", "job","company"]];
    
    for (i=1;i<data.length;i++){
        try{
        
            links=data[i].getElementsByTagName('a');
            var xx=1;

            link=data[i].getElementsByTagName('a')[links.length-xx].href;
         /*   link=link.split("?fref=gm");
            link=link[0];*/

            name=data[i].getElementsByTagName('a')[links.length-1].innerText;

            if( name.indexOf('recent posts')>0){
                xx++;
                link=data[i].getElementsByTagName('a')[links.length-xx].href;

                name=data[i].getElementsByTagName('a')[links.length-xx].innerText;
            }



            if( name=='Admin'  ){
                xx++;
                link=data[i].getElementsByTagName('a')[links.length-xx].href;

                name=data[i].getElementsByTagName('a')[links.length-xx].innerText;
            }


            link=link.split("fref=gm");
            link=link[0];


            try{
                workLables= data[i].getElementsByClassName('_60rj');
                work=workLables[workLables.length-1].innerText;
                if(!work){
                    work=workLables[workLables.length-2].innerText;
                }
            }
            catch(e){

            }


            if (work.indexOf('Added')==0 || work.indexOf('at')==-1){
                work='';
                job='';
                comp='';
            }
            else{
                try{
                    work=work.split(' at ');

                    job=work[0];
                    comp=work[1];
                }
                catch(e){
                     try{
                    work=work.split(' for ');

                    job=work[0];
                    comp=work[1];
                    }
                    catch(e){

                    }
                }
            }




            rows[i-1]=[name, link, job,comp];
        }
        catch(e){
            rows[i-1]=['not avilable', 'not avilable', 'not avilable','not avilable'];
        }
    }
    console.log(rows);
    extractData();
}

function extractData(){
    let csvContent = "data:text/csv;charset=utf-8,";
    rows.forEach(function(rowArray){
       let row = rowArray.join(",");
       csvContent += row + "\r\n";
    }); 
    
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    
    fileName=seo_h1_tag.innerText+"--Members.csv";
    link.setAttribute("download", fileName);
    document.body.appendChild(link); // Required for FF
    count=0;

    link.click();
    
}

function scrollFunction(){
    console.log("n  :"+currentMembers.length+" "+lastMembers.length);

    currentMembers= saveToVar();

    window.scrollTo(0, 1000000000000000000000000000);
    console.log(currentMembers.length+" "+lastMembers.length);
    if (currentMembers.length!= lastMembers.length){
        lastMembers = saveToVar();

        count=0;
    }
    else {
      count++;
    }
    
    console.log("count : "+count);
    
    if(count>=10){
        clearInterval(intScroll);
        collectData(currentMembers);
    }
}

function saveToVar(){
    Var =[0]
    members= document.getElementsByClassName('clearfix _60rh _gse');
    
    for(i=0;i<members.length;i++){
        Var[i]= document.getElementsByClassName('clearfix _60rh _gse')[i];
    }
    return Var;
}

function showErrorMsg(){
    alert('Extension Cannot work with this page!! \nplease go to the member page which you want to scrap ')
}
