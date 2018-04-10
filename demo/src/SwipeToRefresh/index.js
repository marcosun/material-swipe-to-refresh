import React from 'react';
import {object} from 'prop-types';
import {withStyles} from 'material-ui';
import {hot} from 'react-hot-loader';

import MaterialSwipeToRefresh from 'material-swipe-to-refresh';

const styles = (theme) => ({
  root: {
    width: '100vw',
    height: '100vh',
  },
  swipeToRefreshContainer: {
    overflow: 'scroll',
    width: '100%',
    height: '50vh',
    border: '1px solid blue',
    fontSize: '3rem',
  },
});

@hot(module)
@withStyles(styles)
/**
 * Swipe to refresh demo
 */
export default class Component extends React.Component {
  static propTypes = {
    classes: object,
  };

  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  /**
   * Hook onRefresh event
   */
  onRefresh() {
    this.setState({
      isLoading: true,
    });

    // Some asnyc functions
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 5000);
  }

  /**
   * @return {Component}
   */
  render() {
    const {
      classes,
    } = this.props;

    const {
      isLoading,
    } = this.state;

    return (
      <div className={classes.root}>
        <MaterialSwipeToRefresh
          onRefresh={this.onRefresh.bind(this)}
          isLoading={isLoading}
        >
          <div className={classes.swipeToRefreshContainer}>
            {
              Array(100).fill(1).map((item, index) => {
                return <div key={index}>Scroll Area</div>;
              })
            }
          </div>
        </MaterialSwipeToRefresh>
      </div>
    );
  }
}
