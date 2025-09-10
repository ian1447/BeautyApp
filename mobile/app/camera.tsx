import { CameraView, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useRouter } from "expo-router";
import FaceDetection from "@react-native-ml-kit/face-detection";
import { Dimensions } from "react-native";

export default function Camera() {
  const router = useRouter();
  const [facing, setFacing] = useState("front");
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [landmarks, setLandmarks] = useState<any[]>([]);
  const screenWidth = Dimensions.get("window").width;
  const [imageSize, setImageSize] = useState({ width: 1, height: 1 });
  const cameraRef = useRef<any>(null);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Grant permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((c) => (c === "back" ? "front" : "back"));
  }

  async function takePhoto() {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync({
      skipProcessing: true,
    });
    console.log("📸 Captured photo:", photo);
    try {
      // run face detection
      const result = await FaceDetection.detect(photo.uri);
      console.log("✅ Face detection result:", result);

      if (result.length > 0) {
        const points: any[] = [];

        result.forEach((face) => {
          if (face.landmarks) {
            Object.values(face.landmarks).forEach((lm: any) => {
              if (lm?.position) {
                points.push(lm.position);
              }
            });
          }
        });

        setLandmarks(points);
      } else {
        console.log("⚠️ No faces detected");
        setLandmarks([]);
      }

      setPhotoUri(photo.uri);
    } catch (err) {
      console.error("❌ Face detection error:", err);
    }
  }

  return (
    <View style={styles.container}>
      {photoUri ? (
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: photoUri }}
            style={{ flex: 1 }}
            resizeMode="contain"
            onLayout={(e) => {
              const { width, height } = e.nativeEvent.layout;
              setImageSize({ width, height });
            }}
          />

          {landmarks.map((point, idx) => {
            // Scale point.x and point.y to match displayed image size
            const scaleX = imageSize.width / originalPhotoWidth; // ← get this from the photo object
            const scaleY = imageSize.height / originalPhotoHeight; // ← get this from the photo object

            const x = point.x * scaleX;
            const y = point.y * scaleY;

            return (
              <View
                key={idx}
                style={{
                  position: "absolute",
                  top: y,
                  left: x,
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "red",
                }}
              />
            );
          })}

          <TouchableOpacity
            style={styles.button}
            onPress={() => setPhotoUri(null)}
          >
            <Text style={styles.text}>Retake</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.text}>Flip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <Text style={styles.text}>Snap</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.back()}
            >
              <Text style={styles.text}>Back</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  message: { textAlign: "center", paddingBottom: 10 },
  camera: { flex: 1 },
  buttonContainer: {
    position: "absolute",
    bottom: 64,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  button: { alignItems: "center" },
  text: { fontSize: 18, fontWeight: "bold", color: "white" },
});
