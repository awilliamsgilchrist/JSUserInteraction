//Use to update the recursive tree when a button is clicked
var buttonHandler = function(me) {
	var parentDiv = me.parentNode;
	parentDiv.clear();
	var slider = parentDiv.querySelector(".range-slider");
	if(parentDiv === document.form.querySelector(".fib")) {
		display(slider.value, fib, parentDiv);
	}
	else if(parentDiv === document.form.querySelector(".pell")) {
		display(slider.value, pell, parentDiv);
	}
	else{
		display(slider.value, trib, parentDiv);
	}
}

//Used to update the button readout when slider changes
var sliderHandler = function(me) {
	var parentDiv = this.parentNode;
	var childButton = parentDiv.querySelector("button");
	if(parentDiv.getAttribute("class") === "fib"){
		childButton.textContent = "Fib(" + me.value + ")";
	}
	else if(parentDiv.getAttribute("class") === "pell"){
		childButton.textContent = "Pell(" + me.value + ")";
	}
	else {
		childButton.textContent = "Trib(" + me.value + ")";
	}
}

//A simple function to create text content for a node
var nContent = function(n, nType, nValue) {
	return "" + nType + "(" + n + ") = " + nValue;
}

//Takes a functor and creates a tree with which to display that functor's output
var display = function(n, funct, node) {
	var tree = funct(n);
	node.appendChild(tree.div);
	node.setAttribute("class", node.getAttribute("class") + " tree");
}

//The function for generating a graphical display of Fibonacci numbers. May be used as a functor
var fib = function fibonacci(n) {
	var value;
	var div = document.createElement("div");
	div.setAttribute("class", "node");
	
	if(n < 2) {
		value = n;
		var p = document.createElement("p");
		p.textContent = nContent(n, "fib", value);
		div.appendChild(p);
	}
	else {
		var left = fibonacci(n - 1);
		var clas = left.div.getAttribute("class");
		left.div.setAttribute("class", clas + " node-left");
		
		var right = fibonacci(n - 2);
		clas = right.div.getAttribute("class");
		right.div.setAttribute("class", clas + " node-right");
		
		value = left.value + right.value;
		var p = document.createElement("p");
		p.textContent = nContent(n, "fib", value);
		div.appendChild(p);
		
		div.appendChild(left.div);
		div.appendChild(right.div);
	}
	
	return{"value" : value, "div" : div};
}

//The function for generating a graphical display of Pell numbers. May be used as a functor
var pell = function pellNum(n) {
	var value;
	var div = document.createElement("div");
	div.setAttribute("class", "node");
	
	if(n < 2) {
		value = n;
		var p = document.createElement("p");
		p.textContent = nContent(n, "pell", value);
		div.appendChild(p);
	}
	else {
		var left = pellNum(n - 1);
		var clas = left.div.getAttribute("class");
		left.div.setAttribute("class", clas + " node-left");
		
		var right = pellNum(n - 2);
		clas = right.div.getAttribute("class");
		right.div.setAttribute("class", clas + " node-right");
		
		value = 2 * left.value + right.value;
		var p = document.createElement("p");
		p.textContent = nContent(n, "pell", value);
		div.appendChild(p);
		
		div.appendChild(left.div);
		div.appendChild(right.div);
	}
	
	return{"value" : value, "div" : div};
}

//The function for generating a graphical display of Tribonacci numbers. May be used as a functor
var trib = function tribonacci(n) {
	var value;
	var div = document.createElement("div");
	div.setAttribute("class", "node");
	
	if( n < 3) {
		if( n < 2) {
			value = 0;
		}
		else {
			value = 1;
		}
		var p = document.createElement("p");
		p.textContent = nContent(n, "trib", value);
		div.appendChild(p);
	}
	else {
		var left = tribonacci(n - 1);
		var clas = left.div.getAttribute("class");
		left.div.setAttribute("class", clas + " node-left");
		
		var center = tribonacci(n - 2);
		clas = center.div.getAttribute("class");
		center.div.setAttribute("class", clas + " node-center");
		
		var right = tribonacci(n - 3);
		clas = right.div.getAttribute("class");
		right.div.setAttribute("class", clas + " node-right");
		
		value = left.value + center.value + right.value;
		var p = document.createElement("p");
		p.textContent = nContent(n, "trib", value);
		div.appendChild(p);
		
		div.appendChild(left.div);
		div.appendChild(center.div);
		div.appendChild(right.div);
	}
	
	return{"value" : value, "div" : div};
}

var fibDiv = document.querySelector("form").querySelector(".fib");
var pellDiv = document.querySelector("form").querySelector(".pell");
var tribDiv = document.querySelector("form").querySelector(".trib");

display(1, fib, fibDiv);
display(1, pell, pellDiv);
display(1, trib, tribDiv);

fibDiv.querySelector("button").addEventListener("onclick", buttonHandler(fibDiv.querySelector("button")));
fibDiv.querySelector(".range-slider").addEventListener("onchange", sliderHandler(fibDiv.querySelector(".range-slider")));