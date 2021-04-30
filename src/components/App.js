import { useEffect, useState, useCallback } from "react";
import * as tmImage from "@teachablemachine/image";

const App = () => {
  const [webcam, setWebcam] = useState(null);
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState(null);

  const predict = useCallback(async () => {
    if (webcam && model) {
      const prediction = await model.predict(webcam.canvas);
      const predictions = [];
      for (let i = 0; i < model.getTotalClasses(); i++) {
        predictions.push({
          name: prediction[i].className,
          probability: prediction[i].probability.toFixed(2),
        });
      }
      setPredictions(predictions);
    }
  }, [webcam, model]);

  const loop = useCallback(async () => {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
  }, [webcam, predict]);

  const handleWebcam = async () => {
    if (webcam) {
      let canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      await webcam.stop();
      setWebcam(null);
    } else {
      setWebcam(new tmImage.Webcam(300, 300, true));
    }
  };

  const getAlphabet = () => {
    let probability = -1;
    let index = -1;
    for (let i = 0; i < predictions.length; i++) {
      let current = predictions[i];
      if (current.probability > probability) {
        index = i;
        probability = current.probability;
      }
    }
    if (index != -1) {
      return predictions[index].name.toUpperCase();
    }
    return predictions[predictions.length - 1].name;
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
    } else {
      setPredictions(null);
    }
  }, [webcam, loop]);

  useEffect(() => {
    const URL = "https://teachablemachine.withgoogle.com/models/6ZExbl23Z/";
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    tmImage.load(modelURL, metadataURL).then((model) => setModel(model));
  }, []);

  return (
    <div className="bg-gray-200 h-screen w-full flex flex-col justify-center">
      <div className="mx-auto space-y-4">
        <div className="bg-white rounded-md shadow p-4 space-y-4">
          <div className="text-lg">Preview</div>
          <canvas
            id="canvas"
            width="300"
            height="300"
            className="rounded bg-gray-50"
          ></canvas>
        </div>
        {predictions && (
          <div className="bg-white rounded-md shadow p-4 space-y-4">
            <div className="flex justify-center">
              <div className="text-4xl">{getAlphabet()}</div>
            </div>
          </div>
        )}
        <button
          onClick={handleWebcam}
          className={`bg-white rounded-md shadow text-lg py-3 w-full ${
            webcam ? "text-red-500" : "text-blue-500"
          } ${model ? "hover:bg-gray-50" : "opacity-70 cursor-default"}`}
          disabled={!model}
        >
          {model ? (webcam ? "Stop" : "Start") : "Setting up..."}
        </button>
      </div>
    </div>
  );
};

export default App;
