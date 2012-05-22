/* Foundation v2.2.1 http://foundation.zurb.com */
jQuery(document).ready(function ($) {
  /* Use this js doc for all application specific JS */

	/* TABS --------------------------------- */
	/* Remove if you don't need :) */

	function activateTab($tab) {
		var $activeTab = $tab.closest('dl').find('a.active'),
				contentLocation = $tab.attr("href") + 'Tab';
				
		// Strip off the current url that IE adds
		contentLocation = contentLocation.replace(/^.+#/, '#');

		//Make Tab Active
		$activeTab.removeClass('active');
		$tab.addClass('active');

    //Show Tab Content
		$(contentLocation).closest('.tabs-content').children('li').hide();
		$(contentLocation).css('display', 'block');
	}

	$('dl.tabs').each(function () {
		//Get all tabs
		var tabs = $(this).children('dd').children('a');
		tabs.click(function (e) {
			activateTab($(this));
		});
	});

	if (window.location.hash) {
		activateTab($('a[href="' + window.location.hash + '"]'));
		$.foundation.customForms.appendCustomMarkup();
	}

	/* ALERT BOXES ------------ */
	$(".alert-box").delegate("a.close", "click", function(event) {
    event.preventDefault();
	  $(this).closest(".alert-box").fadeOut(function(event){
	    $(this).remove();
	  });
	});


	/* PLACEHOLDER FOR FORMS ------------- */
	/* Remove this and jquery.placeholder.min.js if you don't need :) */

	$('input, textarea').placeholder();

	/* TOOLTIPS ------------ */
	$(this).tooltips();



	/* UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE6/7/8 SUPPORT AND ARE USING .block-grids */
//	$('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'left'});
//	$('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'left'});
//	$('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'left'});
//	$('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'left'});



	/* DROPDOWN NAV ------------- */

	var lockNavBar = false;
	$('.nav-bar a.flyout-toggle').live('click', function(e) {
		e.preventDefault();
		var flyout = $(this).siblings('.flyout');
		if (lockNavBar === false) {
			$('.nav-bar .flyout').not(flyout).slideUp(500);
			flyout.slideToggle(500, function(){
				lockNavBar = false;
			});
		}
		lockNavBar = true;
	});
  if (Modernizr.touch) {
    $('.nav-bar>li.has-flyout>a.main').css({
      'padding-right' : '75px'
    });
    $('.nav-bar>li.has-flyout>a.flyout-toggle').css({
      'border-left' : '1px dashed #eee'
    });
  } else {
    $('.nav-bar>li.has-flyout').hover(function() {
      $(this).children('.flyout').show();
    }, function() {
      $(this).children('.flyout').hide();
    })
  }


	/* DISABLED BUTTONS ------------- */
	/* Gives elements with a class of 'disabled' a return: false; */

  function getParameterByName(name)
  {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if(results == null)
      return "";
    else
      return decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  var display_date = moment(getParameterByName("date"), "YYYY-MM-DD");
  $("#edition").html(display_date.format("DD/MM/YYYY"));

   $.ajax({
      type: "GET",
      url: "http://feeds.feedburner.com/Octocats?format=xml",
      dataType: "xml",
      success: function(xml) {
        var entries = $(xml).find('entry');
        var selected_entry = entries[Math.floor(Math.random()*(entries.length + 1))];

        // If there was entry display_date, select it
        var first_entry_day = moment(entries.find('updated')[0].textContent.split("T")[0], "YYYY-MM-DD");
        if(first_entry_day.diff(display_date, 'days') == 0){
          selected_entry = entries[0]
        }

        $("#octodex").html("<span class='fancy'><img src='" + $(selected_entry).find('img').attr('src') + "'></span>");
      }
   });

   $.getJSON("file:///tmp/" + display_date.format("YYYY-MM-DD[.json]"), function(data) {
      var items = [];
      console.log("data: " + data.length);
      $.each(data, function(key, repo) {
        var items = [];
        var max_count = repo[0]["count"];
        $.each(repo, function(){
          items.push("<li class='project'><span class='count black round label' style='padding-left:");
          items.push(Math.abs(this["count"] * 50 / max_count));
          items.push("px'>" + this["count"] + "</span>");
          if(this["language"] != null)
            items.push("<span class='lang black radius label'>" + this["language"] + "</span>");
          items.push("<br><a href='http://github.com/" + this["owner"] + "/" + this["name"] + "/'>");
          items.push(this["owner"] + "/" + this["name"] + "</a></li>");
        });
        $("#" + key).html(items.join(""));
      });
   });
});
