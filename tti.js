newRider.innerHTML = `
  <button class="recordBtn">
    <p id="rec_text-${idToUse}"> 🎤 Start Recording </p>
  </button>
  <button class="rem-btn">Remove Rider <i class="fa-solid fa-user-minus"></i></button>
  <audio controls id="audiorec-${idToUse}" style="display: block;"></audio>
`;

setTimeout(() => {
  let recordBtn = document.getElementById(`rec_text-${idToUse}`);
  let recordBtnWrapper = newRider.querySelector('.recordBtn');
  let audio = document.getElementById(`audiorec-${idToUse}`);

  const sharingElement = new CustomEvent("receiving_recordBtn", {
    detail: {
      element: recordBtnWrapper,   // button that is clicked
      element1: recordBtn,         // <p> tag for text update
      element2: audio,             // audio player for this rider
      riderId: idToUse,
    }
  });
  document.dispatchEvent(sharingElement);
}, 100);





















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
          audioPlayer.src = audioURL;
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
