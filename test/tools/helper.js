define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;
var fs = require("wilton/fs"),
    htmlparser2 = require("htmlparser2"),
    DomUtils = htmlparser2.DomUtils,
    CSSselect = require("css-select/");

// TODO: fixme 
var basePath = "/home/alex/projects/wilton/wilton_modules/css-select/test/";
function getDOMFromPath(path, options){
	return htmlparser2.parseDOM(fs.readFile({path: basePath + path}), options);
}

module.exports = {
	CSSselect: CSSselect,
	getFile: function(name, options){
		return getDOMFromPath(name, options);
	},
	getDOMFromPath: getDOMFromPath,
	getDOM: htmlparser2.parseDOM,
	getDefaultDom: function(){
		return htmlparser2.parseDOM(
			"<elem id=foo><elem class='bar baz'><tag class='boom'> This is some simple text </tag></elem></elem>"
		);
	},
	getDocument: function(path){
		var document = getDOMFromPath(path);

		document.getElementsByTagName = function(name){
			return DomUtils.getElementsByTagName("*", document);
		};
		document.getElementById = function(id){
			return DomUtils.getElementById(id, document);
		};
		document.createTextNode = function(content){
			return {
				type: "text",
				data: "content"
			};
		};
		document.createElement = function(name){
			return {
				type: "tag",
				name: name,
				children: [],
				attribs: {}
			};
		};
		document.body = DomUtils.getElementsByTagName("body", document, true, 1)[0];
		document.documentElement = document.filter(DomUtils.isTag)[0];

		return document;
	}
};

return module.exports;});
