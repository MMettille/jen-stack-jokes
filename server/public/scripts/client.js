console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    getJokes();
    // handle buttons
    $( '#addJokeButton' ).on('click', addAJoke);
}

// this is where we will get the joke from the user
function addAJoke(){
    console.log('in addAJoke function');
    // create an object with the things
    let userInputs = {
        name: $( '#whoseJokeIn' ).val(),
        joke: $( '#questionIn' ).val(),
        punchLine: $( '#punchlineIn' ).val()
    }
    // post request to send the users input to the server
    $.ajax({
        method: 'POST',
        url: '/new',
        data: userInputs
    }).then(function(response){
        // calling the function getJokes to append to the DOM
        getJokes();
    }).catch(function(error){
        alert('error in addAJoke function')
    })

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
        <li><strong>Joke: </strong>${jokes.jokeQuestion} <strong>Punch Line: </strong> ${jokes.punchLine} <strong>Told By: </strong> ${jokes.whoseJoke}</li>`)
    }
}
