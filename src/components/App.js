import { useEffect, useState, useCallback } from "react";
import * as tmImage from "@teachablemachine/image";

const App = () => {
  const [webcam, setWebcam] = useState(null);
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState(null);

  const lightColors = [
    "bg-red-50",
    "bg-yellow-50",
    "bg-blue-50",
    "bg-pink-50",
    "bg-purple-50",
    "bg-green-50",
  ];

  const normalColors = [
    "bg-red-300",
    "bg-yellow-300",
    "bg-blue-300",
    "bg-pink-300",
    "bg-purple-300",
    "bg-green-300",
  ];

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
    const URL = "https://teachablemachine.withgoogle.com/models/_btPzUnuE/";
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    tmImage.load(modelURL, metadataURL).then((model) => setModel(model));
  }, []);

  return (
    <div className="bg-gray-200 h-screen w-full flex flex-col justify-center">
      <div className="mx-auto w-min flex space-x-4">
        <div className="space-y-4">
          <div className="bg-white rounded-md shadow p-4 space-y-4">
            <div className="text-lg">Preview</div>
            <canvas
              id="canvas"
              width="300"
              height="300"
              className="rounded bg-gray-50"
            ></canvas>
          </div>
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
        {predictions && (
          <div className="bg-white rounded-md shadow p-4 w-80 space-y-4">
            <div className="text-lg">Classes</div>
            <div className="space-y-3">
              {predictions.map(({ name, probability }, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-base text-gray-800">{name}</div>
                  <div
                    className={`h-10 rounded w-full flex ${
                      lightColors[index % lightColors.length]
                    }`}
                  >
                    <div
                      className={`rounded ${
                        normalColors[index % normalColors.length]
                      }`}
                      style={{ width: probability * 100 + "%" }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
