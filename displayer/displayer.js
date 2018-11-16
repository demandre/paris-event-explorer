'use strict'
/*
  * allow to list event in html
  * events = tableau of event
  */
function eventsList(events) {
    events.forEach(function(event){
    htmlGenerator(event); 
  }) 
}