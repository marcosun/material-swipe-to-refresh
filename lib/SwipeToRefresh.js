import React from 'react';
import {
  object,
  node,
} from 'prop-types';
import {withStyles} from 'material-ui';

const styles = (theme) => ({

});

@withStyles(styles)
/**
 * Swipe to refresh
 */
export default class Component extends React.Component {
  static propTypes = {
    classes: object,
    children: node,
  };

  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
  }

  /**
   * @param {Event} e
   */
  touchStartHandler(e) {
    // console.log('touchStart');
    // console.log(e.changedTouches);
  }

  /**
   * @param {Event} e
   */
  touchMoveHandler(e) {
    console.log('touchMove');
    console.log(e.changedTouches);
  }

  /**
   * @param {Event} e
   */
  touchEndHandler(e) {
    // console.log('touchEnd');
    // console.log(e);
  }

  /**
   * @param {Event} e
   */
  touchCancelHandler(e) {
    // console.log('touchCancel');
    // console.log(e);
  }

  /**
   * @return {Component}
   */
  render() {
    const {
      classes,
      children,
    } = this.props;

    return (
      <div
        
        onTouchStart={this.touchStartHandler.bind(this)}
        onTouchMove={this.touchMoveHandler.bind(this)}
        onTouchEnd={this.touchEndHandler.bind(this)}
        onTouchCancel={this.touchCancelHandler.bind(this)}
      >
        {children}
      </div>
    );
  }
}
