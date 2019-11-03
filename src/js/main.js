import { Movie } from '../../src/js/movie.js';
import { XHttp } from '../../src/js/xhttp.js';

(function(){

    // ====================================
    // Not a good way, to store API keys
    // ====================================
    let key = '2f9cd3f8';
    let baseUrl = 'http://www.omdbapi.com/?apikey=' + key + '&';


    // ====================================
    // Event Listeners
    // ====================================
    let inputTitle = document.getElementById("inputTitle");
    inputTitle.addEventListener('keypress', function(e) {
        if (e.keyCode == 13) {
            searchByTitle(inputTitle.value);
        }
    });

    let buttonSearch = document.getElementById("search");
    buttonSearch.addEventListener('click', function(e) {
            searchByTitle(inputTitle.value);
    });


    // ====================================
    // GET Request and CallBack
    // ====================================
    function searchByTitle(title) {
        if (document.contains(document.getElementById("resultDiv"))) {
            document.getElementById("resultDiv").remove();
        }

        // Check, if data allready exists in localStorage, 
        // then read from localStorage, else GET request
        if (localStorage.getItem(title)) {
            console.log("Reading Data from localStorage: ");
            return createResultDiv(title, JSON.parse(localStorage.getItem(title)));
        }

        let xHttp = new XHttp(baseUrl, "s=", title);
        xHttp.toString();
        return xHttp.getRequest(createResultDiv);
    }

    function createResultDiv(title, responseText) {
        
        console.log("SearchedTitle: " + title);
        
        if (localStorage.getItem(title) === null) {
            console.log("Adding Movie " + title + " to localStorage!");
            localStorage.setItem(title, JSON.stringify(responseText));
        }
        
        let mainDiv = document.getElementById("main-div");

        mainDiv.appendChild(document.createElement("div")).setAttribute("id", "resultDiv");
        let resultDiv = document.getElementById("resultDiv");
        resultDiv.setAttribute("class", "border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg");
        
        let movieArray = responseText["Search"];
        for(var i in movieArray) {
        
            let movie = new Movie(movieArray[i]["Title"], movieArray[i]["Year"], movieArray[i]["imdbID"], movieArray[i]["Type"], movieArray[i]["Poster"]);
            movie.generateHTML(resultDiv);
        }
    }

})();