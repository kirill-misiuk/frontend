import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import {Link} from 'react-router-dom';

class BookListItem extends PureComponent {
  static propTypes = {
    book: PropTypes.object.isRequired
  };
  state = {
    isMouseOver: false,
    imgClassName:"dashboard-item-image"
  };

  handleMouseOver = () => this.setState({isMouseOver: true});

  handleMouseLeave = () => this.setState({isMouseOver: false});


  render() {
    const {book} = this.props;
    let {isMouseOver,imgClassName} = this.state;
    if(isMouseOver){
      imgClassName ="dashboard-item-image-hover"
    }
    return (
        <div className="dashboard-item" onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
          <img

             src='data:image/png;base64,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'
             //  src='https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500'
              className={imgClassName}
              alt=""
              width="293"
              height="293"
          />
          {isMouseOver && (
              <div className="additional-info">
                <div className="icon-container">
                  <Link to={`/books/${book._id}`}>
                  <i className="fas fa-info-circle fa-2x info-icon" />
                  </Link>
                  <i className="fas fa-trash-alt fa-2x trash-icon"/>
                  <i className="fas fa-edit fa-2x edit-icon"/>
                </div>
                <div>
                </div>
              </div>
          )}
        </div>
    );
  }
}
export default BookListItem;
