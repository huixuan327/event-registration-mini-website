const form = document.getElementById("registrationForm");
const message = document.getElementById("message");
const participantList = document.getElementById("participantList");
const count = document.getElementById("count");
const downloadBtn = document.getElementById("downloadBtn");

let registrationCount = 0;
let participants = JSON.parse(localStorage.getItem("participants")) || [];

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phoneNumber = document.getElementById("phoneNumber").value;

  participants.push({
    name: name,
    email: email,
    phoneNumber: phoneNumber
  });
  localStorage.setItem("participants", JSON.stringify(participants));

  const listItem = document.createElement("li");
  listItem.textContent = name;
  participantList.appendChild(listItem);

  registrationCount = registrationCount + 1;
  count.textContent = registrationCount;

  message.textContent = "Registration Successful!";

  form.reset();
});

downloadBtn.addEventListener("click", function() {
  if (participants.length === 0) {
    alert("No participants to download.");
    return;
  }

  let csvContent = "Name,Email,Phone Number\n";

  participants.forEach(function(participant) {
    csvContent +=
      participant.name + "," +
      participant.email + "," +
      participant.phoneNumber + "\n";
  });

  const blob = new Blob([csvContent], {
    type: "text/csv"
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "participants.csv";

  link.click();

  URL.revokeObjectURL(url);
});