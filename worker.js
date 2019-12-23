importScripts("main.js");

function calcWeight(variableValues) {
	var b = variableValues;
	var f = ["A", "BB", "CC", "DDD"];
	
	// generate Rn. usually 5 iterations are enough, adding more only makes it unreasonably long
	var arr = [], k=0, iterations=5;
	arr[b[0]] = new Code(b[0], ["A"]);
	arr[b[1]] = new Code(b[1], ["BB"]);
	arr[b[2]] = new Code(b[2], ["CC"]);
	arr[b[3]] = new Code(b[3], ["DDD"]);
	while(k < iterations) {
		arr = algCodes(arr, b, {
			f: f
		});
		k++;
	}
	
	// weighted compactness, indicates average encoded code length
	var weightFunction = function(n) {
		return (n < 0x20) ? 1 : (n > 0x7f ? (n > 0x100 ? 0 : 1) : 3);
	};
	var outputValue = 0;
	arr.forEach(function(_, i) {
		outputValue += _.l * weightFunction(i);
	});
	
	return outputValue;
}

function message() {
	postMessage("hi");
}

self.addEventListener("message", function(evt) {
	var values = evt.data; // input: array of variableValues [A,BB,CC,DDD]
	var retValue = values.map(function(variableValues) {
		return {b: variableValues, v: calcWeight(variableValues)};
	});
	postMessage(retValue); // output: array of {b: input, v: calcWeight(input) }
});