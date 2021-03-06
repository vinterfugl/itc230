let books = [
    {title : "dune", author : "frank herbert", pubdate : 1969},
    {title : "it", author : "stephen king", pubdate : 1975},
    {title : "moby dick", author : "herman melville", pubdate : 1851},
    {title : "american gods", author : "niel gaiman", pubdate : 2001},
    {title : "the great gatsby", author : "f scott fitzgerald", pubdate : 1925},
    {title : "the irony of american history", author : "reinhold niebuhr", pubdate : 1951},
	{title: "stardust", author: "niel gaiman", pubdate: 1996},
	{title: "the abolition of man", author: "c s lewis", pubdate: "1937"},
];

var totalBooks = books.length;

let get = (title) => {
    return books.find((item) => {
        return item.title == title; 
    });
}

let cut = (title) => {
    i = books.indexOf(get(title));
    if (i < 0) {
        return books;
    } else {
    return books.splice(i, 1);
    }
}

let add = (title) => {
    if (title.length < 1) {
            return books;
    } else {
    return books.push({title : title, author : "unknown", pubdate : "unknown"});
    }
}

exports.get = (title) => {
    return books.find((item) => {
        return item.title == title;
    });
}

exports.cut = (title) => {
    i = books.indexOf(get(title));
    if (i < 0) {
        return books;
    } else {
    return books.splice(i, 1);
    }
}

exports.add = (title) => {
    if (title.length < 1) {
            return books;
    } else {
    return books.push({title : title, author : "unknown", pubdate : "unknown"});
    }
}

exports.counter = function() {
    return books.length;
}

exports.allBooks = books;