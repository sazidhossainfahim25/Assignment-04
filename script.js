const sectionArea = document.getElementById("alljobsContainer");

const allBtn = document.getElementById("all-btn");
const interviewTabBtn = document.getElementById("interview-btn");
const rejectedTabBtn = document.getElementById("rejected-btn");

const emptyMessage = document.getElementById("emptyMessage");

// Dashboard count elements
const totalCount = document.getElementById("totalCount");
const rejectedCount = document.getElementById("rejectedCount");
const interviewCount = document.getElementById("interviewCount");
const tabCount = document.getElementById("tabCount");
// ================= COUNT UPDATE =================
function updateCounts() {
  const cards = document.querySelectorAll(".card-01");

  let total = cards.length;
  let interview = 0;
  let rejected = 0;

  cards.forEach((card) => {
    const status = card.getAttribute("data-status");
    if (status === "interview") interview++;
    if (status === "rejected") rejected++;
  });

  totalCount.innerText = total;
  rejectedCount.innerText = rejected;
  interviewCount.innerText = interview;
  tabCount.innerText = total;
}

// ================= FILTER FUNCTION =================
function filterJobs(status) {
  const cards = document.querySelectorAll(".card-01");
  let visibleCount = 0;

  cards.forEach((card) => {
    const cardStatus = card.getAttribute("data-status");

    if (status === "all") {
      card.style.display = "block";
      visibleCount++;
    } else if (cardStatus === status) {
      card.style.display = "block";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });
 

  if (visibleCount === 0) {
    emptyMessage.classList.remove("hidden");
  } else {
    emptyMessage.classList.add("hidden");
  }

  updateCounts();
}

// ================= ACTIVE TAB STYLE =================
function setActiveTab(activeBtn) {
  const buttons = [allBtn, interviewTabBtn, rejectedTabBtn];

  buttons.forEach((btn) => {
    btn.classList.remove("bg-blue-500", "text-white");
    btn.classList.add("bg-white", "text-gray-500");
  });

  activeBtn.classList.remove("bg-white", "text-gray-500");
  activeBtn.classList.add("bg-blue-500", "text-white");
}

// ================= STATUS TOGGLE =================
sectionArea.addEventListener("click", function (event) {
  const card = event.target.closest(".card-01");
  if (!card) return;

  const statusBtn = card.querySelector(".status");

  // Interview click
  if (event.target.classList.contains("interviewBtn")) {
    card.setAttribute("data-status", "interview");
    statusBtn.innerText = "Interview";
    statusBtn.className = "status py-1 px-4 bg-green-100 rounded";
  }

  // Rejected click
if (event.target.classList.contains("rejectedBtn")) {
  card.setAttribute("data-status", "rejected");
  statusBtn.innerText = "Rejected";
  statusBtn.className = "status py-1 px-4 bg-red-100 rounded";
}

  // Delete
  if (event.target.closest(".fa-trash-can")) {
    card.remove();
  }
  updateCounts();
});

// ================= TAB EVENTS =================
function togolBtnAll(button, status) {
  button.addEventListener("click", function () {
    setActiveTab(button);
    filterJobs(status);
  });
}
togolBtnAll(allBtn, "all");
togolBtnAll(interviewTabBtn, "interview");
togolBtnAll(rejectedTabBtn, "rejected");


updateCounts();
filterJobs("all");