import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import BookAction from '../../store/actions/BookAction';
import ActionCreators from '../../store/effects/BookEffects';
import { selectCount, selectCurrentPage, selectPageSize } from '../../store/selectors/CommonSelector';
import PropTypes from "prop-types";
import './styles.css'
import ReactPaginate from 'react-paginate';
import CommonAction from "../../store/actions/CommonAction";
import CommonEffects from "../../store/effects/CommonEffects";

class Pagination extends PureComponent {
  static propTypes = {
    bookCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    getPaginatedBooks:PropTypes.func.isRequired,
    getCurrentPage: PropTypes.func.isRequired
  };
  handlePageClick = data =>{
    const {getCurrentPage} = this.props;
    getCurrentPage(data.selected+1)
  };
  render() {
    const {pageSize,ItemCount} = this.props;
    const pagesCount = Math.ceil(ItemCount / pageSize);
    return (
        <div className="center">
          <h3>Our Books</h3>
          <ReactPaginate
              previousLabel={'chevron_left'}
              nextLabel={'chevron_right'}
              nextLinkClassName={'material-icons'}
              previousLinkClassName={'material-icons'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pagesCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={this.handlePageClick}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
          />
        </div>

    );
  }
}
const bookActions = new BookAction();
const actionCreators = new ActionCreators(bookActions);
const commonAction = new CommonAction();
const commonEffects = new CommonEffects(commonAction);

const mapStateToProps = (state) => ({
  currentPage: selectCurrentPage(state),
  pageSize: selectPageSize(state),
  ItemCount: selectCount(state),

});
const mapDispatchToProps = (dispatch) => ({
  getCurrentPage: (page) => {
    dispatch(commonAction.getCurrentPage(page));
  },
  getPaginatedBooks: (count, size) => { dispatch(actionCreators.getPaginatedBooks(count, size)); },
});
export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
