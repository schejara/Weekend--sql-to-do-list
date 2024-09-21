console.log('JS is sourced!');
getToDoList();


function getToDoList(){
    console.log( 'in getToDoList' );
    axios({
      method: 'GET',
      url: '/todos'
    }).then(function(response) {
      console.log('getList() response', response.data);
      renderToDom(response.data);
    }).catch(function(error){
      console.log('error in GET', error);
    });
    
}

function saveList(event){
    event.preventDefault();
 let todos = {};
todos.text = document.getElementById('toDoText').value
todos.isComplete = document.getElementById('isComplete').value
addItem(todos);

}

function addItem(itemToAdd) {
    axios({
      method: 'POST',
      url: '/todos',
      data:itemToAdd ,
      }).then(function(response) {
        console.log('addItem()', response.data);
        getToDoList();
      }).catch(function(error) {
        console.log('Error in POST', error)
        alert('Unable to add item at this time. Please try again later.');
      });
  
    }
  


function renderToDom(todos){
    let addItem = document.getElementById("addItem");
    addItem.innerHTML = '';
    for(let property of todos){

        addItem.innerHTML += 
        `
        <tr data-testid="toDoItem" >
        <td >${property.text}</td>        
        <td>${property.isComplete ? 'true' : 'false'}</td>
        
        <td>
        <button data-testid="deleteButton" onClick="deleteItem(${property.id})">Delete</button>

        </td>
        <td>
          ${property.isComplete 
            ? '' 
            : `<button data-testid="completeButton" onClick="complete(${property.id})">Complete</button>`}
           
        </td>
        </tr>
        `      
    };
   
}
function complete(todosId) { 
    let data = {isComplete: false};
    axios.put(`/todos/${todosId}`, data).then(response => {
      getToDoList()
    }).catch((error) => {
        console.log('Error', error);
        alert('Something went wrong');
    });
    
  }

function deleteItem(todosId) {
    console.log('Deleting item with ID:', todosId);
    axios.delete(`/todos/${todosId}`).then((response) => {
      getToDoList()
     
    }).catch((error) => {
        console.log('Error', error);
        alert('Something went wrong');
    });
  }





