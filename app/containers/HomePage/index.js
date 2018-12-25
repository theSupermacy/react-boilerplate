/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import PropTypes from 'prop-types';
import { reducer, fetchUserRequest } from './Redux';
import saga from './saga';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  constructor(params) {
    super(params);
    console.log(this);
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  getUserCard() {
    const userCardsArray = [];
    /* eslint-disable */
    for (const singleData of this.props.payload) {
      console.log(singleData);
      const name = singleData.get('name');
      userCardsArray.push(
        <div>
          <span>{name}</span>
        </div>,
      );
      /* eslint-disable */
    }

    return userCardsArray;
  }

  render() {
    const { payload, fetching } = this.props;
    if (fetching) return <div>`I am Fetcig`</div>;
    if (payload) return <div>{this.getUserCard()}</div>;
    return null;
  }
}
HomePage.propTypes = {
  payload: PropTypes.object,
  fetching: PropTypes.bool,
  fetchUser: PropTypes.func.isRequired,
};
const mapStateToProps = state => {
  const homesState = state.get('home');
  return {
    fetching: homesState.get('fetching'),
    payload: homesState.get('payload'),
  };
};
const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUserRequest()),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'home', saga });
const withReducer = injectReducer({ key: 'home', reducer });

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(HomePage);
