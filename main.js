//get total
//creat product
//save localstorage
//clear inputs
//read
//count
//delete
//update
//searche
//clean date


//we start with inputs first
let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let Total =document.getElementById('Total');
let count =document.getElementById('count');
let category =document.getElementById('category');
let submit =document.getElementById('submit');
let mood ='create';
//global  variable
let tmp;
// test if we write all of id correct
//console.log(title,price,taxes,ads,discount,Total,count,category,submit);
//nice its work 

//now first function of the total and we dont forget first (onkayup)
function getTotal()
{

if (price.value !=''){
   let result = (+price.value+ +taxes.value+ +ads.value)
    - +discount.value;
    Total.innerHTML= result;
    Total.style.background='#040'
}else{
   Total.innerHTML='';
   Total.style.background='#ae0d15';
}

}





//to make ligne 62 work correctly
let dataPro;
if(localStorage.product !=null){
   dataPro=JSON.parse(localStorage.product)
}else{
   dataPro=[];
}



//creat product
//let dataPro=[];

submit.onclick=function(){
   //creat object
   let newPro={
      title:title.value.toLowerCase(),
      price:price.value,
      taxes:taxes.value,
      ads:ads.value,
      discount:discount.value,
      Total:Total.innerHTML,
      count:count.value,
      category:category.value.toLowerCase(),

   }
      //clean data
      if (title.value !=''
          && price.value!='' 
          && category.value!=''
         && newPro.count<100){
   if(mood==='create'){
      //creat loop for acount
      if (newPro.count>1){
         for(let i=0;i<newPro.count;i++){
            dataPro.push(newPro);
         }
      }else{
         dataPro.push(newPro);
      }

      }else{
      dataPro[ tmp]=newPro;
      mood='create';
      submit.innerHTML='create';
      count.style.display='block';
      }
         clearData()
      }

   
   //but first we need to storage the object on a array So that the old does not go
   //dataPro.push(newPro);

   //(save localstorage)storage the data in a localStorage To ensure the data isn't lost when we reload the page. 
   localStorage.setItem('product',JSON.stringify(dataPro));
   console.log(dataPro)


   showData()
}
//clear inputs
function clearData(){
 title.value='';
 price.value='';
 taxes.value='';
 ads.value='';
 discount.value='';
 Total.value='';
 count.value='';
 category.value='';

}
//read function
function showData(){
   getTotal()
   //we have array dataPro so we have to add loop in the table
   let table='';
   for (let i=0; i< dataPro.length;i++){
      //table=dataPro[i];
      //the plus + is so importent here
      table += `
      
      <tr> 
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].Total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})"  id="delete">delete</button></td>
      </tr>
      `
      

   }
   document.getElementById('tbody').innerHTML=table;
   //if there is data put button deleteall
   let btnDelete=document.getElementById('deleteAll');
   if (dataPro.length>0){
      btnDelete.innerHTML=`
      <button onclick="deleteAll()">delete All(${dataPro.length})</button>  
      `
   }else{
      btnDelete.innerHTML='';
   }
}
showData()

//function delete
function deleteData(i){
   dataPro.splice(i,1);
   localStorage.product=JSON.stringify(dataPro);
   showData()//it is related with html and the interface
 
}

//delete data from locallstorage and array
function deleteAll(){
   localStorage.clear()
   dataPro.splice(0)
   showData()
}

//function update
function updateData(i){
   title.value=dataPro[i].title;
   price.value=dataPro[i].price;
   taxes.value=dataPro[i].taxes;
   ads.value=dataPro[i].ads;
   discount.value=dataPro[i].discount;
   getTotal()
   count.style.display='none'
   category.value=dataPro[i].category;
   submit.innerHTML='update'
   mood='update';
   tmp=i;

   scroll({
      top:0,
      behavior:'smooth',
   })
}

//function search
let searchMood='title';

function getSearchMood(id)
{
   let search=document.getElementById('search');
   if(id == 'searchtitle'){
      searchMood='title';
     // search.ariaPlaceholder='search by Title';

   }else{
      searchMood= 'category';
     // search.ariaPlaceholder='search by Category';

   }
   //search.placeholder='search By'+searchMood;
   search.setAttribute('placeholder', 'Search By ' + searchMood);
      search.focus()
      search.value='';
      showData();
}

function searchData(value){
   let table='';
   if (searchMood == 'title')
   {

      for (let i=0; i<dataPro.length;i++){
         if (dataPro[i].title.includes(value.toLowerCase())){
         table += `
      
      <tr> 
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].Total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})"  id="delete">delete</button></td>
      </tr>
      `
         }
      }
   }else{
      for (let i=0; i<dataPro.length;i++){
         if (dataPro[i].category.includes(value.toLowerCase())){
         table += `
      
      <tr> 
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].Total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})"  id="delete">delete</button></td>
      </tr>
      `
         }
      }
   }
   document.getElementById('tbody').innerHTML=table;
}
