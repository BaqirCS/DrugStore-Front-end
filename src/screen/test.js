import React from 'react';
function Test() {
  const deleteHandler = () => {
    console.log('you said yes');
  };

  return (
    <div>
      <div className="bd-example">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModalLive"
        >
          delete
        </button>
      </div>
      <div className="modal" tabIndex={-1} role="dialog" id="exampleModalLive">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Do you realy wants to delete this record?
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className="modal-body m-auto">
              <button
                type="button"
                id="newID"
                className="btn btn-primary "
                onClick={deleteHandler}
                style={{ marginRight: '10px' }}
                data-bs-dismiss="modal"
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
