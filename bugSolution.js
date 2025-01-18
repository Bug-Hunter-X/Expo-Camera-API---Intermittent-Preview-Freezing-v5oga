import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { useAsyncEffect } from 'react-async';

function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const cameraRef = useRef(null);
  
  useAsyncEffect(async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  }, []);

  useEffect(() => {
    return () => {
      if (cameraRef.current) {
        cameraRef.current.stopRecording();
        cameraRef.current.pausePreview();
        cameraRef.current.unloadAsync(); //Ensures release of camera resources
      }
    };
  }, [])

  if (hasPermission === null) {
    return <View />;}
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
       {/* Camera controls here */}
      </Camera>
    </View>
  );
}

export default App;