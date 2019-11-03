export class Movie {

    constructor(title, year, imdbID, type, poster) {
        this.title = title;
        this.year = year;
        this.imdbID = imdbID;
        this.type = type;
        this.poster = poster;
    }
    
    getTitle() {
        return this.title;
    }

    getYear() {
        return this.year;
    }

    getImdbID() {
        return this.imdbID;
    }

    getType() {
        return this.type;
    }

    getPoster() {
        return this.poster;
    }

    getTitleYearType() {
        return this.getTitle() + " (" + this.getYear() + ") (" + this.getType() + ")";
    }

    generateHTML(resultDiv) {

        // Image
        resultDiv.appendChild(document.createElement("img")).setAttribute("id", "resultImage" + this.imdbID);
        let resultImage = document.getElementById("resultImage" + this.imdbID);
        resultImage.setAttribute("class", "inline-block mb-2");
        resultImage.setAttribute("height", "50");
        resultImage.setAttribute("width", "50");
        resultImage.setAttribute("src", this.poster);

        // Title (Year) (Type)
        resultDiv.appendChild(document.createElement("h")).setAttribute("id", "resultTitle" + this.imdbID);
        let resultTitle = document.getElementById("resultTitle" + this.imdbID);
        resultTitle.setAttribute("class", "inline-block font-sans mb-2 hover:bg-teal-200 text-gray text-md text-center");
        resultTitle.textContent = this.getTitleYearType();

        // New line
        resultDiv.appendChild(document.createElement("br"));
    }
}