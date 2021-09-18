import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { Audio } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const VideoRecorder = (props) => {
  const camera = useRef(null);
  const [values, setValues] = useState({
    hasPermission: [],
    cameraType: Camera.Constants.Type.back,
    isFlashLightOn: Camera.Constants.FlashMode.off,
    videoStatus: 0,
  });
  const { hasPermission, cameraType, isFlashLightOn, videoStatus } = values;

  useEffect(() => {
    getPermissions();
  }, []);
  const getPermissions = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    const AudioStatus = await Audio.requestPermissionsAsync();
    setValues({ ...values, hasPermission: [status, AudioStatus.status] });
  };

  const videoRecord = async () => {
    if (!videoStatus && camera.current) {
      setValues({
        ...values,
        videoStatus: 1,
        isFlashLightOn: isFlashLightOn
          ? Camera.Constants.FlashMode.torch
          : isFlashLightOn,
      });
      await camera.current
        .recordAsync()
        .then((data) => {
          // navigation.navigate("PCRTestResult", {
          //           video: data.requestPermissionsAsync,
          //           // video: data.uri,
          // })
          console.log(data);
        })
        .catch((err) => console.log(err));
    } else {
      try {
        await camera.current.stopRecording();
        setValues({
          ...values,
          videoStatus: 0,
          isFlashLightOn: Camera.Constants.FlashMode.off,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={cameraType} ref={camera}>
        <View style={styles.icons}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              if (!videoStatus) {
                setValues({
                  ...values,
                  isFlashLightOn: isFlashLightOn
                    ? Camera.Constants.FlashMode.off
                    : Camera.Constants.FlashMode.on,
                });
              }
            }}
          >
            <MaterialCommunityIcons
              name={isFlashLightOn ? "flash-off" : "flash"}
              color="white"
              size={60}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <MaterialCommunityIcons
              name={videoStatus ? "stop" : "record"}
              color="red"
              size={60}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              if (!videoStatus) {
                setValues({
                  ...values,
                  cameraType: cameraType
                    ? Camera.Constants.Type.back
                    : Camera.Constants.Type.front,
                });
              }
            }}
          >
            <MaterialCommunityIcons
              name={cameraType ? "camera-rear" : "camera-front"}
              color="white"
              size={60}
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  icons: {
    position: "absolute",
    bottom: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 5,
  },
  icon: {},
});

export default VideoRecorder;
