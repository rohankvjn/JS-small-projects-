
//initially when the page is loaded the DOMContentLoaded action is happend on window 
//once the page is loaded we need to display the items
window.addEventListener('DOMContentLoaded', (event) => {
  displayItems();
});

// selecting the form element
let formEle = document.querySelector("#product-add-form");

//adding submit event listener to the formEle
formEle.addEventListener('submit',(event)=>{
  //it prevents default submission of the form
   event.preventDefault();

   //to get the item name and quantity from the form
   let item = document.querySelector('#item').value;
   let qty = Number(document.querySelector('#qty').value);

   //after reading we need to add the items to the localStorage 
   addItemToLocalStorage([item,qty]);

   //after adding to local storage we need to reset the form fields
   document.querySelector("#item").value="";
   document.querySelector("#qty").value="";
});

//function to add items to local storage
let addItemToLocalStorage = (item)=>{

  //reading the data of shopping items from local storage 
  let items = (localStorage.getItem('shopping-items'))?JSON.parse(localStorage.getItem('shopping-items')):[];
  let index = -1;

  //to check the item to be added is already present in the localstorage to avoid duplicates
  for(let i=0;i<items.length;i++){
    if(items[i][0]==item[0]){
      index = i;
      break;
    }
  }

  //if item is not found the simply add the item 
  if(index===-1){
    items.unshift(item);
  }
  else{
    //update the quantity of the item
    items[index][1] = items[index][1] + item[1];
  }  

  //finally pushing the modified items of shopping items to the local storage
  localStorage.setItem('shopping-items',JSON.stringify(items));

  //after adding the items then we need to display them
  displayItems();
}

let displayItems = ()=>{
  //reading the data of shopping items from local storage 
  let shoppingItems = (localStorage.getItem('shopping-items'))?JSON.parse(localStorage.getItem('shopping-items')):[]
  let htmlTemplate = `<ul>`;

  //checking whether there are any items in shopping list
  if(shoppingItems.length>0){

    //making the unordered list of items by assigning unique id to each item  by traversing throught each item
    for(let i=0;i<shoppingItems.length;i++){
        htmlTemplate += `
        <li id=${`list`+i}>
            ${shoppingItems[i][0]}
            <span>${shoppingItems[i][1]}</span>
        </li>`
     
    }
    htmlTemplate += `</ul>`;

    //display the unordered list
    document.querySelector('#shopping-list').innerHTML=htmlTemplate;
  }
  else{
    //if there are no items in shopping list then displaying No items Yet in Shopping List
    document.querySelector('#shopping-list').innerHTML=`<h2>No Items Yet in Shopping List</h2>`;
  }
  
  //reading the data of puchased items from local storage 
  let shoppedItems = (localStorage.getItem('shopped-items'))?JSON.parse(localStorage.getItem('shopped-items')):[];
  htmlTemplate = `<ul>`;

  //checking whether there are any items in purchases list
  if(shoppedItems.length>0){

    //making the unordered list of items by assigning unique id to each item  by traversing throught each item
    for(let i=0;i<shoppedItems.length;i++){
        htmlTemplate += `<li id=${`list`+i}>${shoppedItems[i][0]}
        <span>${shoppedItems[i][1]}</span></li>`
    }
    htmlTemplate += `</ul>`;

    //display the unordered list
    document.querySelector('#shopped-list').innerHTML=htmlTemplate;
  }
  else{
    //if there are no items in purchased list then displaying No items Yet in Purchased List
    document.querySelector('#shopped-list').innerHTML=`<h2>No Items Yet in Purchased List</h2>`;

  }

  //after displaying the shopped list and shopping lists display the counter for purchased and shopping list
  counter();
}


let counter = ()=>{
  
  //selecting the div element with id as counter
  let counterEle = document.querySelector('#counter');

  //reading the shopping items from localstorage
  let shoppingItems = (localStorage.getItem('shopping-items'))?JSON.parse(localStorage.getItem('shopping-items')):[]
  
  //reading the shopped items from localstorage
  let shoppedItems = (localStorage.getItem('shopped-items'))?JSON.parse(localStorage.getItem('shopped-items')):[]
  
  //preparing a html code to display
  let htmlTemplate = `
      <h3>Number of Items Yet to be Purchased: ${shoppingItems.length}</h3>
      <h3>Number of Items Bought : ${shoppedItems.length}</h3>
      `;

  //displaying the html code in div element with id counter
  counterEle.innerHTML = htmlTemplate;

}


//selecting the shopping list Element
let shoppingListEle = document.querySelector('#shopping-list');

//adding a click event listener to shopping list 
//once a click is done on the shopping list the below statement is executed

shoppingListEle.addEventListener('click',(event)=>{

  //event.target gives the list element you clicked on from that we are extracting the unique id assigned
  let strikeoffIndex = Number(event.target.id.substring(4));

  //reading the data of shopping items from local storage 
  let shoppingItems = (localStorage.getItem('shopping-items'))?JSON.parse(localStorage.getItem('shopping-items')):[]
  
  //reading the data of puchased items from local storage 
  let shoppedItems = (localStorage.getItem('shopped-items'))?JSON.parse(localStorage.getItem('shopped-items')):[]


  //the cliked item in shopping list
  let clickedItem = shoppingItems[strikeoffIndex];


  if(clickedItem[1]==1){
      //if the quantity of clicked item is one then delete the item entirely from shopping list
    shoppingItems.splice(strikeoffIndex,1);
  }
  else{
    //if the quantity of clicked item is not one then decrement the quantity of item by 1
    shoppingItems[strikeoffIndex][1] = shoppingItems[strikeoffIndex][1]-1;
  }


  //checking if the item to be added in the shopped list is already present in the shopped list
  let index = -1;
  for(let i=0;i<shoppedItems.length;i++){
    if(shoppedItems[i][0]===clickedItem[0]){
      index = i;
      break;
    }
  }

  
  if(index===-1){
    //if item not present then add the item from shopping list to shopped list with quantiy 1
    shoppedItems.unshift([clickedItem[0],1]);
  }
  else{
    //if item is present then increment the quantiy of item in shopped list by 1
    shoppedItems[index][1] = shoppedItems[index][1] + 1;
  }


  //finally pushing the modified items of shopping items and shopped items to the local storage
  localStorage.setItem('shopping-items',JSON.stringify(shoppingItems));
  localStorage.setItem('shopped-items',JSON.stringify(shoppedItems));

  //the again display the items
  displayItems();
});



//selecting the shopped list Element
let shoppedListEle = document.querySelector('#shopped-list');

//adding a click event listener to shopped list 
//once a click is done on the shopped list the below statement is executed

shoppedListEle.addEventListener('click',(event)=>{

  //event.target gives the list element you clicked on from that we are extracting the unique id assigned


  let strikeoffIndex = Number(event.target.id.substring(4));

  //reading the data of shopping items from local storage 
  let shoppingItems = (localStorage.getItem('shopping-items'))?JSON.parse(localStorage.getItem('shopping-items')):[]

   //reading the data of puchased items from local storage 
  let shoppedItems = (localStorage.getItem('shopped-items'))?JSON.parse(localStorage.getItem('shopped-items')):[]


  //the cliked item in shopped list
  let clickedItem = shoppedItems[strikeoffIndex];

  if(clickedItem[1]==1){
    //if the quantity of clicked item is one then delete the item entirely from shopped list
    shoppedItems.splice(strikeoffIndex,1);
  }
  else{
    //if the quantity of clicked item is not one then decrement the quantity of item by 1
    shoppedItems[strikeoffIndex][1] = shoppedItems[strikeoffIndex][1]-1;
  }

  //checking if the item to be added in the shopping list is already present in the shopping list
  let index = -1;
  for(let i=0;i<shoppingItems.length;i++){
    if(shoppingItems[i][0]==clickedItem[0]){
      index = i;
      break;
    }
  }

  
  if(index===-1){
    //if item not present then add the item from shopped list to shopping list with quantiy 1
    shoppingItems.unshift([clickedItem[0],1]);
  }
  else{
    //if item is present then increment the quantiy of item in shopping list by 1
    shoppingItems[index][1] = shoppingItems[index][1] + 1;
  }

 //finally pushing the modified items of shopping items and shopped items to the local storage
  localStorage.setItem('shopping-items',JSON.stringify(shoppingItems));
  localStorage.setItem('shopped-items',JSON.stringify(shoppedItems));

  //the again display the items
  displayItems();
});


