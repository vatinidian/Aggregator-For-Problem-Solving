// Helper to create the Page Dynamically using ProblemConfiguration JSON  file
$.getJSON( "https://github.com/vatinidian/ProjectCode/blob/master/ProblemConfiguration.json", function( data ) {
	debugger;
  var items = [];
  $.each( data, function( key, val ) {
    items.push( "<li id='" + key + "'>" + val + "</li>" );
  });
 
  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "body" );
});

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', chrome.extension.getURL('ProblemConfiguration.json'), true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
}

/*loadJSON(function(response) {
  	// Parse JSON string into object
    var actual_JSON = JSON.parse(response);
    debugger;
 });*/
/*
$.ajax({
  dataType: "json",
  url: "https://github.com/vatinidian/ProjectCode/blob/master/ProblemConfiguration.json",
  success: function(){
  	debugger;
  }
});*/