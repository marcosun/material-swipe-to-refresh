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
    width: '200vw',
    height: '200vw',
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
  }

  /**
   * @return {Component}
   */
  render() {
    const {
      classes,
    } = this.props;

    return (
      <div className={classes.root}>
        <MaterialSwipeToRefresh>
          <div className={classes.swipeToRefreshContainer}>
            The Touch.radiusX, Touch.radiusY, and Touch.rotationAngle describe the area of contact between the user and the screen, the touch area. This can be helpful when dealing with imprecise pointing devices such as fingers. These values are set to describe an ellipse that as closely as possible matches the entire area of contact (such as the user's fingertip).
            The Touch.radiusX, Touch.radiusY, and Touch.rotationAngle describe the area of contact between the user and the screen, the touch area. This can be helpful when dealing with imprecise pointing devices such as fingers. These values are set to describe an ellipse that as closely as possible matches the entire area of contact (such as the user's fingertip).
            The Touch.radiusX, Touch.radiusY, and Touch.rotationAngle describe the area of contact between the user and the screen, the touch area. This can be helpful when dealing with imprecise pointing devices such as fingers. These values are set to describe an ellipse that as closely as possible matches the entire area of contact (such as the user's fingertip).
            The Touch.radiusX, Touch.radiusY, and Touch.rotationAngle describe the area of contact between the user and the screen, the touch area. This can be helpful when dealing with imprecise pointing devices such as fingers. These values are set to describe an ellipse that as closely as possible matches the entire area of contact (such as the user's fingertip).
            The Touch.radiusX, Touch.radiusY, and Touch.rotationAngle describe the area of contact between the user and the screen, the touch area. This can be helpful when dealing with imprecise pointing devices such as fingers. These values are set to describe an ellipse that as closely as possible matches the entire area of contact (such as the user's fingertip).
            The Touch.radiusX, Touch.radiusY, and Touch.rotationAngle describe the area of contact between the user and the screen, the touch area. This can be helpful when dealing with imprecise pointing devices such as fingers. These values are set to describe an ellipse that as closely as possible matches the entire area of contact (such as the user's fingertip).
            The Touch.radiusX, Touch.radiusY, and Touch.rotationAngle describe the area of contact between the user and the screen, the touch area. This can be helpful when dealing with imprecise pointing devices such as fingers. These values are set to describe an ellipse that as closely as possible matches the entire area of contact (such as the user's fingertip).
          </div>
        </MaterialSwipeToRefresh>
      </div>
    );
  }
}
