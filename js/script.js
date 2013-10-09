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
  	cursor:	'move',
  	start: function( event, ui) {
  		var draggableIdParentClassName = $(this).parent();
  		if(draggableIdParentClassName.hasClass('left-drop')) {
  			$('.ui-layout-west').css({"z-index":"100"});
  			$('.ui-layout-east').css({"z-index":"99"});
  			console.log("WEST z-index: " + $('.ui-layout-west').css("z-index"));
  			console.log("EAST z-index: " + $('.ui-layout-east').css("z-index"));
  		} else if (draggableIdParentClassName.hasClass('right-drop')) {
  			$('.ui-layout-east').css({"z-index":"100"});
  			$('.ui-layout-west').css({"z-index":"99"});
  			console.log("WEST z-index: " + $('.ui-layout-west').css("z-index"));
  			console.log("EAST z-index: " + $('.ui-layout-east').css("z-index"));
  		}
  		
  	},
  	stop: function( event, ui) {
  		var draggableIdParentClassName = $(this).parent();
  		if(draggableIdParentClassName.hasClass('left-drop')) {
  			$('.ui-layout-west').css({"z-index":"100"});
  			$('.ui-layout-east').css({"z-index":"99"});
  			console.log("FROM LEFT. LEFT SHOULD BE ON TOP");
  			console.log("WEST z-index: " + $('.ui-layout-west').css("z-index"));
  			console.log("EAST z-index: " + $('.ui-layout-east').css("z-index"));
  		} else if (draggableIdParentClassName.hasClass('right-drop')) {
  			$('.ui-layout-east').css({"z-index":"100"});
  			$('.ui-layout-west').css({"z-index":"99"});
  			console.log("FROM RIGHT. RIGHT SHOULD BE ON TOP");
  			console.log("WEST z-index: " + $('.ui-layout-west').css("z-index"));
  			console.log("EAST z-index: " + $('.ui-layout-east').css("z-index"));
  		}
  		
  	}
  });


tabs.find(".ui-tabs-nav").droppable({
  	drop: function( event, ui ) {
        var draggableId = ui.draggable.attr("id");
        $(this).append(ui.draggable);
        tabs.tabs( "refresh" );
      }
  });



});