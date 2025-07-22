const rider_img = document.getElementById("rider.img");
const audiorec = document.getElementById("audiorec");

let isRecording = false;
let mediaRecorder;
let audioChunks = [];
let stream;

document.addEventListener("receiving_recordBtn", (e) => {
  const btn = e.detail.element;       // The button (container)
  const textElement = e.detail.element1;  // <p> element inside button
  const audioPlayer = e.detail.element2;  // Specific audio element
  const riderId = e.detail.riderId;

  if (!btn) return;

  btn.addEventListener("click", async () => {
    if (!isRecording) {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
          const audioURL = URL.createObjectURL(audioBlob);
          // audioPlayer.src = audioURL; this is to be uncomment
          audiorec.src = audioURL;
          audioChunks = [];

          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorder.start();
        isRecording = true;
        textElement.innerText = "🛑 Stop Recording";
        console.log("🎤 Recording Start", riderId);
      } catch (err) {
        console.error("Microphone error: ", err);
      }
    } else {
      mediaRecorder.stop();
      isRecording = false;
      textElement.innerText = "🎤 Start Recording";
      console.log("🛑 Recording Stop", riderId);
    }
  });
});
