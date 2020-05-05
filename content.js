const data = {
    work_exp: [
        {place: 'FoodTracks', subject: 'Data Scientist',
            time: 'Jan. 2018 - today'},
        {place: 'TechLabs', subject: 'LX Designer', time: 'Sep. 2018 - today'},
        {place: 'WWU Münster - Nonlinear Photonics',
            subject: 'Research Assistant', time: 'Dec. 2017 - Mar. 2018'},
        {place: 'Wesemann & Partner GbR',
            subject: 'Internship Frontend Developer',
            time: 'May 2016 - Oct. 2016'},
        {place: 'WWU Münster', subject: 'Student Assistant - Research',
            time: 'Oct. 2014 - Mar. 2015'},
        {place: 'WWU Münster', subject: 'Student Assistant - Teaching',
            time: 'Oct. 2013 - Mar. 2014'}],
    edu: [
        {place: "WWU Münster", subject: "Master of Science - Physics",
            time: "2014 - 2017"},
        {place: "IASBS Zanjan",
            subject: "IASBS-ICTP Workshop on Structured Light and Matter",
            time: "2016"},
        {place: "Universidad de Sevilla",
            subject: "Master of Science - Physics",
            time: "2015 - 2016"},
        {place: "WWU Münster", subject: "Bachelor of Science - Physics",
            time: "2011 - 2014"}],
    project: [
        {place: "Own Website",
            subject: "CSS, HTML, Bulma, JavaScript",
            time: "2019/20",
            link: "https://github.com/kemaltekce/kemaltekce.github.io"},
        {place: "TechLabs Titanic Notebook",
            subject: "LX Design, Data Science",
            time: "2019"},
        {place: "TechLabs Bike Sharing Forecast Notebook",
            subject: "LX Design, Data Science",
            time: "2019/20",
            link:"https://github.com/kemaltekce/tl_learning_notebook_bikesharing"},
        {place: "Forwardtesting Time Series cross-validator",
            subject: "Numpy, Pandas, Sklearn",
            time: "2020",
            link: "https://github.com/kemaltekce/sklearn_forward_time_series_split"},
        {place: "Forcast visualization",
            subject: "D3.js",
            time: "2020",
            link: "/pages/forecast-viz/index.html"},
        {place: "Covid19 visualization",
            subject: "D3.js",
            time: "2020",
            link: "/pages/covid-viz/index.html"}]
}

function generate_content(data){
    for (const [id, items] of Object.entries(data)) {
        for (const {place, time, subject, link} of items) {
            let section = document.getElementById(id);
            let mainDiv = document.createElement("div");
            let firstSubDiv = document.createElement("div");
            let secondSubDiv = document.createElement("div");
            let placeElement;
            let subjectElement = document.createElement("p");
            let timeElement = document.createElement("p");

            mainDiv.className = "columns is-mobile box-shadow-bottom";
            firstSubDiv.className = "column";
            secondSubDiv.className = "column";
            if (link) {
                placeElement = document.createElement("a");
                placeElement.href = link;
                placeElement.className = "has-text-weight-bold chunky_underline"
                placeElement.id = "white"
            } else {
                placeElement = document.createElement("p");
                placeElement.className = "text-orange has-text-weight-bold";
            }

            placeElement.appendChild(document.createTextNode(place));
            subjectElement.appendChild(document.createTextNode(subject));
            timeElement.appendChild(document.createTextNode(time));

            firstSubDiv.appendChild(placeElement);
            firstSubDiv.appendChild(subjectElement);
            secondSubDiv.appendChild(timeElement);

            mainDiv.appendChild(firstSubDiv);
            mainDiv.appendChild(secondSubDiv);

            section.appendChild(mainDiv);
        }
        let section = document.getElementById(id);
        let mainDiv = document.createElement("div");
        let firstSubDiv = document.createElement("div");
        let secondSubDiv = document.createElement("div");
        let placeElement = document.createElement("p");
        let timeElement = document.createElement("p");

        firstSubDiv.appendChild(placeElement);
        secondSubDiv.appendChild(timeElement);

        mainDiv.appendChild(firstSubDiv);
        mainDiv.appendChild(secondSubDiv);

        section.appendChild(mainDiv);
    }
}
generate_content(data)
