//When window is onloaded
window.onload=function(){
    decodeBtn = document.getElementById("decode");
    encodeBtn = document.getElementById("encode");
    fileForm = document.getElementById("fileForm");
    uploadFile = document.getElementById("uploadFile");
    submitBtn = document.getElementById("submitBtn");
    step1=document.getElementById("step1");
    step2=document.getElementById("step2");
    step3=document.getElementById("step3");

    isSubmitted = false;
    //code not written

    submitBtn.onclick=function(e){
        e.preventDefault(); //default action lined to event e will not occur
        var uploadedFile=uploadFile.files[0];

        //check if file is uploaded or not , add code btn
        if(uploadedFile==undefined)
        {
            alert("No file uploaded. \nPlease upload a valid .txt file and then try again!");
            return;
        }
        console.log(uploadedFile);
        //check if the file uploaded is valid .txt file or not
        let nameSplit=uploadedFile.name.split('.');
        let extension=nameSplit[nameSplit.length-1].toLowerCase();
        if(extension!="txt")
        {
            alert("Invalid file type (."+extension+".). \nPlease upload a valid .txt file and then try again!");
            return;
        }

        isSubmitted=true;
        onClickChanges("Done!! File Uploaded!",step1);
    }

    //add encode btn

    encodeBtn.onclick=function(){
        
    }
}