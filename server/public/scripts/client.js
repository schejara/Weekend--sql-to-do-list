console.log('JS is sourced!');
getList();


function getList(){
    console.log( 'in getList' );
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
        getList();
      }).catch(function(error) {
        console.log('Error in POST', error)
        alert('Unable to add item at this time. Please try again later.');
      });
  
    }
  


function renderToDom(todos){
    let addItem = document.getElementById("addItem");
    addItem.innerHTML = ''
    for(let property of todos){

        addItem.innerHTML += 
        `
        <tr data-testid="toDoTextInput" >
        <td >${property.text}</td>        
        <td>${property.isComplete}</td>
        <td>
        <button data-testid="toDoTextInput" onClick="deleteItem(${property.id})">Delete</button>
        </td>
        </tr>
        `      
    };
   
}

function deleteItem(todosId) {
    console.log('Deleting item with ID:', todosId);
    axios.delete(`/todos/${todosId}`).then((response) => {
      getList()
    }).catch((error) => {
        console.log('Error', error);
        alert('Something went wrong');
    });
  }



