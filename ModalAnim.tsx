import React, {
  Ref,
  RefObject,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Animated,
  PanResponder,
} from 'react-native';

interface ModalAnimProps {}
let refs: Ref<ModalRef>;

export interface ModalRef {
  showModal: () => void;
  hideModal: () => void;
}

export const showModal = () => {
  if (refs != null) {
    refs.current?.showModal();
  }
};

export const hideModal = () => {
  if (refs != null) {
    refs.current?.hideModal();
  }
};

const ModalAnim = (props: ModalAnimProps, ref: Ref<ModalRef>) => {
  const [visible, setVisible] = React.useState(false);
  const pan = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  useEffect(() => {
    refs = ref;
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  useImperativeHandle(ref, () => ({
    showModal,
    hideModal,
  }));

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        pan.setOffset({x: pan.x._value, y: pan.y._value});
        pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: (evt, gestureState) => {
        pan.setValue({x: gestureState.dx, y: gestureState.dy});
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        pan.flattenOffset();
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    }),
  ).current;

  return (
    <Modal transparent visible={visible}>
      <Animated.View
        style={[
          styles.box,
          {
            transform: [{translateX: pan.x}, {translateY: pan.y}],
          },
        ]}
        {...panResponder.panHandlers}>
        {/* <View style={styles.box} /> */}
      </Animated.View>
    </Modal>
  );
};

export default forwardRef(ModalAnim);

const styles = StyleSheet.create({
  container: {},
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});
