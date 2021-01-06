import Toast from "react-native-root-toast";

const ToastShow = (message, duration = 3) => {
  Toast.show(`${message}`, {
    animation: false,
    duration: Toast.durations.SHORT
  });
};

export default ToastShow;
