# PoseX-Tensorflow (Project Exhibition 2021)

In this project, we have tried to develop a system that would be helpful for the disabled people having communication difficulties by developing a system that would help them in expressing themselves clearly and easily. Our model successfully converts the entire input sentence into a single visual rather than depicting different words through a GIF/ picture giving the model a much realistic and lively appeal. Much more development on this track can be done as the ASL dictionary is still small and needs to grow eventually. 


### via NPM

[NPM Package](https://www.npmjs.com/package/@teachablemachine/image)

```
npm i @tensorflow/tfjs
npm i @teachablemachine/image
```

```js
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';

```

### Sample snippet

```js
<div>Teachable Machine Image Model</div>
<button type='button' onclick='init()'>Start</button>
<div id='webcam-container'></div>
<div id='label-container'></div>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8.3/dist/teachablemachine-image.min.js"></script>
<script type="text/javascript">
    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel
    const URL = '{{URL}}';

    let model, webcam, labelContainer, maxPredictions;

    // Load the image model and setup the webcam
    async function init() {
        const modelURL = URL + 'model.json';
        const metadataURL = URL + 'metadata.json';

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        webcam.play();
        window.requestAnimationFrame(loop);

        // append elements to the DOM
        document.getElementById('webcam-container').appendChild(webcam.canvas);
        labelContainer = document.getElementById('label-container');
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement('div'));
        }
    }

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }
    }
</script>
```


## API

### Loading the model - url checkpoints

`tmImage` is the module name, which is automatically included when you use the `<script src>` method. It gets added as an object to your window so you can access via `window.tmImage` or simply `tmImage`.

```ts
tmImage.load(
	checkpoint: string, 
	metadata?: string | Metadata
)
```

Args:

* **checkpoint**: a URL to a json file that contains the model topology and a reference to a bin file (model weights)
* **metadata**: a URL to a json file that contains the text labels of your model and additional information


Usage:

```js
await tmImage.load(checkpointURL, metadataURL);
```


### Loading the model - browser files

You can upload your model files from a local hard drive by using a file picker and the File interface. 

```ts
tmImage.loadFromFiles(
	model: File, 
	weights: File, 
	metadata: File
) 
```

Args:

* **model**: a File object that contains the model topology (.json)
* **weights**: a File object with the model weights (.bin)
* **metadata**: a File object that contains the text labels of your model and additional information (.json)

Usage:

```js
// you need to create File objects, like with file input elements (<input type="file" ...>)
const uploadModel = document.getElementById('upload-model');
const uploadWeights = document.getElementById('upload-weights');
const uploadMetadata = document.getElementById('upload-metadata');
model = await tmImage.loadFromFiles(uploadModel.files[0], uploadWeights.files[0], uploadMetadata.files[0])
```

### Model - get total classes

Once you have loaded a model, you can obtain the total number of classes in the model. 

This method exists on the model that is loaded from `tmImage.load`.

```ts
model.getTotalClasses()
```

Returns a number representing the total number of classes

### Model - get class labels

Once you have loaded a model, you can obtain the class labels (i.e. the name of each category the model was trained on). 

This method exists on the model that is loaded from `tmImage.getClassLabels`.

```ts
model.getClassLabels()
```

Returns an array with class names as strings.


### Model - predict

Once you have loaded a model, you can make a classificaiton with a couple of different input options.

This method exists on the model that is loaded from `tmImage.load`.

```ts
model.predict(
  image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap,
  flipped = false
)
```

Args:

* **image**: an image, canvas, or video element to make a classification on
* **flipped**: a boolean to trigger whether to flip on X or not the image input

Usage:

```js
// predict can take in an image, video or canvas html element
// if using the webcam utility, we set flip to true since the webcam was only 
// flipped in CSS
const flip = true;
const allPredictions = await model.predict(webcamElement, flip);
```




### Model - predictTopK

This is an alternative function to `predict()` which returns the probability for all classes. 

This method exists on the model that is loaded from `tmImage.load`.

```ts
model.predictTopK(
  image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap,
  maxPredictions = 10,
  flipped = false
)
```

Args:

* **image**: an image, canvas, or video element to make a classification on
* **flipped**: a boolean to trigger whether to flip on X or not the image input
* **maxPredictions**: total number of predictions to return

Usage:

```js
// predictTopK can take in an image, video or canvas html element
// if using the webcam utility, we set flip to true since the webcam was only 
// flipped in CSS
const flip = true;
const maxPredictions = model.getTotalClasses();
const prediction = await model.predictTopK(webcamElement, maxPredictions, flip);
```

### Webcam

You can optionally use a webcam class that comes with the library, or spin up your own webcam. This class exists on the `tmImage` module.

Please note that the default webcam used in Teachable Machine was flipped on X - so you should probably set `flip = true` if creating your own webcam unless you flipped it manually in Teachable Machine.

```ts
new tmImage.Webcam(
    width = 400,
    height = 400,
    flip = false,
)
```

Args:

* **width**: width of the webcam. It should ideally be square since that's how the model was trained with Teachable Machine.
* **height**: height of the webcam. It should ideally be square since that's how the model was trained with Teachable Machine.
* **flip**: boolean to signal whether webcam should be flipped on X. Please note this is only flipping on CSS.

Usage:

```js
// webcam has a square ratio and is flipped by default to match training
const webcam = new tmImage.Webcam(200, 200, true);
await webcam.setup();
webcam.play();
document.body.appendChild(webcam.canvas);
```

### Webcam - setup

After creating a Webcam object you need to call setup just once to set it up.

```ts
webcam.setup(
	options: MediaTrackConstraints = {}
)
```

Args:

* **options**: optional media track contraints for the webcam

Usage:

```js
await webcam.setup();
```

### Webcam - play, pause, stop

```ts
webcam.play();
webcam.pause();
webcam.stop();
```

Webcam play loads and starts playback of a media resource. Returns a promise.

### Webcam - update

Call on update to update the webcam frame.

```ts
webcam.update();
```

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Created By:
Smit Barmase
Neel Modi
Aadarsh S
