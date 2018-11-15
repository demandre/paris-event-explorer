'use strict'

/**
 * Class Event: A Parisian event class
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
  
}

/**
 * This function add two event listener click and keypress to the searchbar.
 */
SearchEngine.prototype.init = function () {
  var elClick = document.querySelector('#searchButton');
  var elSearchBar = document.querySelector('#searchBar');

  elClick.addEventListener('click', function() {
    checkSearch(elSearchBar.value);
  })

  elSearchBar.addEventListener('keypress', function(e) {
    var key = e.which || e.keyCode;

    if (key === 13) {
      checkSearch(elSearchBar.value);
    } 
  })
}

/**
 * This function check search format to launch it.
 * 0params {String} search.
 */
SearchEngine.prototype.checkSearch = function (search) {
  var regexSearch = /[a-zA-Z-0-9-\/]+/;

  if (regexSearch.test(search)) {
    this.jsonToEvents(this.doODPAPIRequest(search));
  }

  if (!regexSearch.test(search)) {
    document.getElementById('search-info').innerHTML = "Le format de recherche est incorrect! Seul les nombres, les lettres, '/' et '-' sont autorisés";
  }
}

/**
  * Request OpenDataParis API with params given and return API response
  * @params {String} requestParam
  * @return String or Boolean
  */
SearchEngine.prototype.doODPAPIRequest = function (requestParam) {
  var xhttp = new XMLHttpRequest();
  var request = "https://opendata.paris.fr/api/records/1.0/search/?dataset=evenements-a-paris&q="+requestParam+"&rows=20&refine.tags=Paris";
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      jsonToEvents(this.responseText);
      return this.responseText;
    }
    return false;
  };
  xhttp.open("GET", request, true);
  xhttp.send();
}

/**
 * Allows you to tranform json to Event objects
 * @params {String} json
 */
function jsonToEvents(json) {
  console.log(json);
}


SearchEngine.prototype.init();