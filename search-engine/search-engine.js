'use strict'

/**
 * Class Event: A Parisian event class
 * @params {Number} id, {String} title, {String} description, {String} place, {String} startDate, {String} endDate, 
 *        {String} link, {String} period, {String} address, {String} city, {String} departement, {String} price   
 */ 
var Event = function Event(id, title="", description="", place="", startDate="", endDate="", link="", period="", address="", city="", departement="", price="") {
  this.id = id;
  this.title = title;
  this.description = description;
  this.place = place;
  this.startDate = startDate;
  this.endDate = endDate;
  this.link = link;
  this.period = period;
  this.address = address;
  this.city = city;
  this.departement = departement;
  this.price = price;
}

/**
 *  Class SearchEngine: A class to manage API request with a search bar.  
 */
var SearchEngine = function SearchEngine () {
  this.eventRepository = [];
}

/**
 * This function add two event listener click and keypress to the searchbar.
 */
SearchEngine.prototype.init = function () {
  var elClick = document.querySelector('#searchButton');
  var elSearchBar = document.querySelector('#searchBar');

  elClick.addEventListener('click', function() {
    this.checkSearch(elSearchBar.value);
  }.bind(this))

  elSearchBar.addEventListener('keypress', function(e) {
    var key = e.which || e.keyCode;

    if (key === 13) {
      this.checkSearch(elSearchBar.value);
    } 
  }.bind(this))
}

/**
 * This function check search format to launch it.
 * @params {String} search.
 */
SearchEngine.prototype.checkSearch = function (search) {
  var regexSearch = /[a-zA-Z-0-9-\/]+/;

  if (regexSearch.test(search)) {
    this.doODPAPIRequest(search);
  }

  if (!regexSearch.test(search)) {
    console.log("Le format de recherche est incorrect! Seul les nombres, les lettres, '/' et '-' sont autorisés");
  }
}

/**
  * Request OpenDataParis API with params given and return API response
  * @params {String} requestParam
  */
SearchEngine.prototype.doODPAPIRequest = function (requestParam) {
  var xhttp = new XMLHttpRequest();
  var request = "https://opendata.paris.fr/api/records/1.0/search/?dataset=evenements-a-paris&q="+requestParam+"&rows=20";
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
          searchEngine.jsonToEvents(this.responseText);
    }
  };
  xhttp.open("GET", request, true);
  xhttp.send();
}

/**
 * Allows you to tranform json to Event objects
 * @params {String} json
 */
SearchEngine.prototype.jsonToEvents = function(json) {
  var ourData = JSON.parse(json);
  this.eventRepository = [];
  ourData.records.forEach(function(el,id) {
      this.eventRepository.push(
        new Event(
        id,
        el.fields.title,
        el.fields.description,
        el.fields.placename,
        el.fields.date_start,
        el.fields.date_end,
        el.fields.link,
        el.fields.period,
        el.fields.address,
        el.fields.city,
        el.fields.departement,
        el.fields.price
        )
      );
  }.bind(this));
}

var searchEngine = new SearchEngine();

searchEngine.init();
