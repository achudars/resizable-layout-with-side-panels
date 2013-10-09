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
  var center = $( "#outer-container .ui-layout-center" );

  tabs.find(".ui-tabs-nav li").draggable({
  	handle: "a",
  	stack: "div",
  	opacity: 0.35, 
  	start: function( event, ui ) {
  		var draggableIdParentClassName = $(this).parent();
  		if(draggableIdParentClassName.hasClass('left-drop')) {
  			$('.ui-layout-west').css({"z-index":"100"});
  			$('.ui-layout-east').css({"z-index":"99"});
  		} else if (draggableIdParentClassName.hasClass('right-drop')) {
  			$('.ui-layout-east').css({"z-index":"100"});
  			$('.ui-layout-west').css({"z-index":"99"});
  		}
  		tabs.find(".ui-tabs-nav li").draggable({ revert: true });
  	},
  	stop: function() {
  		tabs.find( ".ui-tabs-nav" ).sortable({
		  	stop: function() {
		  		tabs.tabs( "refresh" );
		  	}
		  });
  	}
  });



tabs.find(".ui-tabs-nav").droppable({
	hoverClass: "ui-state-active",
  	drop: function( event, ui ) {
  		var draggableId = ui.draggable.find('a').attr('href');
		// append the icon/tab
		$(this).append(ui.draggable);
		// append the content of the icon
		$(this).parent().append($(draggableId));
		$(ui.draggable).css({"top":"","left":""});
		//tabs.tabs( "refresh" );
	},
	out: function ( event, ui ) {
		tabs.find(".ui-tabs-nav li").draggable({ revert: false });
		$(ui.draggable).css({"top":"","left":""});
		//tabs.tabs( "refresh" );
	}
});

center.droppable({
	hoverClass: "ui-state-active",
	over: function ( event, ui ) {
		// this is important logic
		tabs.find(".ui-tabs-nav li").draggable({ revert: false });
	},
  	drop: function ( event, ui ) {
  		var draggableId = ui.draggable.find('a').attr('href');
  		$(this).parent().append($(draggableId));
		$(ui.draggable).css({"position":"absolute"});
		$(draggableId).appendTo(ui.draggable).css({
			"position":"absolute",
			"display":"",
			"width":"340px",
			"height":"340px",
			"top":"100%",
			"background":"#FFF",
			"box-shadow":"rgba(34, 34, 34, .5) 10px 10px 10px -5px"
		});
		$(draggableId).draggable({ handle: ui.draggable });
		
	},
	out: function ( event, ui ) {
		$(ui.draggable).css({"position":"relative"});
	}
});



});