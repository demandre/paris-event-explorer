'use strict';

/* Create a HTML list */
var htmlGenerator = function (event) {

  // Create a div
  var el = document.createElement('div'); 
  el.className ='list-group';
  
  //Create a balise HTML & append child to div
  var a = document.createElement('a');
  a.className = 'list-group-item list-group-item-action flex-column align-items-start';
  a.setAttribute('data-toggle', 'modal');
  a.setAttribute('data-target', '#'+event.id);
  el.appendChild(a);

  // Create second div & add to element a
  var div = document.createElement('div');
  div.className ='d-flex w-100 justify-content-between';
  a.appendChild(div);

  //Create title 
  var titleModal = document.createElement('h5');
  titleModal.className = 'mb-1';
  titleModal.id = 'title-list';
  titleModal.setAttribute('data-toggle', 'modal');
  titleModal.setAttribute('data-target', '#'+event.id);
  titleModal.innerHTML = event.title;
  div.appendChild(titleModal);

  // Create description
  var descriptionModal = document.createElement('p');
  descriptionModal.className = 'mb-1';
  descriptionModal.id = 'description-list';
  descriptionModal.setAttribute('data-toggle', 'modal');
  descriptionModal.setAttribute('data-target', '#'+event.id);
  descriptionModal.innerHTML = event.description;
  a.appendChild(descriptionModal);

  //Put an adress 
  var small = document.createElement('small'); 
  small.setAttribute('data-toggle', 'modal');
  small.setAttribute('data-target', '#'+event.id);
  small.innerHTML = event.adress;
  a.appendChild(small);

  document.body.appendChild(el);
}

var event = new Object();
event.title = "MON TITRE";
event.description = "Lorem ipsum inno textum varum lao kinzun";
event.adress = '13 Rue de cambré 75019 PARIS';
event.id = 'info-modal';
event.price = '3737e';
event.link = 'http://www.google.fr/';



htmlGenerator(event);
modalGenerator(event);



function eventsList(events) {
    events.forEach(function(event){
    htmlGenerator(event); 
  }) 
}
/* Create a Modal for list of event*/
function modalGenerator(event) {

  var el ='';

  el += '<div class="modal fade" id="'+event.id+'" tabindex="-1" role="dialog" aria-labelledby="infoModalLabel" aria-hidden="true">';
  el +=   '<div class="modal-dialog" role="document">';
  el +=     '<div class="modal-content">';
  el +=       '<div class="modal-header">';
  el +=              '<h2 class="modal-title" id="title-modal">'+event.title+'</h2>';
  el +=               '<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>';
  el +=       '</div>';
  //Description
  el +=       '<div class="modal-body">';
  el +=         '<h3> Description </h3>';
  el +=         '<p id="modal-description">'+event.description+'</p>';
  el +=       '</div>';
  //Price
  el +=       '<div class="modal-body">';
  el +=         '<h3> Price </h3>';
  el +=         '<p id="modal-price">'+event.price+'</p>';
  el +=       '</div>';
  //Adress
  el +=       '<div class="modal-body">';
  el +=         '<h3> Adress </h3>';
  el +=         '<p id="modal-adress">'+event.adress+'</p>';
  el +=       '</div>';

  el +=       '<div class="modal-footer">';
  el +=         '<button type="button"class="btn btn-primary">';
  el +=         '<a href="'+event.link+'" style="color:white;"> Commander </a>';
  el +=         '</button>';
  el +=         '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
  el +=       '</div>';
  
  el +=     '</div>';
  el +=   '</div>';
  el += '</div>';

  var getDiv = document.getElementById('divModalGenerator');
  getDiv.innerHTML = el;

}

