// Helper to create the Page Dynamically using ProblemConfiguration JSON  file
(function(window){

	// Load Probelms information 
	function loadProblemsData(fnCallBack) {
		$.getJSON("ProblemConfiguration.json", function(oData){
			if(typeof fnCallBack === "function") {
				fnCallBack(oData);
			}
		}).fail(function(){
			// Only for Development Case
			let oJSONData = {
				"Problems" : [{
					"ProblemID" : "1",
					"ProblemTitle" : "Multiples of 3 and 5",
					"ProblemDescription" : "If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.\n Find the sum of all the multiples of 3 or 5 below 1000.",
					"ProblemExternalLink": "https://projecteuler.net/problem=1",
					"InputType":"Single",
					"Input": "Number",
					"InputCast" : "Int",
					"Output": "Number",
					"Tag":"Maths,Number,Euler,JS",
					"FunctionToExecute": "calculateSumofMultiplesOfThreeAndFive"
				},{
					"ProblemID" : "2",
					"ProblemTitle" : "Sum of Pairs",
					"ProblemDescription" : "Given a list of integers and a single sum value, return the first two values (parse from the left please) in order of appearance that add up to form the sum.",
					"ProblemExternalLink": "https://www.codewars.com/kata/sum-of-pairs",
					"InputType":"Multiples",
					"Input": "Array,Number",
					"InputCast" : "ArrayInt,Int",
					"Output": "Array",
					"Tag":"Maths,Array,Euler,JS",
					"FunctionToExecute": "sum_pairs"
				}]
			};

			if(typeof fnCallBack === "function") {
				fnCallBack(oJSONData);
			}	
		});
	}

	
	// Start the process of rendering the HTML Tags
	function createHTMLDesign(oJSONData){
		let aProblemsData = oJSONData.Problems;
		this.iProblemCount = 1;		
		aProblemsData.forEach(createProblemContainer.bind(null, "panel-group"));
	}

	// Helper to create the Panel container for Problem 
	function createProblemContainer(sClassNameToAppend, oProblem){
		// Create the Panel for the problem
		let sHtml = "<div class='panel-heading'>" + this.iProblemCount + ". " + oProblem.ProblemTitle+
		"</div><div id='problem-" +oProblem.ProblemID+"'  class='panel-body class-"+oProblem.ProblemID+"'></div>";

		$("<div/>", {
			"class" : "panel panel-primary",
			html : sHtml
		}).appendTo("." +sClassNameToAppend);


		// Create the Problem description and the external Link
		let sExternalLink = "<a target='_blank' href='" + oProblem.ProblemExternalLink+ "'> Visit Problem : " + oProblem.ProblemTitle + "</a>";
		let sProblemDescription = "<h4>"+oProblem.ProblemDescription+"</h4>" + sExternalLink;	
		$("<div/>", {	
			html : sProblemDescription
		}).appendTo("#problem-" + oProblem.ProblemID);


		// This sections handles creation of Input/OutPut (In Left column) and Source Code (In Right Column)
		let sRowContentHTML = "<div class='col-sm-6 colLeft-"+ oProblem.ProblemID+ "'></div>"+
		"<div class='col-sm-6 colRight-"+ oProblem.ProblemID+ "'><h4>Source Code</h4><br>"+
		"<pre><code>"+ window[oProblem.FunctionToExecute].toString() +"</code></pre></div>";
		$("<div/>",{
			class: "row",
			html: sRowContentHTML
		}).appendTo("#problem-" + oProblem.ProblemID);	

		// Create the Form Content for INPUT
		let sFormInputContent = createFormInputContent(oProblem);
		let sFormGroupHtml = "<h4 class='bg-info'>Input</h4><div class='form-group'>"+ sFormInputContent + "</div>";	
		$("<form/>", {
	    	"class": "problemForm_"+oProblem.ProblemID ,
	    	html: sFormGroupHtml
	  	}).appendTo(".colLeft-" + oProblem.ProblemID);

	  	$("<button/>",{
	  		"type" : "button",
			"class" : "btn btn-primary",
			"html"  : "Run Problem"
		}).on("click", function(){
			RenderingEngine.solveTheProblem(oProblem);
		}).appendTo(".problemForm_"+oProblem.ProblemID );


		// Create output content
		let sOutputContent = "<br><h4  class='bg-info'>Output</h4><div class='form-group' id='output-content-"+oProblem.ProblemID+"'/>" ; 
		$("<div/>", {
			id: "output-" + oProblem.ProblemID,
			html : sOutputContent
		}).appendTo(".colLeft-" + oProblem.ProblemID);

	  	this.iProblemCount++;
	}

	// Helper to create elements for Input Form Container
	function createFormInputContent(oProblem){
		let sHTML = "";
		if(oProblem.InputType === "Single") {
			sHTML += "<label for="+oProblem.Input+">"+oProblem.Input+":</label>" +
		    	"<input class='form-control' id='problem-" + oProblem.ProblemID + "-"+oProblem.Input+"'></input>";
		} else if(oProblem.InputType === "Multiples"){
			let aMultiples = oProblem.Input.split(",");
			aMultiples.forEach(function(sInput){
				sHTML += "<label for="+sInput+">"+sInput+":</label>" +
		    	"<input class='form-control'  id='problem-" + oProblem.ProblemID + "-"+oProblem.Input+"'></input>";
			});
		}

		return sHTML;
	}

	// Create Rendering Engine Function
	var RenderingEngine = {};
	RenderingEngine.init = function(){
		loadProblemsData(function(oJSONData){
			createHTMLDesign(oJSONData);
		});
	};
	
	// Process Input and Output
	RenderingEngine.solveTheProblem = function(oProblem) {
		let output = processInputAndCallMethod(oProblem);
		// Do it once confirmed that problem is solved. Use callback or Deffered ?
		processOutput(output, oProblem.ProblemID);
	}

	// Helper to execute the Problem Specific Functions
	function processInputAndCallMethod(oProblem) {
		let sOutput="";
		if(oProblem.InputType === "Single") {
			let value = JSON.parse($("#problem-" + oProblem.ProblemID + "-" + oProblem.Input).val());
			sOutput = window[oProblem.FunctionToExecute](value);

		} else if(oProblem.InputType === "Multiples"){
			let aMultiples = oProblem.Input.split(",");
			let aParams = [];
			aMultiples.forEach(function(sInput){
				aParams.push(JSON.parse($("#problem-" + oProblem.ProblemID + "-" + sInput).val()));
			});
			sOutput = window[oProblem.FunctionToExecute].apply(null, aParams);			
		}
		return sOutput;
	}

	// Helper to cast the value based on InputCast
	function typeCastValue(value, sType){
		// TODO : This method needs to be enhanced
		let returnValue = "";

		switch(sType){
			case "Int":
				returnValue = +sType;
			break;
		}

		return returnValue;
	}

	// Helper to render the output in HTML
	function processOutput(output, ProblemID) {
		// Output
		let sOutputHtml = "<pre><p class='bg-success'>" + JSON.stringify(output) +"</p></pre>";
		$("#output-content-" + ProblemID).html(sOutputHtml);
	}	
	window.RenderingEngine = RenderingEngine;
})(window);