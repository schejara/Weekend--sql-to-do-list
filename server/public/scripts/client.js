console.log('JS is sourced!');

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
    event.preventDeafult();
let todos = {};
todos.toDoText = document.getElementById('').value

}


function renderToDom(todos){
    let addItem = document.getElementById("addItem");
    addItem.innerHTML = ''
    for(let property of todos){

        addItem.innerHTML += 
        `
        <tr>
        <td>${property.text}</td>,        
        <td>${property.isComplete}</td>
        </tr>
        `      
    }
}

    



getList();