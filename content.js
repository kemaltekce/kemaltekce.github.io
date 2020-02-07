let data = {
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
            time: "2019/20"},]
}
let ids = ["work_exp", "edu", "project"];

for (let j = 0; j < ids.length; j++) {
    let data_ = data[ids[j]]
    for (let i = 0; i < data_.length; i++) {
        let section = document.getElementById(ids[j]);
        let mainDiv = document.createElement("div");
        let firstSubDiv = document.createElement("div");
        let secondSubDiv = document.createElement("div");
        let place;
        let subject = document.createElement("p");
        let time = document.createElement("p");

        mainDiv.className = "columns is-mobile box-shadow-bottom";
        firstSubDiv.className = "column";
        secondSubDiv.className = "column";
        if (data_[i].hasOwnProperty("link")) {
            place = document.createElement("a");
            place.href = data_[i].link;
            place.className = "has-text-weight-bold chunky_underline"
            place.id = "white"
        } else {
            place = document.createElement("p");
            place.className = "text-orange has-text-weight-bold";
        }

        place.appendChild(document.createTextNode(data_[i].place));
        subject.appendChild(document.createTextNode(data_[i].subject));
        time.appendChild(document.createTextNode(data_[i].time));

        firstSubDiv.appendChild(place);
        firstSubDiv.appendChild(subject);
        secondSubDiv.appendChild(time);

        mainDiv.appendChild(firstSubDiv);
        mainDiv.appendChild(secondSubDiv);

        section.appendChild(mainDiv);
    }

    let section = document.getElementById(ids[j]);
    let mainDiv = document.createElement("div");
    let firstSubDiv = document.createElement("div");
    let secondSubDiv = document.createElement("div");
    let place = document.createElement("p");
    let time = document.createElement("p");

    firstSubDiv.appendChild(place);
    secondSubDiv.appendChild(time);

    mainDiv.appendChild(firstSubDiv);
    mainDiv.appendChild(secondSubDiv);

    section.appendChild(mainDiv);
}