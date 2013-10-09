$(function() {
  // resizable panels

  // main panel init
  var container = $('#outer-container').layout({
  	west: {
  		resizable : false,
  		initClosed : true
  	},
  	east: {
  		resizable : false,
  		initClosed : true
  	}
  });

  // set default widths for left and right panels - 340px
  container.sizePane("west", 340);
  container.sizePane("east", 340);

  // middle container init
  var middle = $('#middle-container').layout();
  var halfOfMiddleHeight = ($('#middle-container').height() / 2);
  middle.sizePane("north", halfOfMiddleHeight);

  // 4 up view init
  var top = $('#top-container').layout();
  var bottom = $('#bottom-container').layout();
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
  		} else if (draggableIdParentClassName.hasClass('right-drop')) {
  			$('.ui-layout-east').css({"z-index":"100"});
  			$('.ui-layout-west').css({"z-index":"99"});
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