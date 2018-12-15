import React from "react";
import ReactDOM from "react-dom";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import "./App.css";
import logo from './logo.svg'
import Webcam from './webcam';

class App extends React.Component {
  componentDidMount() {

    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");

    if(window.matchMedia('(max-width: 767px)').matches) {
      video.width = 340;
      video.height = 552
      canvas.width = 340;
      canvas.height = 552
    } else {

      video.width  = 600;
      video.height = 500
      canvas.width = 600;
      canvas.height = 500
    }

    console.log(" canvas.width ", canvas.width ,  "canvas.height" , canvas.height )

    Webcam();


    const a = async () => {
        const model = await cocoSsd.load();
        console.log("loaded")
                
        this.predict(video, model);
     }

    a();


  }

  predict = async (video, model) => {
 
      const predictions = await model.detect(video);

      this.renderPredictions(predictions);

      requestAnimationFrame(() => {
        this.predict(video, model);
        if (predictions[0] !== undefined) {
           console.log(`Prediction ${predictions[0].class} ${predictions[0].score}`)
        }
      });

  };

  renderPredictions = predictions => {
    const c = document.getElementById("canvas");
    const ctx = c.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Font options.
    const font = "16px courier";
    ctx.font = font;
    ctx.textBaseline = "top";
    predictions.forEach(prediction => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const width = prediction.bbox[2];
      const height = prediction.bbox[3];
      // Draw the bounding box.
      ctx.strokeStyle = "#00FFFF";
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, width, height);
      // Draw the label background.
      ctx.fillStyle = "#00FFFF";
      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = parseInt(font, 10); // base 10
      ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
    });

    predictions.forEach(prediction => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      // Draw the text last to ensure it's on top.
      ctx.fillStyle = "#000000";
      ctx.fillText(prediction.class, x, y);
    });





    
  };

  render() {
    return (
      <div>
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h3> This app is using coco-ssd model with tfjs to predict objects</h3>
              </header>
            </div>

        <video id="video" controls autoPlay  />
        <canvas id="canvas"  />
      </div>
    );
  }
}

export default App;
