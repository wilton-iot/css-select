define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;
describe("nwmatcher", function(){
	require("css-select/test/nwmatcher/");
});

describe("sizzle", function(){
	describe("selector", function(){
		require("css-select/test/sizzle/selector");
	});
});

describe("qwery", function(){
	exportsRun(require("css-select/test/qwery/"));
});

function exportsRun(mod){
	Object.keys(mod).forEach(function(name){
		if(typeof mod[name] === "object") describe(name, function(){
				exportsRun(mod[name]);
			});
		else it(name, mod[name]);
	});
}

return module.exports;});
