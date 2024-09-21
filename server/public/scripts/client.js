console.log('JS is sourced!');

function getList(){
    console.log( 'in getList' );
    axios({
      method: 'GET',
      url: '/todos'
    }).then(function(response) {
      console.log('getList() response', response.data);
      //renderKoalas(response.data);
    }).catch(function(error){
      console.log('error in GET', error);
    });
}
getList();