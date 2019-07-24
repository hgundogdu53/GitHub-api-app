'use strict'

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    for (let i = 0; i < responseJson.length; i++) {
        $('#results-list').append(
            `<li><h3>${responseJson[i].name}</h3>
         <a href="${responseJson[i].html_url}">REPO URL LINK</a>
         </li>`)
    };
    $('#results').removeClass('hidden');
};

function wordInput() {
    const userInput = $('#user-input').val();
    return userInput;
}

function getApi() {

    const url = 'https://api.github.com/users/' + wordInput() + '/repos';
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(error => {
            $('#js-error-message').text(`Something went wrong: ${error.message}`);
        });

}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const userInput = $('#user-input').val();
        getApi(userInput);
    });
}

$(watchForm);