
//hide the parametersBox initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none'; 

//if the user clicks on params radio, hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click',()=>{
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
});

//if the user clicks on json radio, hide the params box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click',()=>{
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
});

//initialize no of parameters
let addedParamCount = 0;

//if the user clicks on '+' button add more parameters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click',()=>{
    let params = document.getElementById('params');
    let str =   `<div class="form-row my-2">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2}  Key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
                    </div>
                    <button class="btn btn-primary deleteParam">-</button>
                </div>`;
    let paramElement = getElementFromString(str);
    params.appendChild(paramElement);

    //add an event listener to remove parameter  on clicking '-' button 
    let deleteParam = document.getElementsByClassName('deleteParam');   
    for(item of deleteParam){  
        item.addEventListener('click', (e)=>{
            e.target.parentElement.remove();
        });
    }
    addedParamCount++;
});

//Utility function:
// 1. utility function to get DOM element
function getElementFromString(string){
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}


//submit button
let submit = document.getElementById('submit');
submit.addEventListener('click',()=>{
    document.getElementById('responsePrism').innerHTML = 'Please wait...Fetching';
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;


    //custom parameters
    if (contentType == 'params'){
        data = {};
        for (let i = 0; i < addedParamCount+1; i++) {
            if(document.getElementById('parameterKey' + (i+1)) != undefined){
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }          
        }
        //convert the object/json data into string
        data = JSON.stringify(data);
    }

    //json
    else{
        data = document.getElementById('requestJsonText').value;
    }

    //if the request type is GET/POST, invoke fetchapi to create a get/post request
    if(requestType == 'GET'){
        fetch(url,{
            method: 'GET'
        }).then((response)=> response.text()).then((text)=>{
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
    });
    }

    //POST
    else{
        fetch(url,{
            method: 'POST',
            body: data,
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response)=> response.text()).then((text)=>{
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
    });

    }
});







