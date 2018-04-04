import React from 'react';
import {
  number,
  object,
  node,
  oneOf,
} from 'prop-types';
import {withStyles, CircularProgress, Zoom} from 'material-ui';

const styles = (theme) => ({
  root: {
    position: 'absolute',
    zIndex: 99,
    top: 80,
    left: '50%',
    transform: 'translate3d(-50%, 0, 0)',
    padding: 5,
    borderRadius: '50%',
    backgroundColor: 'white',
    boxShadow: '0 3px 8px 0 rgba(0,0,0,.19), 0 6px 13px 0 rgba(0,0,0,.24)',
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
    children: node,
  };

  static defaultProps = {
    size: 30,
    color: 'primary',
    threshold: 50,
  };

  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
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

    // console.log(this.getMoveDistance(this.touchStartLocation, this.touchMoveLocation));
  }

  /**
   * Show loading icon if tracking finger move distance
   * is greater than threshold.
   * @param {Event} e
   */
  touchEndHandler(e) {
    const {
      threshold,
    } = this.props;

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

    // Negative value
    const moveDistance = this.getMoveDistance(this.touchStartLocation, this.touchEndLocation);

    if (moveDistance > -threshold) return;

    this.setState({
      ...this.state,
      isLoading: true,
    });

    setTimeout(() => {
      this.setState({
        ...this.state,
        isLoading: false,
      });
    }, 1000);
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
  getMoveDistance(touchStartLocation, touchEndLocation) {
    return touchStartLocation.pageY - touchEndLocation.pageY;
  }

  /**
   * @return {Component}
   */
  render() {
    const {
      classes,
      size,
      color,
      children,
    } = this.props;

    const {
      isLoading,
    } = this.state;

    return (
      <div
        onTouchStart={this.touchStartHandler.bind(this)}
        onTouchMove={this.touchMoveHandler.bind(this)}
        onTouchEnd={this.touchEndHandler.bind(this)}
        onTouchCancel={this.touchCancelHandler.bind(this)}
      >
        {
          <Zoom timeout={{enter: 0, exit: 250}} in={isLoading} >
            <CircularProgress
              classes={{
                root: classes.root,
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
