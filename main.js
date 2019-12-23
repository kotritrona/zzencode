function rndItem(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

function spliceRandomItem(arr) {
	return arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
}

function Code(n, b) {
	n = n || 0;
	b = b || [];
	this.n = n;
	this.l = 2000;
	this.a = [];
	this.g = function() {
		return rndItem(this.a);
	}
	this.c = function(str) {
		if(str.length > this.l) {
			return 0;
		}
		else if(str.length == this.l) {
			if(this.a.indexOf(str) == -1 && this.a.length <= 5) {
				this.a.push(str);
			}
			return 1;
		}
		else {
			this.l = str.length;
			this.a = [str];
			return 2;
		}
	}
	for(var i in b) {
		this.c(b[i]);
	}
}

Code.nla = function(obj) {
	var c = new Code();
	c.n = obj.n;
	c.l = obj.l;
	c.a = obj.a;
	return c;
}

// opt: limL, limH, d, f
function algCodes(arr, b, opt) {
	b = b || [3, 14, 69, 256];
	opt = opt || {};
	limL = opt.limL || 0;
	limH = opt.limH || 300;
	var d = opt.d || ["+", "-", "^", "*", "/", "<<", ">>", "|", "&", "%"];
	var f = opt.f || ["_", "__", "_$", "__$"];
	
	for(var n=0; n<f.length; n++) {
		try {
			eval("var " + f[n] + " = " + b[n]);
		} catch(c){}
	}
	
	for(var i in arr) {
		for(var j in arr[i].a) {
			var a = arr[i].a[j];
			for(var m=0; m<d.length; m++) {
				for(var n=0; n<f.length; n++) {
					var s = a + d[m] + f[n];
					var x = eval(s);
					if(x >= limL && x <= limH && 0 == x % 1) {
						arr[x] = arr[x] || new Code(x, []);
						arr[x].c(s);
					}
				}
			}
		}
	}
	return arr;
}

function zzencode(str, opt) {
	opt = opt || {};
	var R = [];
	var out = "";
	var b = opt.b || [3, 14, 69, 256];
	var br = opt.br || ["!![]+!![]|!![]","A+A|A*A^A","A*A*A+A*BB","CC>>A<<CC"];
	var Rn = [];
	if(opt.Rn) {
		// Rn is probably JSON parsed, so we have to add some methods into them
		Rn = opt.Rn.map(Code.nla);
		
	} else if(!opt.b && !opt.br) {
		Rn = [{"n":0,"l":3,"a":["A-A","A^A","A%A"]},{"n":1,"l":3,"a":["A/A"]},{"n":2,"l":4,"a":["A&BB","BB&A","BB%A"]},{"n":3,"l":1,"a":["A"]},{"n":4,"l":5,"a":["BB&CC","CC&BB","A/A+A","A+A/A"]},{"n":5,"l":5,"a":["A^A+A","A+A^A"]},{"n":6,"l":3,"a":["A+A"]},{"n":7,"l":5,"a":["A+A|A"]},{"n":8,"l":5,"a":["CC>>A"]},{"n":9,"l":3,"a":["A*A"]},{"n":10,"l":5,"a":["A^A*A","A*A^A"]},{"n":11,"l":4,"a":["BB-A"]},{"n":12,"l":5,"a":["A+A*A","A*A+A"]},{"n":13,"l":4,"a":["A^BB","BB^A"]},{"n":14,"l":2,"a":["BB"]},{"n":15,"l":4,"a":["A|BB","BB|A"]},{"n":16,"l":7,"a":["BB%A+BB","BB%A<<A","BB+BB%A","A+CC%BB"]},{"n":17,"l":4,"a":["A+BB","BB+A"]},{"n":18,"l":6,"a":["A^A+BB","A^BB+A","A+BB^A","BB+A^A"]},{"n":19,"l":6,"a":["A|BB+A","A+BB|A","BB+A|A"]},{"n":20,"l":6,"a":["A+A+BB","A+BB+A","BB+A+A","CC/A-A","CC/A^A","A^CC/A"]},{"n":21,"l":8,"a":["A*A*A^BB"]},{"n":22,"l":7,"a":["BB^A<<A","A<<A^BB"]},{"n":23,"l":4,"a":["CC/A"]},{"n":24,"l":4,"a":["A<<A"]},{"n":25,"l":7,"a":["BB-A+BB","CC/A^BB","BB+BB-A","BB^CC/A","A*CC>>A","CC*A>>A"]},{"n":26,"l":6,"a":["CC/A+A","A+CC/A"]},{"n":27,"l":5,"a":["A*A*A"]},{"n":28,"l":5,"a":["BB+BB"]},{"n":29,"l":8,"a":["CC/A+A+A","A+CC/A+A"]},{"n":30,"l":7,"a":["BB|A<<A","A<<A|BB","A+A*A*A","A*A*A+A"]},{"n":31,"l":7,"a":["A^BB+BB","BB^A+BB","A|BB+BB","BB|A+BB","A+BB+BB","A+BB^BB"]},{"n":32,"l":6,"a":["DDD>>A"]},{"n":33,"l":8,"a":["A*BB-A*A","BB*A-A*A"]},{"n":34,"l":7,"a":["CC>>A/A"]},{"n":35,"l":8,"a":["DDD>>A^A","DDD>>A|A","A^DDD>>A","A|DDD>>A","A*A^A*BB","A*BB^A*A"]},{"n":36,"l":7,"a":["BB^A*BB","A*BB^BB","BB*A^BB"]},{"n":37,"l":7,"a":["CC/A+BB","BB+CC/A"]},{"n":38,"l":9,"a":["A^CC/A+BB","CC/A+BB^A","BB+CC/A^A","A^BB+CC/A"]},{"n":39,"l":6,"a":["A*BB-A","BB*A-A"]},{"n":40,"l":9,"a":["CC/A+A+BB","A+CC/A+BB","A*BB^BB&A","A*BB^BB%A","BB*A^BB&A","BB*A^BB%A"]},{"n":41,"l":6,"a":["A^A*BB","A^BB*A","A*BB^A","BB*A^A"]},{"n":42,"l":4,"a":["A*BB","BB*A"]},{"n":43,"l":6,"a":["A|BB*A","A*BB|A","BB*A|A"]},{"n":44,"l":8,"a":["A+A^A*BB","A*BB^A+A","BB*A^A+A"]},{"n":45,"l":6,"a":["A+A*BB","A+BB*A","A*BB+A","BB*A+A"]},{"n":46,"l":7,"a":["BB|A*BB","A*BB|BB","BB*A|BB"]},{"n":47,"l":8,"a":["A|BB*A+A","A+A*BB|A","A+BB*A|A","A*BB+A|A","BB*A+A|A"]},{"n":48,"l":6,"a":["A+A<<A"]},{"n":49,"l":6,"a":["DDD%CC"]},{"n":50,"l":8,"a":["DDD%CC^A","A^DDD%CC"]},{"n":51,"l":8,"a":["DDD%CC|A","A|DDD%CC","A^A+A<<A","A*A+A*BB","A*BB+A*A","BB*A+A*A"]},{"n":52,"l":7,"a":["CC-BB-A","CC-BB^A","CC-A-BB","A^CC-BB"]},{"n":53,"l":8,"a":["CC^BB<<A","BB<<A^CC"]},{"n":54,"l":9,"a":["CC-BB-A/A","CC-BB^A/A","A/A^CC-BB","CC-A/A-BB"]},{"n":55,"l":5,"a":["CC-BB"]},{"n":56,"l":7,"a":["BB+A*BB","BB+BB*A","A*BB+BB","BB*A+BB"]},{"n":57,"l":8,"a":["CC-BB^BB","BB^CC-BB","CC-A*A-A","CC-A-A*A"]},{"n":58,"l":7,"a":["CC-BB+A","A+CC-BB","CC+A-BB"]},{"n":59,"l":9,"a":["A^BB+A*BB","A+BB^A*BB","BB+A^A*BB","A|BB+A*BB","A+BB|A*BB","BB+A|A*BB"]},{"n":60,"l":6,"a":["CC-A*A"]},{"n":61,"l":9,"a":["CC/A^A*BB","CC/A^BB*A","CC-BB+A+A","A+CC-BB+A","CC+A-BB+A","A*BB^CC/A"]},{"n":62,"l":9,"a":["A+A<<A^BB","A+A<<A|BB","CC-BB^A*A","CC-A*A|BB","A*A^CC-BB"]},{"n":63,"l":6,"a":["CC-A-A"]},{"n":64,"l":7,"a":["CC-A&CC","A+CC&CC","CC+A&CC"]},{"n":65,"l":6,"a":["CC-A^A","A^CC-A"]},{"n":66,"l":4,"a":["CC-A"]},{"n":67,"l":6,"a":["A+A^CC","CC-A|A","CC^A+A","A|CC-A"]},{"n":68,"l":6,"a":["A/A^CC","CC-A/A","CC^A/A"]},{"n":69,"l":2,"a":["CC"]},{"n":70,"l":4,"a":["A^CC","CC^A"]},{"n":71,"l":4,"a":["A|CC","CC|A"]},{"n":72,"l":4,"a":["A+CC","CC+A"]},{"n":73,"l":8,"a":["A/A+A+CC","A+A/A+CC","A+A*A^CC","A*A+A^CC","CC^A+A*A","A/A^CC+A"]},{"n":74,"l":9,"a":["CC-A*A+BB","CC-A|A+CC","A/A^CC^BB","CC-A/A^BB","CC^A/A+BB","CC^A/A^BB"]},{"n":75,"l":5,"a":["BB^CC","CC^BB"]},{"n":76,"l":6,"a":["A*A^CC","CC^A*A"]},{"n":77,"l":6,"a":["A*A|CC","CC|A*A"]},{"n":78,"l":6,"a":["A*A+CC","CC+A*A"]},{"n":79,"l":5,"a":["BB|CC","CC|BB"]},{"n":80,"l":7,"a":["BB-A+CC","A^BB+CC","CC-A+BB","A^CC+BB","BB+CC-A","BB+CC^A"]},{"n":81,"l":7,"a":["A*A*A*A"]},{"n":82,"l":7,"a":["CC/A^CC"]},{"n":83,"l":5,"a":["BB+CC","CC+BB"]},{"n":84,"l":7,"a":["A+BB^CC","BB+A^CC","CC^A+BB","CC^BB+A"]},{"n":85,"l":7,"a":["A+BB|CC","BB+A|CC","CC|A+BB","CC|BB+A"]},{"n":86,"l":7,"a":["A+BB+CC","BB+A+CC","A+CC+BB","CC+A+BB","BB+CC+A","CC+BB+A"]},{"n":87,"l":7,"a":["CC/A|CC","A|DDD/A"]},{"n":88,"l":7,"a":["BB-A<<A"]},{"n":89,"l":8,"a":["BB+BB^CC","CC^BB+BB"]},{"n":90,"l":9,"a":["CC-A^A<<A","CC-A|A<<A","A*A^CC+BB","BB+CC^A*A","A<<A^CC-A","A<<A|CC-A"]},{"n":91,"l":8,"a":["BB^DDD/A"]},{"n":92,"l":7,"a":["CC/A+CC","CC+CC/A"]},{"n":93,"l":7,"a":["A<<A^CC","A<<A|CC","CC^A<<A","CC|A<<A"]},{"n":94,"l":8,"a":["A*A*A^CC","CC^A*A*A"]},{"n":95,"l":8,"a":["BB|CC+BB","BB+CC|BB","CC+BB|BB","BB|DDD/A","A*A*A|CC","CC|A*A*A"]},{"n":96,"l":5,"a":["A<<CC"]},{"n":97,"l":8,"a":["BB+BB+CC","BB+CC+BB","CC+BB+BB"]},{"n":98,"l":9,"a":["A*BB-A^CC","BB*A-A^CC","A*BB^A+CC","BB*A^A+CC","A*BB^CC+A","BB*A^CC+A"]},{"n":99,"l":7,"a":["A^A<<CC","A<<CC^A","A<<CC|A"]},{"n":100,"l":10,"a":["A+BB+BB+CC","A+BB+CC+BB","BB+A+CC+BB","A+CC+BB+BB","CC+A+BB+BB","BB+CC+A+BB"]},{"n":101,"l":8,"a":["CC|A<<CC","A<<CC|CC"]},{"n":102,"l":9,"a":["A+A^A<<CC","A+A|A<<CC","A<<CC^A+A","A<<CC|A+A"]},{"n":103,"l":9,"a":["A*CC>>A/A","CC*A>>A/A","A*BB-A|CC","BB*A-A|CC"]},{"n":104,"l":9,"a":["A+A*BB^CC","A+BB*A^CC","A*BB+A^CC","BB*A+A^CC","CC-A^A*BB","CC^A+A*BB"]},{"n":105,"l":9,"a":["A*A^A<<CC","A<<CC^A*A","A<<CC|A*A"]},{"n":106,"l":9,"a":["A*BB|A+CC","BB*A|A+CC","CC-A|A*BB","A*BB|CC+A","A*BB|CC-A","BB*A|CC+A"]},{"n":107,"l":10,"a":["A*BB|BB^CC","BB*A|BB^CC","A<<CC^BB-A","A<<CC|BB-A","A*BB|CC^BB","BB*A|CC^BB"]},{"n":108,"l":9,"a":["A*BB-A+CC","BB*A-A+CC","A^A*BB+CC","A^A*BB^CC","A^BB*A+CC","A^BB*A^CC"]},{"n":109,"l":9,"a":["A^A*BB|CC","A^BB*A|CC","A*BB^A|CC","BB*A^A|CC","A+A*BB|CC","A+BB*A|CC"]},{"n":110,"l":8,"a":["BB^A<<CC","BB|A<<CC","A<<CC^BB","A<<CC|BB"]},{"n":111,"l":7,"a":["A*BB+CC","A*BB^CC","A*BB|CC","BB*A+CC","BB*A^CC","BB*A|CC"]},{"n":112,"l":5,"a":["BB<<A"]},{"n":113,"l":9,"a":["BB<<A^A/A","BB<<A|A/A"]},{"n":114,"l":8,"a":["CC-BB^CC"]},{"n":115,"l":7,"a":["A^BB<<A","A|BB<<A","BB<<A^A","BB<<A|A"]},{"n":116,"l":9,"a":["DDD%CC^CC"]},{"n":117,"l":8,"a":["CC|BB<<A","BB<<A|CC"]},{"n":118,"l":9,"a":["DDD%CC+CC","DDD-CC-CC","BB<<A^A+A","BB<<A|A+A"]},{"n":119,"l":8,"a":["CC-BB|CC"]},{"n":120,"l":10,"a":["A<<A|BB<<A","A<<CC^A<<A","A<<CC|A<<A","BB<<A|A+CC","BB<<A|A<<A","BB<<A|CC+A"]},{"n":121,"l":9,"a":["CC-A*A^CC","BB<<A^A*A","BB<<A|A*A"]},{"n":122,"l":9,"a":["CC-A-A^CC"]},{"n":123,"l":8,"a":["A*A*BB-A","A*BB*A-A","BB*A*A-A"]},{"n":124,"l":8,"a":["CC-BB+CC","CC+CC-BB"]},{"n":125,"l":8,"a":["A^A*A*BB","A^A*BB*A","A^BB*A*A","A*A*BB^A","A*BB*A^A","BB*A*A^A"]},{"n":126,"l":6,"a":["A*A*BB","A*BB*A","BB*A*A"]},{"n":127,"l":8,"a":["BB*BB-CC","A|BB*A*A","A*A*BB|A","A*BB*A|A","BB*A*A|A"]},{"n":128,"l":8,"a":["DDD>>A/A"]},{"n":129,"l":8,"a":["CC^BB*BB","BB*BB^CC","A+A*A*BB","A+A*BB*A","A+BB*A*A","A*A*BB+A"]},{"n":130,"l":10,"a":["CC^A+BB*BB","BB*BB-CC+A","CC^BB*BB+A","CC^BB*BB^A","BB*BB^CC^A","A+A*A*BB^A"]},{"n":131,"l":9,"a":["A*A^CC+CC","CC+CC^A*A"]},{"n":132,"l":8,"a":["BB^CC+CC","CC+CC^BB"]},{"n":133,"l":9,"a":["CC^A<<A+A","A<<A+A^CC"]},{"n":134,"l":10,"a":["BB^A+BB<<A","BB*BB^CC-A","A+BB<<A^BB","BB+A<<A^BB"]},{"n":135,"l":7,"a":["CC-A+CC","CC+CC-A"]},{"n":136,"l":7,"a":["A+BB<<A","BB+A<<A"]},{"n":137,"l":7,"a":["A^CC+CC","CC+CC^A"]},{"n":138,"l":5,"a":["CC+CC"]},{"n":139,"l":7,"a":["A|CC+CC","CC+CC|A"]},{"n":140,"l":9,"a":["BB+A*BB*A","BB+BB*A*A","A+A^CC+CC","A*A*BB+BB","A*BB*A+BB","BB*A*A+BB"]},{"n":141,"l":7,"a":["A+CC+CC","CC+A+CC","CC+CC+A"]},{"n":142,"l":8,"a":["BB|CC+CC","CC+CC|BB"]},{"n":143,"l":9,"a":["A|CC+CC+A","A+CC+CC|A","CC+A+CC|A","CC+CC+A|A"]},{"n":144,"l":9,"a":["A+CC+CC+A","CC+A+CC+A","CC+CC+A+A"]},{"n":145,"l":11,"a":["DDD-CC-BB*A","DDD-CC^BB*A","DDD-BB*A-CC","DDD-A*BB-CC","A*BB^DDD-CC","BB*A^DDD-CC"]},{"n":146,"l":10,"a":["A<<A^CC+CC","CC+CC^A<<A"]},{"n":147,"l":8,"a":["DDD%CC*A"]},{"n":148,"l":11,"a":["BB^DDD/A+CC","CC^A+A*CC^A","A+A*CC^CC^A","A+CC*A^CC^A","A*CC+A^CC^A","CC*A+A^CC^A"]},{"n":149,"l":10,"a":["BB-A+CC+CC","CC-A+BB+CC","BB+CC-A+CC","CC-A+CC+BB","CC+CC-A+BB","BB+CC+CC-A"]},{"n":150,"l":10,"a":["DDD%CC*A+A","A*A*A*A+CC"]},{"n":151,"l":9,"a":["CC^A+A*CC","A+A*CC^CC","A+CC*A^CC","A*CC+A^CC","CC*A+A^CC"]},{"n":152,"l":8,"a":["BB+CC+CC","CC+BB+CC","CC+CC+BB"]},{"n":153,"l":12,"a":["A+BB<<A^BB+A","BB+A<<A^BB+A","DDD%CC*A+A+A","A*A*A*A+CC+A","CC^A+A*CC^BB","A+A*CC^CC^BB"]},{"n":154,"l":10,"a":["A<<A|CC+CC","CC+CC|A<<A","BB*BB-BB*A","BB*BB-A*BB"]},{"n":155,"l":10,"a":["A^BB+CC+CC","A^CC+BB+CC","A+BB^CC+CC","BB+A^CC+CC","A+BB|CC+CC","BB+A|CC+CC"]},{"n":156,"l":10,"a":["BB+CC^A*CC","A*CC^BB+CC"]},{"n":157,"l":10,"a":["CC/A^CC+CC"]},{"n":158,"l":11,"a":["BB|CC+BB+CC","BB|DDD/A+CC","BB|CC+CC+BB","CC+CC|BB+BB","BB+CC+CC|BB","CC+BB+CC|BB"]},{"n":159,"l":10,"a":["CC/A|CC+CC"]},{"n":160,"l":9,"a":["A+A+BB<<A","A+BB+A<<A","BB+A+A<<A","CC/A-A<<A"]},{"n":161,"l":10,"a":["CC/A+CC+CC","CC+CC/A+CC"]},{"n":162,"l":11,"a":["A*CC-BB*A-A","CC*A-BB*A-A","A*CC-A*BB-A","CC*A-A*BB-A","A*CC-A-A*BB","CC*A-A-A*BB"]},{"n":163,"l":11,"a":["A<<A^DDD-CC","A+A+BB<<A^A","A+A+BB<<A|A","A+BB+A<<A^A","A+BB+A<<A|A","BB+A+A<<A^A"]},{"n":164,"l":11,"a":["A<<CC^BB*BB","DDD-CC-CC/A","BB*BB^A<<CC","DDD-CC/A-CC"]},{"n":165,"l":9,"a":["A*CC-BB*A","CC*A-BB*A","A*CC-A*BB","CC*A-A*BB"]},{"n":166,"l":11,"a":["BB+BB+CC+CC","BB+CC+BB+CC","CC+BB+BB+CC","BB+CC+CC+BB","CC+BB+CC+BB","CC+CC+BB+BB"]},{"n":167,"l":11,"a":["A*CC-BB*A|A","CC*A-BB*A|A","A*CC-A*BB|A","CC*A-A*BB|A"]},{"n":168,"l":11,"a":["A*BB+A*A*BB","BB*A+A*A*BB","A*A*BB+A*BB","BB*BB-BB-BB","A*A*BB+BB*A","A*BB*A+BB*A"]},{"n":169,"l":13,"a":["A+BB+BB+CC+CC","A+BB+CC+BB+CC","BB+A+CC+BB+CC","A+CC+BB+BB+CC","CC+A+BB+BB+CC","BB+CC+A+BB+CC"]},{"n":170,"l":10,"a":["A*BB|CC+CC","BB*A|CC+CC","CC+CC|A*BB","CC+CC|BB*A"]},{"n":171,"l":12,"a":["A^A*BB|CC+CC","A^BB*A|CC+CC","A*BB^A|CC+CC","BB*A^A|CC+CC","A*CC-BB*A^BB","CC*A-BB*A^BB"]},{"n":172,"l":11,"a":["DDD-CC/A^CC","CC/A^DDD-CC"]},{"n":173,"l":9,"a":["DDD-CC-BB","DDD-BB-CC"]},{"n":174,"l":11,"a":["DDD-CC-BB^A","DDD-BB-CC^A","A^DDD-BB-CC","DDD-A^BB+CC"]},{"n":175,"l":10,"a":["A<<CC^A*CC","A*CC^A<<CC","CC*A^A<<CC"]},{"n":176,"l":11,"a":["DDD-CC-BB+A","DDD-BB-CC+A","DDD-CC^BB-A","BB^DDD-CC+A","DDD-BB^CC-A","DDD-CC+A-BB"]},{"n":177,"l":11,"a":["A*A*BB^A*CC","A*BB*A^A*CC","BB*A*A^A*CC","A*CC^A*A*BB","CC*A^A*A*BB","A*CC^BB*A*A"]},{"n":178,"l":10,"a":["DDD-A*A-CC","DDD-A*A^CC","A*A^DDD-CC"]},{"n":179,"l":10,"a":["BB*BB-BB-A","BB*BB-A-BB","A*CC-BB-BB","CC*A-BB-BB"]},{"n":180,"l":10,"a":["A*BB+CC+CC","BB*A+CC+CC","CC+CC+A*BB","CC+CC+BB*A","A*CC-A*A*A","CC*A-A*A*A"]},{"n":181,"l":9,"a":["DDD-CC^BB","BB^DDD-CC"]},{"n":182,"l":8,"a":["BB*BB-BB"]},{"n":183,"l":9,"a":["DDD-BB^CC"]},{"n":184,"l":7,"a":["CC/A<<A"]},{"n":185,"l":10,"a":["A+CC%BB*BB","BB*BB-BB+A","A+BB*BB-BB","BB*BB+A-BB"]},{"n":186,"l":10,"a":["DDD-A/A-CC","DDD-A/A^CC","A/A^DDD-CC"]},{"n":187,"l":6,"a":["DDD-CC"]},{"n":188,"l":10,"a":["DDD-CC+A/A","A/A+DDD-CC","DDD+A/A-CC"]},{"n":189,"l":10,"a":["DDD-CC+A^A","A+DDD-CC^A","DDD+A-CC^A","A+A^DDD-CC"]},{"n":190,"l":8,"a":["DDD-CC+A","A+DDD-CC","DDD+A-CC"]},{"n":191,"l":9,"a":["DDD-CC|BB","BB|DDD-CC"]},{"n":192,"l":6,"a":["A<<A+A"]},{"n":193,"l":7,"a":["BB^A*CC","BB^CC*A","BB*BB-A","A*CC-BB","A*CC^BB","CC*A-BB"]},{"n":194,"l":9,"a":["BB^A*CC-A","BB^A*CC^A","BB^CC*A-A","BB^CC*A^A","BB*BB-A^A","A*CC-BB^A"]},{"n":195,"l":8,"a":["A<<A+A^A","A<<A+A|A"]},{"n":196,"l":5,"a":["BB*BB"]},{"n":197,"l":8,"a":["CC|BB*BB","BB*BB|CC"]},{"n":198,"l":8,"a":["A*A^A*CC","A*A^CC*A","A*CC-A*A","A*CC^A*A","CC*A-A*A","CC*A^A*A"]},{"n":199,"l":7,"a":["A^BB*BB","A|BB*BB","A+BB*BB","BB*BB+A","BB*BB^A","BB*BB|A"]},{"n":200,"l":10,"a":["BB-A+BB<<A","BB+BB-A<<A","A*CC>>A<<A","CC*A>>A<<A","A+CC+CC^CC","CC+A+CC^CC"]},{"n":201,"l":8,"a":["A+A^A*CC","A+A^CC*A","A*CC-A-A","A*CC^A+A","CC*A-A-A","CC*A^A+A"]},{"n":202,"l":8,"a":["BB*BB^BB"]},{"n":203,"l":9,"a":["A*CC^BB/A"]},{"n":204,"l":6,"a":["A^A*CC","A^CC*A","A*CC-A","A*CC^A","CC*A-A","CC*A^A"]},{"n":205,"l":9,"a":["A*CC-BB%A","A*CC^BB&A","A*CC^BB%A","CC*A-BB%A","BB*BB+A*A","BB*BB^A*A"]},{"n":206,"l":8,"a":["BB*BB|BB","A/A^CC*A","A*CC-A/A","A*CC^A/A","CC*A-A/A","CC*A^A/A"]},{"n":207,"l":4,"a":["A*CC","CC*A"]},{"n":208,"l":8,"a":["A/A+A*CC","A*CC+A/A","CC*A+A/A"]},{"n":209,"l":8,"a":["A^A+A*CC","A^A*CC+A","A^CC*A+A","A+A*CC^A","A+CC*A^A","A*CC+A^A"]},{"n":210,"l":6,"a":["A+A*CC","A+CC*A","A*CC+A","CC*A+A"]},{"n":211,"l":8,"a":["A+A*CC|A","A+CC*A|A","A*CC+A|A","CC*A+A|A"]},{"n":212,"l":10,"a":["A+A^A*CC+A","A+A^CC*A+A","A*A*A^CC*A","A*CC^A*A*A","CC*A^A*A*A","A+A*CC^A+A"]},{"n":213,"l":8,"a":["A+A*CC+A","A+CC*A+A","A*CC+A+A","CC*A+A+A"]},{"n":214,"l":8,"a":["DDD-BB*A","DDD-A*BB"]},{"n":215,"l":9,"a":["A<<A^CC*A","A*CC^A<<A","CC*A^A<<A","A+A*CC|CC","A+CC*A|CC","A*CC+A|CC"]},{"n":216,"l":8,"a":["A*A+A*CC","A*A*A<<A","A*A+CC*A","A*CC+A*A","CC*A+A*A"]},{"n":217,"l":10,"a":["DDD-BB*A+A","DDD-A*BB+A","A+DDD-BB*A","DDD+A-BB*A"]},{"n":218,"l":9,"a":["BB-A+CC*A","A*CC-A+BB","CC*A-A+BB","BB+A*CC-A","BB+CC*A-A","A*CC+BB-A"]},{"n":219,"l":10,"a":["CC/A+BB*BB","A*A^A*CC+A","A*A^CC*A+A","A^A*CC+A*A","A^CC*A+A*A","A+A*CC^A*A"]},{"n":220,"l":9,"a":["BB^A*CC+A","BB^CC*A+A","A+A*CC^BB","A+CC*A^BB","A*CC+A^BB","CC*A+A^BB"]},{"n":221,"l":7,"a":["BB+A*CC","BB+CC*A","A*CC+BB","CC*A+BB"]},{"n":222,"l":9,"a":["A^BB+A*CC","A+BB^A*CC","BB+A^A*CC","A^BB+CC*A","A+BB^CC*A","BB+A^CC*A"]},{"n":223,"l":9,"a":["A|BB+A*CC","A+BB|A*CC","BB+A|A*CC","A+BB|CC*A","BB+A|CC*A","CC/A|CC*A"]},{"n":224,"l":8,"a":["BB+BB<<A"]},{"n":225,"l":11,"a":["DDD-BB-BB-A","DDD-BB-A-BB","DDD-BB-A^BB","DDD-A-BB-BB","DDD-A-BB^BB","DDD-A^BB+BB"]},{"n":226,"l":11,"a":["A+A*BB^CC*A","A+BB*A^CC*A","A*BB+A^CC*A","BB*A+A^CC*A","A*CC^A+A*BB","CC*A^A+A*BB"]},{"n":227,"l":10,"a":["A^BB+BB<<A","A|BB+BB<<A","BB+BB<<A^A","BB+BB<<A|A"]},{"n":228,"l":9,"a":["DDD-BB-BB"]},{"n":229,"l":9,"a":["A*BB^A*CC","BB*A^A*CC","A*BB^CC*A","BB*A^CC*A","A*CC^BB*A","A*CC^A*BB"]},{"n":230,"l":9,"a":["CC/A+A*CC","CC/A+CC*A","A*CC+CC/A","CC*A+CC/A"]},{"n":231,"l":11,"a":["BB^DDD-CC/A","DDD-BB-BB+A","DDD-BB-BB^A","DDD-BB-BB|A","DDD-CC/A^BB","A^DDD-BB-BB"]},{"n":232,"l":11,"a":["CC/A+A+A<<A","A+CC/A+A<<A","A*BB-A^CC*A","BB*A-A^CC*A","A*CC^BB*A-A","A*CC^A*BB-A"]},{"n":233,"l":8,"a":["DDD-CC/A"]},{"n":234,"l":10,"a":["A*A*A+A*CC","DDD-CC/A^A","CC/A^DDD-A","A*CC+A*A*A","CC*A+A*A*A"]},{"n":235,"l":10,"a":["BB+BB+CC*A","BB+A*CC+BB","BB+CC*A+BB","A*CC+BB+BB","CC*A+BB+BB","DDD-CC/A|A"]},{"n":236,"l":10,"a":["A+DDD-CC/A","DDD+A-CC/A","DDD-CC/A+A","DDD-BB-A-A","DDD-BB-A^A","DDD-A-BB-A"]},{"n":237,"l":11,"a":["DDD-CC/A|CC"]},{"n":238,"l":10,"a":["A*BB^BB*BB","BB*A^BB*BB","A*BB|BB*BB","BB*A|BB*BB","A*BB+BB*BB","BB*A+BB*BB"]},{"n":239,"l":8,"a":["DDD-BB-A","DDD-A-BB"]},{"n":240,"l":10,"a":["A+A*A*A<<A","A*A*A+A<<A","DDD-A^BB^A","BB^DDD-A^A","DDD-A^A^BB","A^DDD-A^BB"]},{"n":241,"l":8,"a":["DDD-BB^A","A^DDD-BB"]},{"n":242,"l":6,"a":["DDD-BB"]},{"n":243,"l":8,"a":["DDD-BB|A","DDD-A^BB","A|DDD-BB","BB^DDD-A"]},{"n":244,"l":9,"a":["DDD-A*A-A","DDD-A*A^A","DDD-A-A*A","DDD-A^A*A","A^DDD-A*A","A*A^DDD-A"]},{"n":245,"l":8,"a":["DDD-BB+A","A+DDD-BB","DDD+A-BB"]},{"n":246,"l":10,"a":["A^DDD-BB+A","DDD-BB|A+A","DDD-A^BB-A","DDD-BB+A^A","A+DDD-BB^A","DDD+A-BB^A"]},{"n":247,"l":7,"a":["DDD-A*A"]},{"n":248,"l":10,"a":["A+BB+BB<<A","CC-BB^A*CC","CC-BB^CC*A","A^DDD-BB/A","DDD-BB+A+A","A+DDD-BB+A"]},{"n":249,"l":9,"a":["A*BB+A*CC","BB*A+A*CC","A*BB+CC*A","BB*A+CC*A","A*CC+A*BB","CC*A+A*BB"]},{"n":250,"l":7,"a":["DDD-A-A"]},{"n":251,"l":9,"a":["DDD-A-A|A","DDD-A^A+A","A|DDD-A-A","A+A^DDD-A"]},{"n":252,"l":9,"a":["DDD-BB^BB","BB^DDD-BB","DDD-A-A/A","DDD-A^A/A","A^DDD-A/A","DDD-A/A-A"]},{"n":253,"l":5,"a":["DDD-A"]},{"n":254,"l":7,"a":["DDD-A^A","A^DDD-A"]},{"n":255,"l":7,"a":["DDD-A/A","DDD-A|A","A|DDD-A"]},{"n":256,"l":3,"a":["DDD"]},{"n":257,"l":7,"a":["A/A+DDD","A/A^DDD","A/A|DDD","DDD+A/A","DDD^A/A","DDD|A/A"]},{"n":258,"l":8,"a":["A&BB^DDD","A&BB|DDD","BB&A^DDD","BB&A|DDD","BB%A+DDD","BB%A^DDD"]},{"n":259,"l":5,"a":["A+DDD","A^DDD","A|DDD","DDD+A","DDD^A","DDD|A"]},{"n":260,"l":8,"a":["DDD^BB/A","DDD|BB/A"]},{"n":261,"l":9,"a":["A^A+A+DDD","A^A+A^DDD","A^A+A|DDD","A+A^A+DDD","A+A^A^DDD","A+A^A|DDD"]},{"n":262,"l":7,"a":["A+A+DDD","A+A^DDD","A+A|DDD","A+DDD+A","DDD+A+A","DDD^A+A"]},{"n":263,"l":9,"a":["A+A|A+DDD","A+A|A^DDD","A+A|A|DDD","A+A+DDD|A","A+A^DDD|A","A+A|DDD+A"]},{"n":264,"l":9,"a":["CC>>A^DDD","CC>>A|DDD"]},{"n":265,"l":7,"a":["A*A+DDD","A*A^DDD","A*A|DDD","DDD+A*A","DDD^A*A","DDD|A*A"]},{"n":266,"l":9,"a":["A^A*A+DDD","A^A*A^DDD","A^A*A|DDD","A*A^A+DDD","A*A^A^DDD","A*A^A|DDD"]},{"n":267,"l":8,"a":["BB-A+DDD","BB-A^DDD","BB-A|DDD","DDD-A+BB","BB+DDD-A","DDD+BB-A"]},{"n":268,"l":9,"a":["A+A*A+DDD","A+A*A^DDD","A+A*A|DDD","A*A+A+DDD","A*A+A^DDD","A*A+A|DDD"]},{"n":269,"l":8,"a":["A^BB+DDD","A^BB^DDD","A^BB|DDD","BB^A+DDD","BB^A^DDD","BB^A|DDD"]},{"n":270,"l":6,"a":["BB+DDD","BB^DDD","BB|DDD","DDD+BB","DDD^BB","DDD|BB"]},{"n":271,"l":8,"a":["A|BB+DDD","A|BB^DDD","A|BB|DDD","BB|A+DDD","BB|A^DDD","BB|A|DDD"]},{"n":272,"l":10,"a":["CC>>A/A<<A"]},{"n":273,"l":8,"a":["A+BB+DDD","A+BB^DDD","A+BB|DDD","BB+A+DDD","BB+A^DDD","BB+A|DDD"]},{"n":274,"l":10,"a":["A^A+BB+DDD","A^A+BB^DDD","A^A+BB|DDD","A^BB+A+DDD","A^BB+A^DDD","A^BB+A|DDD"]},{"n":275,"l":10,"a":["A|BB+A+DDD","A|BB+A^DDD","A|BB+A|DDD","A+BB|A+DDD","A+BB|A^DDD","A+BB|A|DDD"]},{"n":276,"l":7,"a":["CC+A*CC","CC+CC*A","A*CC+CC","CC*A+CC"]},{"n":277,"l":11,"a":["A/A^CC+A*CC","A/A^CC*A+CC","A/A+A*CC+CC","A*CC+A/A+CC","CC*A+A/A+CC"]},{"n":278,"l":11,"a":["BB^A<<A^DDD","BB^A<<A|DDD","A<<A^BB+DDD","A<<A^BB^DDD","A<<A^BB|DDD","A<<A^DDD+BB"]},{"n":279,"l":8,"a":["CC/A+DDD","CC/A^DDD","CC/A|DDD"]},{"n":280,"l":8,"a":["A<<A^DDD","A<<A|DDD","DDD^A<<A","DDD|A<<A"]},{"n":281,"l":11,"a":["BB-A+BB+DDD","BB-A+BB^DDD","BB-A+BB|DDD","CC/A^BB+DDD","CC/A^BB^DDD","CC/A^BB|DDD"]},{"n":282,"l":10,"a":["CC/A+A+DDD","CC/A+A^DDD","CC/A+A|DDD","A+CC/A+DDD","A+CC/A^DDD","A+CC/A|DDD"]},{"n":283,"l":9,"a":["A*A*A+DDD","A*A*A^DDD","A*A*A|DDD","DDD+A*A*A","DDD^A*A*A","DDD|A*A*A"]},{"n":284,"l":9,"a":["BB+BB+DDD","BB+BB^DDD","BB+BB|DDD","BB+DDD+BB","DDD+BB+BB","DDD^BB+BB"]},{"n":285,"l":11,"a":["A*A^CC+CC*A","A*A^A*CC+CC","A*A^CC*A+CC","A*A+A*CC+CC","A*A+CC*A+CC","A*CC+A*A+CC"]},{"n":286,"l":10,"a":["BB|CC+CC*A","CC+A*CC|BB","CC+CC*A|BB","A*CC+CC|BB","CC*A+CC|BB"]},{"n":287,"l":11,"a":["A^BB+BB+DDD","A^BB+BB^DDD","A^BB+BB|DDD","BB^A+BB+DDD","BB^A+BB^DDD","BB^A+BB|DDD"]},{"n":288,"l":7,"a":["A*A<<CC"]},{"n":289,"l":11,"a":["A*A<<CC^A/A","A*A<<CC|A/A"]},{"n":290,"l":10,"a":["BB+CC+A*CC","CC+BB+A*CC","BB+CC+CC*A","CC+BB+CC*A","BB+A*CC+CC","BB+CC*A+CC"]},{"n":291,"l":9,"a":["A^A*A<<CC","A*A<<CC^A","A*A<<CC|A"]},{"n":292,"l":11,"a":["BB^A*BB+DDD","BB^A*BB^DDD","BB^A*BB|DDD","A*BB^BB+DDD","A*BB^BB^DDD","A*BB^BB|DDD"]},{"n":293,"l":11,"a":["CC/A+BB+DDD","CC/A+BB^DDD","CC/A+BB|DDD","BB+CC/A+DDD","BB+CC/A^DDD","BB+CC/A|DDD"]},{"n":294,"l":11,"a":["A*A<<CC^A+A","A*A<<CC|A+A"]},{"n":295,"l":10,"a":["A*BB-A+DDD","A*BB-A^DDD","A*BB-A|DDD","BB*A-A+DDD","BB*A-A^DDD","BB*A-A|DDD"]},{"n":296,"l":10,"a":["CC/A+BB<<A","BB+CC/A<<A"]},{"n":297,"l":10,"a":["A^A*BB+DDD","A^A*BB^DDD","A^A*BB|DDD","A^BB*A+DDD","A^BB*A^DDD","A^BB*A|DDD"]},{"n":298,"l":8,"a":["A*BB+DDD","A*BB^DDD","A*BB|DDD","BB*A+DDD","BB*A^DDD","BB*A|DDD"]},{"n":299,"l":10,"a":["A|BB*A+DDD","A|BB*A^DDD","A|BB*A|DDD","A*BB|A+DDD","A*BB|A^DDD","A*BB|A|DDD"]},{"n":300,"l":12,"a":["A+A^A*BB+DDD","A+A^A*BB^DDD","A+A^A*BB|DDD","A*BB^A+A+DDD","A*BB^A+A^DDD","A*BB^A+A|DDD"]}]
		     .map(Code.nla);
	}
	
	var stringsTrue = ["\"\"+!![]", "!![]+\"\"", "\"\"+!!{}", "!!{}+\"\"", "!!_+\"\"", "\"\"+!!_"];
	var stringsFalse = ["\"\"+![]", "![]+\"\"", "\"\"+!{}", "!{}+\"\"", "!_+\"\"", "\"\"+!_"];
	var stringsObject = ["\"\"+{}", "{}+\"\""];
	var stringsUndefined = ["\"\"+{}._", "{}._+\"\"", "\"\"+[]._", "[]._+\"\"", "_._+\"\"", "\"\"+_._"];
	var stringsRegExpEEEE = ["\"\"+/_/[EEEE]", "\"\"+/^/[EEEE]", "\"\"+/$/[EEEE]", "\"\"+/./[EEEE]", "/_/[EEEE]+\"\"", "/^/[EEEE]+\"\"", "/$/[EEEE]+\"\"", "/./[EEEE]+\"\""];
	
	R.a = function() { return "(" + rndItem(stringsFalse) + ")[" + Rn[1].g() + "]"; };
	R.b = function() { return "(" + rndItem(stringsObject) + ")[" + Rn[2].g() + "]"; };
	R.c = function() { return "(" + rndItem(stringsObject) + ")[" + Rn[5].g() + "]"; };
	R.d = function() { return "(" + rndItem(stringsUndefined) + ")[" + Rn[2].g() + "]"; };
	R.e = function() { return "(" + rndItem(stringsUndefined) + ")[" + Rn[3].g() + "]"; };
	R.f = function() { return "(" + rndItem(stringsUndefined) + ")[" + Rn[4].g() + "]"; };
	R.o = function() { return "(" + rndItem(stringsObject) + ")[" + Rn[1].g() + "]"; };
	R.n = function() { return "(" + rndItem(stringsUndefined) + ")[" + Rn[1].g() + "]"; };
	R.s = function() { return "(" + rndItem(stringsFalse) + ")[" + Rn[3].g() + "]"; };
	R.t = function() { return "(" + rndItem(stringsTrue) + ")[" + Rn[0].g() + "]"; };
	R.r = function() { return "(" + rndItem(stringsTrue) + ")[" + Rn[1].g() + "]"; };
	R.u = function() { return "(" + rndItem(stringsUndefined) + ")[" + Rn[0].g() + "]"; };
	R.i = function() { return "(" + rndItem(stringsUndefined) + ")[" + Rn[5].g() + "]"; };
	var cons = [];
	cons.push(R.c(), R.o(), R.n(), R.s(), R.t(), R.r(), R.u(), R.c(), R.t(), R.o(), R.r());
	R.constr = cons.join("+");
	R.x = function() { return "(" + rndItem(stringsRegExpEEEE) + ")[" + Rn[11+2].g() + "]"; };
	
	for(var i in Rn) {
		// R[i] = Rn[i];
	}
	
	// beginning
	out += "A=" + br[0] + ",BB=" + br[1] + ",CC=" + br[2] + ",DDD=" + br[3] + ";";
	out += "EEEE=" + R.constr + ";FFFF=[][EEEE][EEEE],JJJJ=\"\\\\\"+"+R.x()+",GGGG="+R.r()+"+"+R.e()+"+"+R.t()+"+"+R.u()+"+"+R.r()+"+"+R.n()+"+\" \""+";";
	
	// String.fromCharCode
	out += "IIII=FFFF(FFFF(GGGG+\"\\\"\"+GGGG+JJJJ+(" + Rn[5].g() + ")+(" + Rn[3].g() + ")+" + R.t() + "+" + R.r() + "+" + R.i() + "+" + R.n() + "+JJJJ+(" + Rn[6].g() + ")+(" + Rn[7].g() + ")+\".\"+"
	     + R.f() + "+" + R.r() + "+" + R.o() + "+JJJJ+(" + Rn[6].g() + ")+" + R.d() + "+JJJJ+(" + Rn[4].g() + ")+(" + Rn[3].g() + ")"
	     + "+JJJJ+(" + Rn[6].g() + ")+(" + Rn[8].g() + ")+" + R.a() + "+" + R.r() + "+JJJJ+(" + Rn[4].g() + ")+(" + Rn[3].g() + ")+" + R.o() + "+" + R.d() + "+" + R.e() + "+\";\\\";\"";
	out += ")())();";
	
	// source string conversion
	var rn256Precoder = (Rn[256].a.length == 1 && Rn[256].a[0] == "DDD") ? Rn[256].g() : "(" + Rn[256].g() + ")";
	var mappingStrFunction = function(chr) {
		var ch = chr.charCodeAt(0);
		if(ch <= 256) {
			return Rn[ch].g();
		}
		else {
			return rn256Precoder + "*("+Rn[ch>>8].g()+")+("+Rn[ch%256].g()+")";
		}
	};
	out += "HHHH=IIII(";
	out += str.split("").map(mappingStrFunction).join(",");
	if(!opt.withParam) {
		out += ");FFFF(HHHH)();";
	}
	else {
		out += ");FFFF(HHHH)[IIII(" + "call".split("").map(mappingStrFunction).join(",") + ")](PPPP);";
	}
	
	// cleanup
	if(opt.cleanUp && !opt.strictMode) {
		out += "HHHH=IIII(";
		out += "var a=\"_|__|_$|___|__$|_$_|_$$|____|___$|__$_|__$$|_$__|_$_$|_$$_|_$$$|$___|$__$|$_$_|$_$$|$$__|$$_$|$$$_|$$$$\".split(\"|\");for(var i in a)delete window[a[i]];".split("").map(mappingStrFunction).join(",");
		out += ");FFFF(HHHH)();";
	}
	if(opt.withParam && !opt.strictMode) {
		out += "//PPPP";
	}
	
	// replacements
	var sp3 = ["___", "__$", "_$_", "_$$"];
	var sp4 = ["____", "___$", "__$_", "__$$", "_$__", "_$_$", "_$$_", "_$$$", "$___", "$__$", "$_$_", "$_$$", "$$__", "$$_$", "$$$_", "$$$$"];
	var replaced = ["A", "BB", "CC", "DDD"];
	if(Math.random() < 0.5) {
		var replacement = ["_", "_$", "__", spliceRandomItem(sp3)];
	}
	else {
		var replacement = ["_", "__", "_$", spliceRandomItem(sp3)];
	}
	sp4 = sp4.concat(sp3);
	replaced = replaced.concat(["EEEE", "FFFF", "GGGG", "HHHH", "IIII", "JJJJ"]);
	if(opt.withParam) {
		replaced = replaced.concat(["PPPP"]);
	}
	for(var i=4; i<replaced.length; i++) {
		replacement.push(spliceRandomItem(sp4));
	}
	for(var i=0; i<replaced.length; i++) {
		out = out.replace(new RegExp(replaced[i], "g"), replacement[i].replace(/\$/g, "$$$$"));
	}
	
	// options
	if(opt.strictMode) {
		if(opt.withParam) {
			var lastReplacement = replacement[replacement.length - 1];
			out = "((" + replacement.reverse().join(",") + ")=>{" + out + "})(" + lastReplacement + ");";
		}
		else {
			out = "((" + replacement.join(",") + ")=>{" + out + "})();";
		}
	}
	
	return out;
}

function zzencodeCall() {
	// if calculated-var-values object doesnt exist, use default
	if(document.getElementById("calculated-var-values").value.length > 0) {
		var cvvobj = JSON.parse(document.getElementById("calculated-var-values").value);
		document.getElementById("encoded").value = zzencode(document.getElementById("decoded").value, {
			strictMode: !!document.getElementById("strict-mode").checked,
			cleanUp: !!document.getElementById("clean-up").checked,
			withParam: !!document.getElementById("with-param").checked,
			Rn: cvvobj.Rn,
			b: cvvobj.b,
			br: cvvobj.br
		});
	}
	else {
		document.getElementById("encoded").value = zzencode(document.getElementById("decoded").value, {
			strictMode: !!document.getElementById("strict-mode").checked,
			cleanUp: !!document.getElementById("clean-up").checked,
			withParam: !!document.getElementById("with-param").checked
		});
	}
}

function calcValuesCall() {
	var b = document.getElementById("var-values").value.split(",").map(function(_) { return parseInt(_, 10); });
	var f = ["A", "BB", "CC", "DDD"];
	
	// generate br, representations of initial numbers
	var br = [];
	var genInitNumX = function(x) {
		// if x==0, use !![]==1 as initial value
		// otherwise use previously calculated b/f values
		var brr = [], k=0, iterations=5;
		var prevBr = x == 0 ? [] : f.slice(0, x);
		if(x == 0) {
			brr[1] = new Code(1, ["!![]"]);
			brr[1].l = 700;
		}
		else {
			for(var i=0; i<prevBr.length; i++) {
				brr[b[i]] = new Code(b[i], [prevBr[i]]);
			}
		}
		while(k < iterations && !brr[b[x]]) {
			brr = algCodes(brr, x == 0 ? [0, 1] : b.slice(0, x), {
				f: x != 0 ? prevBr : ["![]", "!![]"]
			});
			k++;
		}
		return brr;
	};
	
	// 4 values of br[]
	for(var i=0; i<4; i++) {
		var brr = genInitNumX(i);
		if(brr[b[i]]) {
			br.push(brr[b[i]].g());
		}
		else {
			document.getElementById("encoded").value += "stage " + (1+i) + " fail\n";
			return;
		}
	}
	
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
	
	document.getElementById("encoded").value += "weighted compactness: " + outputValue + "\n";
	document.getElementById("calculated-var-values").value = JSON.stringify({ 
		Rn : arr,
		b : b,
		br : br
	});
}