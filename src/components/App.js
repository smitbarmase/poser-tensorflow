import { useEffect, useState } from "react";
import * as tmImage from "@teachablemachine/image";

function App() {
  const [webcam, setWebcam] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [modelRunning, setModelRunning] = useState(false);
  const [maxPredictions, setMaxPredictions] = useState(0);

  let model;

  const loadModal = async () => {
    const URL = "https://teachablemachine.withgoogle.com/models/_btPzUnuE/";
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    setMaxPredictions(model.getTotalClasses());
  };

  const predict = async () => {
    if (model) {
      const prediction = await model.predict(webcam.canvas);
      const predictions = [];
      for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
          prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        predictions.push(classPrediction);
        // labelContainer.childNodes[i].innerHTML = classPrediction;
      }
      console.log(predictions);
    }
  };

  const loop = async () => {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
  };

  const handleWebcam = async () => {
    if (webcam) {
      let canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      await webcam.stop();
      setWebcam(null);
    } else {
      setWebcam(new tmImage.Webcam(350, 350, true));
    }
  };

  const handleModalRunning = () => {
    if (modelRunning) {
    } else {
      loadModal();
    }
    setModelRunning(!modelRunning);
  };

  useEffect(() => {
    if (webcam) {
      const startWebcam = async () => {
        await webcam.setup();
        await webcam.play();
        window.requestAnimationFrame(loop);
        webcam.canvas = document.getElementById("canvas");
      };
      startWebcam();
    }
  }, [webcam]);

  return (
    <div className="bg-gray-200 h-screen w-full flex flex-col justify-center">
      <div className="mx-auto w-min">
        <div id="webcam-container" className="bg-white rounded-md shadow p-4">
          <canvas
            id="canvas"
            width="350"
            height="350"
            className="rounded bg-gray-50 shadow-inner"
          ></canvas>
        </div>
        <div>{maxPredictions}</div>
        <button
          onClick={handleWebcam}
          className={`bg-white rounded-md shadow text-lg py-3 w-full hover:bg-gray-50 ${
            webcam ? "text-red-500" : "text-blue-500"
          }`}
        >
          {webcam ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
}

export default App;
