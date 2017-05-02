var expect = require("chai").expect;
var book = require("../public/books");

describe("Book module", () => {
    it("get returns requested book", function() {
        var result = book.get("dune");
        expect(result).to.deep.equal({title: "dune", author: "frank herbert", pubdate:1969});
    });
    
    it("get fails with invalid book", () => {
        var result = book.get("fake");
        expect(result).to.be.undefined;
    });
});

describe("Book module", () => {
    it("add adds book to array", function() {
        book.add("stardust");
        var result = book.get("stardust");
        expect(result).to.deep.equal({title : "stardust", author : "unknown", pubdate : "unknown"});
    });
    
    it("get fails if no characters entered", () => {
        book.add("");
        var result = book.get("");
        expect(result).to.be.undefined;
    });
});

describe("Book module", () => {
    it("delete deletes book from array", () => {
		book.cut("dune");
		var result = book.get("dune");
		expect(result).to.be.undefined;
	});
	
	it("delete does nothing w/o finding requested book", () => {
		var result = book.cut("fake").length;
		expect(result).to.equal(6);
		
	});
});