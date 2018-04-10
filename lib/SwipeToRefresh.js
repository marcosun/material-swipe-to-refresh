import React from 'react';
import {
  number,
  bool,
  object,
  node,
  func,
  oneOf,
} from 'prop-types';
import {withStyles, CircularProgress, Zoom} from 'material-ui';
import Refresh from 'material-ui-icons/Refresh';
import classNames from 'classnames';

const styles = (theme) => ({
  container: {
    position: 'absolute',
    zIndex: 99,
    left: '50%',
    padding: 5,
    borderRadius: '50%',
    backgroundColor: 'white',
    boxShadow: '0 3px 8px 0 rgba(0,0,0,.19), 0 6px 13px 0 rgba(0,0,0,.24)',
  },
  root: {
    top: 80,
  },
  refresh: {
    top: 0,
  },
});

@withStyles(styles)
/**
 * Swipe to refresh
 */
export default class Component extends React.Component {
  static propTypes = {
    classes: object,
    size: number,
    color: oneOf(['primary', 'secondary', 'inherit']),
    threshold: number,
    maxMove: number,
    isLoading: bool,
    children: node,
    childRef: object,
    onRefresh: func,
  };

  static defaultProps = {
    size: 30,
    color: 'primary',
    threshold: 50,
    maxMove: 80,
  };

  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      moveDistance: 0,
    };

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
    const {
      isLoading,
      childRef,
    } = this.props;

    if (isLoading === true) return;

    if (this.touchIdentifier !== null) return;

    // Prevent refresh when child component is scrolling
    if (childRef.current.scrollTop !== 0) return;

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
    const {
      maxMove,
      isLoading,
    } = this.props;

    const {
      moveDistance,
    } = this.state;

    if (isLoading === true) return;

    // Prevent refresh when child component is scrolling
    if (this.touchIdentifier === null) return;

    const touchEvent = this.getTrackingTouch(e.changedTouches);

    if (touchEvent === void 0) return;

    const {
      pageX,
      pageY,
    } = touchEvent;

    this.touchMoveLocation = {
      pageX,
      pageY,
    };

    let nextMoveDistance = this.getMoveDistance(this.touchStartLocation, this.touchMoveLocation);

    if (nextMoveDistance < 0) { // Scrolling up
      nextMoveDistance = 0;

      // If move distance is always a positive value,
      // which means scrolling up, do nothing.
      if (moveDistance <= 0) return;
    }

    // Scrolling down too much
    if (nextMoveDistance > maxMove) nextMoveDistance = maxMove;

    this.setState({
      ...this.state,
      moveDistance: nextMoveDistance,
    });
  }

  /**
   * Show loading icon if tracking finger move distance
   * is greater than threshold.
   * @param {Event} e
   */
  touchEndHandler(e) {
    const {
      isLoading,
      onRefresh,
    } = this.props;

    if (isLoading === true) return;

    // Prevent refresh when child component is scrolling
    if (this.touchIdentifier === null) return;

    const touchEvent = this.getTrackingTouch(e.changedTouches);

    if (touchEvent === void 0) return;

    const {
      pageX,
      pageY,
    } = touchEvent;

    this.touchIdentifier = null;
    this.touchEndLocation = {
      pageX,
      pageY,
    };

    // Negative value
    const moveDistance = this.getMoveDistance(this.touchStartLocation, this.touchEndLocation);

    const {
      threshold,
    } = this.props;

    // Reset refresh icon position
    this.setState({
      ...this.state,
      moveDistance: 0,
    });

    if (moveDistance >= threshold) {
      // Call refresh callback
      typeof onRefresh === 'function' && onRefresh();
    }
  }

  /**
   * Cancel pull to refresh
   * @param  {Event} e
   */
  touchCancelHandler(e) {
    this.touchIdentifier = null;
    this.setState({
      ...this.state,
      moveDistance: 0,
    });
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
  getMoveDistance(touchStartLocation, touchEndLocation) {
    return touchEndLocation.pageY - touchStartLocation.pageY;
  }

  /**
   * @return {Component}
   */
  render() {
    const {
      classes,
      size,
      color,
      isLoading,
      children,
    } = this.props;

    const {
      moveDistance,
    } = this.state;

    return (
      <div
        onTouchStart={this.touchStartHandler.bind(this)}
        onTouchMove={this.touchMoveHandler.bind(this)}
        onTouchEnd={this.touchEndHandler.bind(this)}
        onTouchCancel={this.touchCancelHandler.bind(this)}
      >
        {
          <Refresh
            classes={{
              root: classNames(classes.container, classes.refresh),
            }}
            style={{
              width: size,
              height: size,
              top: moveDistance,
              marginLeft: Math.floor(-size / 2),
              opacity: (moveDistance / 80),
              transform: `rotate3d(0, 0, 1, ${moveDistance / 80 * 360}deg) scale(${moveDistance / 80})`,
            }}
          />
        }
        {
          <Zoom timeout={350} in={isLoading} >
            <CircularProgress
              classes={{
                root: classNames(classes.container, classes.root),
              }}
              style={{
                marginLeft: Math.floor(-size / 2),
              }}
              size={size}
              color={color}
            />
          </Zoom>
        }
        {children}
      </div>
    );
  }
}
