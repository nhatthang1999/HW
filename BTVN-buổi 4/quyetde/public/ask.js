// document.querySelector('textarea').addEventListener("input",()=>{
//     const inputLength= document.querySelector('textarea').value.length;
//     const remainElement=document.querySelector('remain');
//     const remain=200-inputLength;
//     console.log(remain);
//     if (remain<=0)
//     {
//         document.querySelector('textarea').value=document.querySelector('textarea').value.slice(0,200);
//         document.getElementById('remain').innerText=0;
//     }
//     else 
//     document.getElementById('remain').innerText=remain;

// })

const textInput=document.querySelector('textarea');
const remainElement=document.getElementById('remain');

textInput.addEventListener("input",()=>{
    const inputLength=textInput.value.length;
    const remain=200-inputLength;
    remainElement.innerText=remain;
})