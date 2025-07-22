const addRider = document.getElementById("addRider");
const rider = document.getElementById('rider');

let riderCount = 1;
let reusableID = [];
const maxRider = 5;

addRider.addEventListener("click", () => {
  // ✅ Correct limit check
  if (rider.childElementCount >= maxRider) {
    alert(`Rider limit can't exceed ${maxRider}`);
    return;
  }

  const newRider = document.createElement('div');
  newRider.classList.add('rider-card');

  // ✅ Use recycled ID if available
  let idToUse;
  if (reusableID.length > 0) {
    idToUse = reusableID.shift();
  } else {
    idToUse = riderCount++;
  }

  newRider.id = `ridernumber-${idToUse}`;
  console.log("Added:", newRider.id);

newRider.innerHTML = `
  <button class="recordBtn">
  <p contenteditable > Rider name</p>
  <p id="rec_text-${idToUse}"> 🎤 Start Recording </p>
  </button>
  <button class="rem-btn">Remove Rider <i class="fa-solid fa-user-minus"></i></button>
<!-- <audio controls autoplay id="audiorec-${idToUse}" style="display: block;"></audio> this is to be uncomment -->
`;

setTimeout(() => {
  let recordBtn = document.getElementById(`rec_text-${idToUse}`);
  let recordBtnWrapper = newRider.querySelector('.recordBtn');
  // let audio = document.getElementById(`audiorec-${idToUse}`); this is to be uncomment

  const sharingElement = new CustomEvent("receiving_recordBtn", {
    detail: {
      element: recordBtnWrapper,   // button that is clicked
      element1: recordBtn,         // <p> tag for text update
      // element2: audio,             // audio player for this rider    this is to be uncomment
      riderId: idToUse,
    }
  });
  document.dispatchEvent(sharingElement);
}, 100);

  const removeRider = newRider.querySelector(".rem-btn");
  removeRider.addEventListener("click", () => {
    const isConfirm = confirm("Are you sure you want to remove rider?");
    if (isConfirm) {
      rider.removeChild(newRider);
      const removedId = Number(newRider.id.split('-')[1]);
      reusableID.push(removedId); // ✅ Recycle the ID
      console.log("Removed:", newRider.id);
    }
  });

  rider.appendChild(newRider);
});
