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

  // newRider.innerHTML = `
  //   <button id="recordBtn">
  //     <img src="https://img.freepik.com/premium-vector/rider-logo-with-concept-men-using-helmets_811548-166.jpg" height="200" width="200" />
  //   </button>
  //   <button class="rem-btn">Remove Rider <i class="fa-solid fa-user-minus"></i></button>
  // `;

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
