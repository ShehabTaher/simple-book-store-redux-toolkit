import React, { Fragment } from "react";

const BookInfo = ({ selectedBook }) => {

  console.log(selectedBook);
  return (
    <Fragment>
      <h2>Book Details</h2>
      {selectedBook.length > 0 ? (
        <div>
          <p className='fw-bold'>Title: {selectedBook.title}</p>
          <p className='fw-light'>Description: {selectedBook.description}</p>
          <p className='fst-italic'>Price: {selectedBook.price}</p>
        </div>
      ) : (
        <div className="alert alert-secondary" role="alert">
          There is no book selected yet. Please select!
        </div>
      )}

      {/* <div>
        <p className='fw-bold'>Title:</p>
        <p className='fw-light'>Description:</p>
        <p className='fst-italic'>Price:</p>
      </div> */}
    </Fragment>
  );
};

export default BookInfo;
