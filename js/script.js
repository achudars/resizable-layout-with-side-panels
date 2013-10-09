$(function() {
  // resizable panels
  var container = $('#outer-container').layout();
  var middle = $('#middle-container').layout();
  var top = $('#top-container').layout();
  var bottom = $('#bottom-container').layout();

  var halfOfMiddleHeight = ($('#middle-container').height() / 2);
  

  container.sizePane("west", 340);
  container.sizePane("east", 340);


  middle.sizePane("north", halfOfMiddleHeight);
  
  var halfOfTopWidth = ($('#top-container').width() / 2);

  top.sizePane("east", halfOfTopWidth);
  bottom.sizePane("east", halfOfTopWidth);


  // tabs

  var tabs = $( ".tabs" ).tabs();

  tabs.find(".ui-tabs-nav li").draggable({
  	handle: "a",
  	stack: "div",
  	opacity: 0.35, 
  	revert: true,
  	cursor:	'move'
  });


tabs.find(".ui-tabs-nav").droppable({
  	drop: function( event, ui ) {
        var draggableId = ui.draggable.attr("id");
        $(this).append(ui.draggable);
        tabs.tabs( "refresh" );
      }
  });



});