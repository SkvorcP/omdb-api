export class XHttp {

    constructor(url, getParam, searchedTitle) {
        this.url = url;
        this.getParam = getParam;
        this.searchedTitle = searchedTitle;
    }
    
    getSearchedTitle() {
        return this.searchedTitle;
    }

    toString() {
        console.log("URL: " + this.url + " GET PARAM: " + this.getParam + this.searchedTitle);    
    }

    getRequest(successCallback) {
        console.log("Request to OMDb!");

        let title = this.getSearchedTitle();
        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if(this.status === 200) {
                    return successCallback(
                        title, JSON.parse(xhttp.responseText)
                    );
                } else {
                    console.log("Ooops, there was an error...");
                }
            }
        };
        
        xhttp.open("GET", this.url + this.getParam + this.searchedTitle, true);
        xhttp.send();
    }
}