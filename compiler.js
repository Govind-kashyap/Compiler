let btn = document.getElementById('btn1');
let output = document.getElementById('compile');

function responsecode(codeId){
    let setvalue = setInterval(()=>{
        const xtr2 = new XMLHttpRequest();
    xtr2.open("GET",`https://course.codequotient.com/api/codeResult/${codeId}`);
    xtr2.send();
    xtr2.onload = () =>{
        
        const obj2 = JSON.parse(xtr2.responseText);
        const maindata = JSON.parse(obj2.data);
        console.log(maindata.output);
        if(maindata.hasOwnProperty("output"))
        {
            clearInterval(setvalue);
            output.textContent = maindata.output;
        }
    };
    },1000);
}


btn.addEventListener('click',()=>{
    let langId = document.getElementById('language').value;
    let code = document.getElementById('code').value;
    let data = {
        code : code.trim(),
        langId : langId
    }

    console.log(data);

    if(code.trim() === ""){
        alert("Enter the code");
    }
    else{
        output.style.display = "block";
        output.innerText = "Compiling..."
        const xtr = new XMLHttpRequest();
        xtr.open("POST","https://course.codequotient.com/api/executeCode");
        xtr.setRequestHeader("Content-Type","application/json");
        xtr.send(JSON.stringify(data));
        xtr.onload = () =>{
            const obj = JSON.parse(xtr.responseText)  ;
            let codeId = obj.codeId;
            responsecode(codeId);
    }
    }
});