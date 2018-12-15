
const Webcam = () =>{
      let width;
      let height;

      if(window.matchMedia('(max-width: 767px)').matches) {
             width = 340;
             height = 552
      } else {

             width = 600;
             height = 500
      }

        navigator.getUserMedia (

          // constraints
                {
                  video: {
                          width: width,
                          height: height
                        },
                   audio: false
                },

          // successCallback
                function(a) {   
                const video = document.querySelector('video');
               
                video.srcObject = a; 

                },

          // errorCallback
                function() {}

        );

      }







    export default Webcam 