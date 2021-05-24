console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    getJokes();
}

// this is where we will get the list of jokes
function getJokes(){
    console.log('in getJokes function');
    $.ajax({
        method: 'GET',
        url: '/list'
    }).then(function(response){
        // call a separate function to display the jokes to the DOM
        displayJokes(response);
    }).catch(function(error){
        alert('error in getJokes function');
    });
}

function displayJokes(array){
    console.log('in displayJokes function');
    // empty the jokes section of the DOM
    $( '#jokeOutput' ).empty();
    //loop through our joke array and append to the DOM
    for (let jokes of array){
        $( '#jokeOutput' ).append(`
        <li>${jokes.jokeQuestion}   ${jokes.punchLine}   ${jokes.whoseJoke}</li>`)
    }
}
