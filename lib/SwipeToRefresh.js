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

    this.touchIdentifier = null;
    this.touchStartLocation = {
      pageX: 0,
      pageY: 0,
    };
    this.touchMoveLocation = {
      pageX: 0,
      pageY: 0,
    };
    this.touchEndLocation = {
      pageX: 0,
      pageY: 0,
    };
  }

  /**
   * Track movements of a single finger only.
   * Does not consider movements of any other fingers.
   * @param {Event} e
   */
  touchStartHandler(e) {
    if (this.touchIdentifier !== null) return;

    console.log('touchStart');

    const {
      identifier,
      pageX,
      pageY,
    } = e.changedTouches[0];

    this.touchIdentifier = identifier;
    this.touchStartLocation = {
      pageX,
      pageY,
    };
  }

  /**
   * @param {Event} e
   */
  touchMoveHandler(e) {
    const touchEvent = this.getTrackingTouch(e.changedTouches);

    if (touchEvent === void 0) return;

    console.log('touchMove');

    const {
      pageX,
      pageY,
    } = touchEvent;

    this.touchMoveLocation = {
      pageX,
      pageY,
    };

    console.log(this.getMovingDistance(this.touchStartLocation, this.touchMoveLocation));
  }

  /**
   * Reset all tracking properties if
   * tracking finger has lifted from the touch screen.
   * @param {Event} e
   */
  touchEndHandler(e) {
    const touchEvent = this.getTrackingTouch(e.changedTouches);

    if (touchEvent === void 0) return;

    console.log('touchEnd');

    const {
      pageX,
      pageY,
    } = touchEvent;

    this.touchIdentifier = null;
    this.touchEndLocation = {
      pageX,
      pageY,
    };

    console.log(this.getMovingDistance(this.touchStartLocation, this.touchEndLocation));
  }

  /**
   * Cancel pull to refresh
   * @param  {Event} e
   */
  touchCancelHandler(e) {
    console.log('cancel');
    this.touchIdentifier = null;
  }

  /**
   * Return tracking touch from a list of touch events
   * @param  {Array} changedTouches - A list of touch events
   * @return {Object}
   */
  getTrackingTouch(changedTouches) {
    return Array.from(changedTouches).find((touch) => {
      return touch.identifier === this.touchIdentifier;
    });
  }

  /**
   * Calculate touch move distance
   * @param  {Object} touchStartLocation
   * @param  {Object} touchEndLocation
   * @return {Number}
   */
  getMovingDistance(touchStartLocation, touchEndLocation) {
    return touchStartLocation.pageY - touchEndLocation.pageY;
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
