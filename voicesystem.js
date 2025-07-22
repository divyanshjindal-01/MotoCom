const rider_img = document.getElementById("rider.img");
const audiorec = document.getElementById("audiorec");

let mediaRecorder;
let audioChunks = [];
let isRecording = false;

document.addEventListener("receiving_recordBtn",(e)=>{
const btn = e.detail.element;
let recordBtn = e.detail.element1;
const btn_p = e.detail.element2;


console.log("received btn: ", e.detail.riderId);

 if (btn) {
    btn.addEventListener("click", () => {
      if (!isRecording) {
        mediaRecorder.start();
        isRecording = true;
        recordBtn.innerText = "🛑 Stop Recording";
        console.log("🎤 Recording Start",e.detail.riderId);
      } else {
        mediaRecorder.stop();
        isRecording = false;
        recordBtn.innerText= "🎤 Start Recording";
        console.log("🛑 Recording Stop",e.detail.riderId);
      }
    });
    }});


navigator.mediaDevices.getUserMedia({audio: true})
.then(stream=>{
  mediaRecorder = new MediaRecorder(stream);

mediaRecorder.ondataavailable = event =>{
  audioChunks.push(event.data);
};
mediaRecorder.onstop = ()=>{
  const audioBlob = new Blob(audioChunks,{type: "audio/webm"});
  const audioURL = URL.createObjectURL(audioBlob);
  audiorec.src = audioURL;
  audioChunks = [];
}


  })
  .catch(err => {
    alert("Mic permission deny ho gayi ya error: " + err);
  });