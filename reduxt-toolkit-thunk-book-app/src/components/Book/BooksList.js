import React from "react";

const BooksList = ({ isLoading, books, isLoggedIn, dispatch, deleteBook, getBookId }) => {
  const bookList =
    books.length > 0 ? (
      books.map((book) => (
        <li
          className="list-group-item d-flex  justify-content-between align-items-center"
          key={book.id}
        >
          <div>{book.title}</div>
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-primary" onClick={() => getBookId(book.id)}>
              Read
            </button>
            <button
              type="button"
              className="btn btn-danger"
              disabled={!isLoggedIn}
              onClick={() =>
                dispatch(deleteBook(book))
                  .unwrap()
                  .then((originalPromiseResult) => {
                    console.log(originalPromiseResult);
                  })
                  .catch((rejectedValueOrSerializedError) => {
                    console.log(rejectedValueOrSerializedError);
                  })
              }
            >
              Delete
            </button>
          </div>
        </li>
      ))
    ) : (
      <div className="alert alert-secondary" role="alert">
        There is no book available. Please add one!
      </div>
    );
  return (
    <div>
      <h2>Books List</h2>
      {isLoading ? (
        <span>Loading ...</span>
      ) : (
        <ul className="list-group">{bookList}</ul>
      )}
    </div>
  );
};

export default BooksList;
