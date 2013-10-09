$(function() {
  // resizable panels

  // main panel init
  var container = $('#outer-container').layout({
  	west: {
  		resizable : false,
  		initClosed : true,
  		size: 340
  	},
  	east: {
  		resizable : false,
  		initClosed : true,
  		size: 340
  	}
  });
  // middle container init
  var middle = $('#middle-container').layout({
  	north: {
  		size: "50%"
  	}
  });
  // 4 up view init
  var top = $('#top-container').layout({
  	east: {
  		size: "50%"
  	}
  });
  var bottom = $('#bottom-container').layout({
  	east: {
  		size: "50%"
  	}
  });

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