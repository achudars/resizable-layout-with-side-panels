$(function() {

	jQuery("input#next").click(function() {
		console.log("NEXT");
		jQuery(".left-drop").append(jQuery(".left-drop li:first-child"));
	});

	jQuery("input#prev").click(function() {
		console.log("PREV");
		jQuery(".left-drop").prepend(jQuery(".left-drop li:last-child"));
	});

	jQuery("li").click(function(){ 
		jQuery(this).siblings().removeClass("selected");
		jQuery(this).addClass("selected");
	});


  // resizable panels

  // main panel init
  var container = $('#outer-container').layout({
  	west: {
  		resizable : true,
  		initClosed : false,
  		size: 350,
  		togglerClass: "left-toggler"
  	},
  	east: {
  		resizable : false,
  		initClosed : true,
  		size: 350,
  		showOverflowOnHover: true
  	}
  });
  container.allowOverflow("north");
  container.addPinBtn("#left-pin", "west");

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
  // make tabs draggable
  tabs.find(".ui-tabs-nav li").draggable({
    handle: "a",
  	stack: "div",
  	opacity: 0.8,
  	revert: false, 
  	start: function( event, ui ) {
  		var draggableIdParentClassName = $(this).parent();
  		if(draggableIdParentClassName.hasClass('left-drop')) {
  			$('.ui-layout-west').css({"z-index":"1000"});
  			$('.ui-layout-east').css({"z-index":"99"});
  		} else if (draggableIdParentClassName.hasClass('right-drop')) {
  			$('.ui-layout-east').css({"z-index":"1000"});
  			$('.ui-layout-west').css({"z-index":"99"});
  		};
  		tabs.find(".ui-tabs-nav li").draggable({ revert: false });
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
		$(draggableId).removeClass('dragged-out-content');
	},
	out: function ( event, ui ) {
		tabs.find(".ui-tabs-nav li").draggable({ revert: false });
		$(ui.draggable).css({"top":"","left":""});
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
		// append the icon/tab
		$("body").append(ui.draggable);
		// append the content of the icon
		$("body").append($(draggableId));

		$(ui.draggable).css({"position":"absolute"});
		$(draggableId).appendTo(ui.draggable).addClass('dragged-out-content');
		$(draggableId).draggable({ handle: ui.draggable });
		
	},
	out: function ( event, ui ) {
		$(ui.draggable).css({"position":"relative"});
	}
});



});