const rider_img = document.getElementById("rider.img");
const audiorec = document.getElementById("audiorec");

let mediaRecorder;
let audioChunks = [];
let isRecording = false;

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

    recordBtn.addEventListener("click", () => {
      if (!isRecording) {
        mediaRecorder.start();
        isRecording = true;
        recordBtn.textContent = "🛑 Stop Recording";
        console.log("🎤 Recording Start");
      } else {
        mediaRecorder.stop();
        isRecording = false;
        recordBtn.textContent = "🎤 Start Recording";
        console.log("🛑 Recording Stop");
      }
    });
  })
  .catch(err => {
    alert("Mic permission deny ho gayi ya error: " + err);
  });