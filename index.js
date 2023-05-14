class MinHeap{
    constructor(){
        this.heap_array=[];
    }

    size(){
        return this.heap_array.length;
    }

    empty(){
        return (this.size()===0);
    }

    top(){
        return this.heap_array[0];
    }


}
//Coder Decoder class
class Codec{

    encode(data)
    {
        this.heap=new MinHeap();
        var mp=new Map();

        //frequency of characters in my data
        for(let i=0;i<data.length;i++)
        {
            if(mp.has(data[i]))
            {
                let f=mp.get(data[i]);
                mp.set(data[i],foo+1);
            }
            else
            {
                mp.set(data[i],1);
            }
        }

        if(mp.size===0){
            let final_string="zero#";
            let output_message = "Compression complete and file sent for download. " + '\n' + "Compression Ratio : " + (data.length / final_string.length).toPrecision(6);
            return [final_string, output_message];
        }

    }

    decode(data)
    {
        let k=0;
        let temp="";
        while(k<data.length && data[k]!='#'){
            temp+=data[k];
            k++;
        }

        //No '#' in file(Not a encoded file)
        if(k==data.length){
            alert("Invalid File!\nPlease submit a valid compressed .txt file to decompress and try again!");
			location.reload();
			return;
        }

        if(temp==="zero"){
            let decoded_data="";
            let output_message="Decompression complete and file sent for download.";
            return [decoded_data, output_message];
        }

    }

}

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
     var uploadedFile=uploadFile.files[0];
        if(uploadedFile===undefined)
        {
            alert("No file uploaded. \nPlease upload a valid .txt file and then try again!");
            return;
        }

        if(isSubmitted===false)
        {
            alert("File not submitted. \nPlease click on submit button and then try again!");
            return;
        }

        if(uploadedFile.size === 0){
			alert("WARNING: You have uploaded an empty file!\nThe compressed file might be larger in size than the uncompressed file (compression ratio might be smaller than one).\nBetter compression ratios are achieved for larger file sizes!");
		}	
		else if(uploadedFile.size < 1000){
			alert("WARNING: The uploaded file is small in size (" + uploadedFile.size +" bytes) !\nThe compressed file's size might be larger than expected (compression ratio might be small).\nBetter compression ratios are achieved for larger file sizes!");
		}

        onClickChanges("Done!! Your file will be Compressed", step2);
        onClickChanges2("Compressing Your File....", "Compressed");

        let reader = new FileReader();
        reader.onload=function(){
            let text=reader.result();
            let [encodedString, outputMsg]=codecObj.encode(text);
            myDownloadFile(uploadedFile.name.split('.')[0]+"_compressed.txt", encodedString);
            onDownloadChanges(outputMsg);
        };
        reader.readAsText(uploadedFile, "UTF-8");
    }

    decodeBtn.onclick=function(){
        var uploadedFile=uploadFile.files[0];

        //If file is not uploaded
        if(uploadedFile===undefined){
            alert("No file uploaded.\nPlease upload a valid .txt file and try again!");
            return;
        }
        if(isSubmitted===false){
            alert("File not submitted.\nPlease click the submit button on the previous step\nto submit the file and try again!");
            return;
        }

        //Making Changes
        onClickChanges("Done!! Your file will be De-Compressed", step2);
        onClickChanges2("De-Compressing Your File....", "De-compressed");

        //Rading the file and sending it for decode and then, to download
        let reader = new FileReader();
        reader.onload = function() {
            let text=reader.result;
            let [decodedString, outputMsg]=codecObj.decode(text);
            myDownloadFile(uploadedFile.name.split('.')[0]+"_decompressed.txt", decodedString);
            onDownloadChanges(outputMsg);
        };
        reader.readAsText(uploadedFile, "UTF-8");
    }
}

    function onClickChanges(msg, step){
        step.innerHTML="";
        let msg1 = document.createElement("span");
        msg1.className = "text2";
        msg1.innerHTML = msg;
        step.appendChild(msg1);
    }

    function onClickChanges2(msg, word){
        decodeBtn.disabled=true;
        encodeBtn.disabled=true;
        step3.innerHTML="";
        let msg2 = document.createElement("span");
        msg2.className = "text2";
        msg2.innerHTML = msg;
        step3.appendChild(msg2);
        let msg3 = document.createElement("span");
        msg3.className = "text2";
        msg3.innerHTML = " , " + word + " file will be downloaded automatically!";
        step3.appendChild(msg3);
    }

    function myDownloadFile(fileName, text) {
        let a = document.createElement('a'); //creating an anchor tag
        a.href = "data:application/octet-stream," + encodeURIComponent(text);
        a.download = fileName;
        a.click();
    }

    function onDownloadChanges(outputMsg) {
        step3.innerHTML = "";
        let msg3 = document.createElement("span");
        msg3.className = "text2";
        msg3.innerHTML = outputMsg;
        step3.appendChild(msg3);
    }
