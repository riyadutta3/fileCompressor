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

    push(value){
        this.heap_array.push(value);
        this.up_heapify();
    }

    pop()
    {
        if(this.empty()==false)
        {
            var last_index=this.size()-1;
            this.heap_array[0]={...this.heap_array[last_index]}; //... is spread syntax
            this.heap_array.pop();
            this.down_heapify();
        }
    }
	
   //down heapify will be used for deleting a node and again making our heap a min heap
    down_heapify(){
        var currIndex=0;
        while(currIndex<this.size())
        {
            var currEle=this.heap_array[currIndex];
            var childInd1=(currIndex*2)+1;
            var childInd2=(currIndex*2)+2;
            var childEle1=this.heap_array[childInd1];
            var childEle2=this.heap_array[childInd2];
            var smallest=currIndex;

            if(childInd1<this.size() && this.heap_array[childInd1][0]< this.heap_array[smallest][0])
            {
                smallest=childInd1;
            }

            if(childInd2<this.size() && this.heap_array[childInd2][0]< this.heap_array[smallest][0])
            {
                smallest=childInd2;
            }

            if(smallest==childInd1){
                this.heap_array[childInd1]=currEle;
                this.heap_array[currIndex]=childEle1;
                currIndex=childInd1;
            }
            else if(smallest==childInd2){
                this.heap_array[childInd2]=currEle;
                this.heap_array[currIndex]=childEle2;
                currIndex=childInd2;
            }
            else
             break;
        }
    }

    //up heapify is done to add elements in the heap and maintaining the property of the heap
    up_heapify(){
        var currIndex=this.size()-1;
        while(currIndex>0){
            var currEle=this.heap_array[currIndex];
            var parentInd=Math.trunc((currIndex-1)/2);
            var parentEle=this.heap_array[parentInd];

            if(parentEle[0]<currEle[0])
            {
                break;
            }
            else
            {
                this.heap_array[parentInd]=currEle;
                this.heap_array[currIndex]=parentEle;
                currIndex=parentInd;
            }
        }
    }



}
//Coder Decoder class
class Codec{
	
    // Converting Huffman tree into a string
    make_string(node){
        if(typeof(node[1])==="string"){
            return "'"+node[1];
        }
        return '0'+this.make_string(node[1][0])+'1'+this.make_string(node[1][1]);
    }

    // Converting Huffman string into a tree
    make_tree(tree_string){
        //this.index=index;
        let node=[];
        if (tree_string[this.index] === "'") {
			this.index++;
			node.push(tree_string[this.index]);
			this.index++;
			return node;
		}
        this.index++;
        node.push(this.make_tree(tree_string));//Pushing left child
        this.index++;
        node.push(this.make_tree(tree_string));//Pushing Right child
        return node;
    }

    //getting codes of all the characters
    getCodes(node,curr_code){
        //if leaf node is found
        if(typeof(node[1])==="string"){ //beacuse only leaf node has character, all others will have array of the two nodes combined
            this.codes[node[1]]=curr_code;
            return;
        }

        //else explore left and right child

        this.getCodes(node[1][0],curr_code+'0'); //left child                              
        this.getCodes(node[1][1],curr_code+'1'); //right child
    }

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
	    
	//if input file has only one character
        if(mp.size===1)
        {
            let key, value;
            for(let [k,v] of mp)
            {
                key=k;
                value=v;
            }

            let final_string="one"+'#'+key+'#'+value.toString();
            let output_message = "Compression complete and file sent for download. " + '\n' + "Compression Ratio : " + (data.length / final_string.length).toPrecision(6);
            return [final_string, output_message];
        }

        //if input file has more than 1 character
        //pushing all characters and their frequency in heap
        for(let [k,v] of mp)
        {
            this.heap.push([v,k]);
        }

        //making huffman tree
        while(this.heap.size()>=2)
        {
            let tempNode1=this.heap.top(); 
            this.heap.pop();
            let tempNode2=this.heap.top();
            this.heap.pop();
            //console.log(tempNode1);
            //console.log(tempNode2);
            let newNode=[(tempNode1[0]+tempNode2[0]),[tempNode1,tempNode2]];
            this.heap.push(newNode);
        }

        var huffmanTree=this.heap.top();
        this.heap.pop();
        this.codes={}; //creating an empty object
        this.getCodes(huffmanTree,"");

        //encoding the data
        let binaryString="";
        for(let i=0;i<data.length;i++)
        {
            binaryString+=this.codes[data[i]];
        }
	console.log(binaryString);
        //console.log(this.codes);

        //using 8 bits to represent every character
        let padding_length=(8-(binaryString.length%8))%8;
        //console.log(padding_length);
        for(let i=0;i<padding_length;i++)
        {
            binaryString+='0';
        }
        //console.log(binaryString);

        //Converting each 8 bits to corresponding character
        let encoded_data="";
        for(let i=0;i<binaryString.length;){
            let curr_num=0;
            for(let j=0;j<8;j++,i++){
                curr_num*=2;
                curr_num+=(binaryString[i]-'0');
                //converting 8 bit string to decimal
            }
            //converting decimal to UTF-8
            encoded_data+=String.fromCharCode(curr_num);
            //console.log(encoded_data);
        }

        //tree_string contains representation of tree in string manner
        let tree_string=this.make_string(huffmanTree);
        //console.log(tree_string);
        let ts_length=tree_string.length;
	
        //Final Compressed String contains:-
        //1.tree_string length
        //2.Padding length
        //3.tree_string
        //4.encoded_string
        let final_string=ts_length.toString()+'#'+padding_length.toString()+'#'+tree_string+encoded_data;
        let output_message="Compression complete and file sent for download. " + '\n' + "Compression Ratio : " + (data.length / final_string.length).toPrecision(6);
        return [final_string, output_message];
        

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

        //empty file
        if(temp==="zero"){
            let decoded_data="";
            let output_message="Decompression complete and file sent for download.";
            return [decoded_data, output_message];
        }

        //only one character in file
        if(temp==="one")
        {
            data=data.slice(k+1);
            k=0;
            temp="";
            while(data[k]!='#')
            {
                temp+=data[k];
                k++;
            }
            let one_char=temp;

            //Extracting the count of that character
            data=data.slice(k+1);
            let strLen=parseInt(data);

            //Making data
            let decodedData="";
            for(let i=0;i<strLen;i++)
            {
                decodedData+=one_char;
            }
            let output_message="Decompression complete and file sent for download.";
            return [decodedData,output_message];
        }

        //if there are more than 1 characters
        //in case of multi-character first thing will be tree string length, so that will be stored in our temp
        let ts_length=parseInt(temp);
        //console.log(ts_length);

        //padding length
        data=data.slice(k+1);
        k=0;
        temp="";
        while(data[k]!='#')
        {
            temp+=data[k];
            k++;
        }
        let padding_length=parseInt(temp);


        //getting tree string
        data=data.slice(k+1);
        temp="";
        for(k=0;k<ts_length;k++)
        {
            temp+=data[k];
        }
        let tree_string=temp;
        //console.log(tree_string);

        //getting encoded data
        data=data.slice(k);
        temp = "";
		for (k = 0; k < data.length; k++) {
            temp += data[k];
		}
		let encoded_data = temp;

        //making huffman tree from string
        this.index=0;
        var huffmanTree=this.make_tree(tree_string);

        //Retrieving binary_string from encoded_data
        let binary_string="";
        for(let i=0;i<encoded_data.length;i++){
            let curr_num=encoded_data.charCodeAt(i);
            let curr_binary="";
            for (let j = 7; j >= 0; j--) {
				let foo = curr_num >> j;
				curr_binary = curr_binary + (foo & 1);
			}
            binary_string+=curr_binary;
        }

        //removing the padded 0's
        binary_string=binary_string.slice(0, binary_string.length-padding_length);

        //final decoding using binary_string and huffman tree
        let decodedData="";
        let node=huffmanTree;
        for(let i=0;i<binary_string.length;i++)
        {
            if(binary_string[i]==='0')
            node=node[0]; //left child
            else
            node=node[1]; //right child

            if(typeof(node[0]) === "string")
            {
                decodedData+=node[0];
                node=huffmanTree;
            }
        }

        let output_message = "Decompression complete and file sent for download.";
		return [decodedData, output_message];

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
