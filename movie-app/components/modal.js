import React, {Component} from 'react';

class Modal extends Component {

    constructor(props) {
        super(props);
        this.closeButton = null;
    }

    closeModal = () => {
        this.closeButton.click();
    }

    onSubmit = () => {
        // Close Modal
        this.closeModal();
    }
    render() {

        return (
            <div>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Upload Movie
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.props.children}
                            </div>
                            <div className="modal-footer">
                                <button ref={(element) => {
                                    this.closeButton = element
                                }} type="button" className="btn btn-secondary" data-dismiss="modal">Close
                                </button>
                                {
                                    this.props.hasSubmit && <button type="button" className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;