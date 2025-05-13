let data = [];

fetch('data.json')
  .then(response => response.json())
  .then(json => {
    data = json;
    updateUI("weekly"); // default view
  });

const buttons = document.querySelectorAll(".timeframe-selector button");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    buttons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const selectedTimeframe = button.dataset.timeframe;
    updateUI(selectedTimeframe);
  });
});

function updateUI(timeframe) {
  data.forEach(activity => {
    const title = activity.title;
    const current = activity.timeframes[timeframe].current;
    const previous = activity.timeframes[timeframe].previous;

    const card = document.querySelector(`.card[data-title="${title}"]`);
    const currentEl = card.querySelector(".current-hours");
    const previousEl = card.querySelector(".previous-hours");

    currentEl.textContent = `${current}hrs`;

    let label = "Last Week";
    if (timeframe === "daily") label = "Yesterday";
    if (timeframe === "monthly") label = "Last Month";

    previousEl.textContent = `${label} - ${previous}hrs`;
  });
}
