var quote = document.getElementById("quote_text");
var context = document.getElementById("context");
var quouteChangeIntervalID = 0;

loadXMLDoc();
setInterval(loadXMLDoc, 3000000);

function loadXMLDoc() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			runQuoteSlide(this);
		}
	}
	xmlhttp.open("GET", "quotes.xml", true);
	xmlhttp.send();
	return xmlhttp
}

function runQuoteSlide(xml){
	quotes = (xml.responseXML).getElementsByTagName("quote");
	index = Math.floor(Math.random() * quotes.length);
	quoteSequence = [];

	if (quouteChangeIntervalID){
		clearInterval(quouteChangeIntervalID);
	}

	quouteChangeIntervalID = setInterval(function () {
		if (quoteSequence.length == 0){
			quoteSequence = new Array(quotes.length);
			for (var i = 0; i < quoteSequence.length; i++) {
				quoteSequence[i] = i;
			}
		}
		changeQuote(quotes, quoteSequence);

	}, 4000);
}

function changeQuote(quotes, quoteSequence) {
	var index, quote, context;
	quote = "";
	context = "";

	index = Math.floor(Math.random() * quoteSequence.length);
	quoteIndex = quoteSequence.splice(index, 1)[0];

	quote = quotes[quoteIndex].getElementsByTagName("text")[0].childNodes[0].nodeValue;
	context = quotes[quoteIndex].getElementsByTagName("context")[0].childNodes[0];

	if (context == undefined) context = " ";
	else context = context.nodeValue;


	document.getElementById("quote_text").innerHTML = quote;
	document.getElementById("context").innerHTML = context;
}
