var quote = document.getElementById("quote_text");
var context = document.getElementById("context");

setInterval(loadXMLDoc, 4000);

function loadXMLDoc() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			changeQuote(this);
		}
	}
	xmlhttp.open("GET", "quotes.xml", true);
	xmlhttp.send();
}

function changeQuote(xml) {
	var xmlDoc, index, quotes, quote, context;
	quote = "";
	context = "";
	quotes = (xml.responseXML).getElementsByTagName("quote");
	index = Math.floor(Math.random() * quotes.length);
	
	quote = quotes[index].getElementsByTagName("text")[0].childNodes[0].nodeValue;
	context = quotes[index].getElementsByTagName("context")[0].childNodes[0];
	if (context == undefined) context = " ";
	else context = context.nodeValue;


	document.getElementById("quote_text").innerHTML = quote;
	document.getElementById("context").innerHTML = context;
}
