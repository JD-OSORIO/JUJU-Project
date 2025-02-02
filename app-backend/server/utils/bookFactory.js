class BookFactory {
    static createBook(data, userId) {
        return {
            title: data.title,
            author: data.author,
            yearPublished: data.yearPublished,
            bookStatus: data.bookStatus ?? true,
            owner: userId
        };
    }
}

module.exports = BookFactory;