$(function() {
  // resizable panels

  // main panel init
  var container = $('#outer-container').layout({
  	west: {
  		resizable : false,
  		initClosed : false,
  		size: 350
  	},
  	east: {
  		resizable : false,
  		initClosed : false,
  		size: 350
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

  tabs.find( ".ui-tabs-nav" ).sortable({
      axis: "x",
      stop: function() {
        tabs.tabs( "refresh" );
      }
  });
  tabs.find(".ui-tabs-nav li").draggable({
  	handle: "a",
  	stack: "div",
  	opacity: 0.35, 
  	start: function( event, ui ) {
  		tabs.find(".ui-tabs-nav li").draggable({ revert: true });
  		var draggableIdParentClassName = $(this).parent();
  		if(draggableIdParentClassName.hasClass('left-drop')) {
  			$('.ui-layout-west').css({"z-index":"100"});
  			$('.ui-layout-east').css({"z-index":"99"});
  		} else if (draggableIdParentClassName.hasClass('right-drop')) {
  			$('.ui-layout-east').css({"z-index":"100"});
  			$('.ui-layout-west').css({"z-index":"99"});
  		}
  	},
  	drag: function ( event, ui ) {
  		tabs.tabs( "refresh" );
  		tabs.find(".ui-tabs-nav li").draggable({ revert: false });
  	},
  	stop: function ( event, ui ) {
  		tabs.tabs( "refresh" );
  		tabs.find(".ui-tabs-nav li").draggable({ revert: true });
  	}
  });



tabs.find(".ui-tabs-nav").droppable({
  	drop: function( event, ui ) {
        var draggableId = ui.draggable.find('a').attr('href');
        // append the icon/tab
        $(this).append(ui.draggable);
        // append the content of the icon
        $(this).parent().append($(draggableId));
        tabs.find(".ui-tabs-nav li").draggable({ revert: true });
        tabs.tabs( "refresh" );
      }
  });



});