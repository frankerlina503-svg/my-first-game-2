const homeTeamSelect = document.getElementById('homeTeam');
const awayTeamSelect = document.getElementById('awayTeam');
const startButton = document.getElementById('startMatch');
const homeScoreEl = document.getElementById('homeScore');
const awayScoreEl = document.getElementById('awayScore');
const homeLabel = document.getElementById('homeLabel');
const awayLabel = document.getElementById('awayLabel');
const matchStatus = document.getElementById('matchStatus');
const highlightList = document.getElementById('highlightList');
const finalResult = document.getElementById('finalResult');
const goalCount = document.getElementById('goalCount');
const topTeam = document.getElementById('topTeam');

const teams = [
  'Blue Wolves',
  'Red Strikers',
  'Golden Eagles',
  'Shadow United',
  'Emerald City',
  'Storm Rangers'
];

function chooseRandomTeam(exclude) {
  const available = teams.filter((team) => team !== exclude);
  return available[Math.floor(Math.random() * available.length)];
}

function simulateMatch(home, away) {
  const homeGoals = Math.floor(Math.random() * 5);
  const awayGoals = Math.floor(Math.random() * 5);
  const events = [];
  const totalGoals = homeGoals + awayGoals;
  const totalPlays = 4 + Math.round(Math.random() * 4);

  for (let i = 0; i < totalPlays; i += 1) {
    const team = Math.random() > 0.5 ? home : away;
    const eventType = Math.random();
    if (eventType < 0.4) {
      events.push(`${team} fires a strong shot on target.`);
    } else if (eventType < 0.75) {
      events.push(`${team} controls midfield with crisp passing.`);
    } else {
      events.push(`${team} wins a free kick near the box.`);
    }
  }

  for (let i = 0; i < totalGoals; i += 1) {
    const scorer = Math.random() > 0.5 ? home : away;
    const minute = 10 + Math.floor(Math.random() * 80);
    events.splice(i * 2, 0, `${scorer} scores in the ${minute}′!`);
  }

  return {
    homeGoals,
    awayGoals,
    events,
    totalGoals,
  };
}

function updateTopTeam(home, away, homeGoals, awayGoals) {
  const winner = homeGoals > awayGoals ? home : awayGoals > homeGoals ? away : 'Draw';
  topTeam.textContent = winner === 'Draw' ? 'Match Drawn' : winner;
}

function renderHighlights(events) {
  highlightList.innerHTML = '';
  events.slice(0, 6).forEach((event) => {
    const item = document.createElement('li');
    item.textContent = event;
    highlightList.appendChild(item);
  });
}

function startMatch() {
  let home = homeTeamSelect.value;
  let away = awayTeamSelect.value;

  if (home === away) {
    away = chooseRandomTeam(home);
    awayTeamSelect.value = away;
  }

  homeLabel.textContent = home;
  awayLabel.textContent = away;
  matchStatus.textContent = 'Match in progress';
  matchStatus.style.color = '#f5c33d';

  const match = simulateMatch(home, away);

  homeScoreEl.textContent = match.homeGoals;
  awayScoreEl.textContent = match.awayGoals;
  finalResult.textContent = `${match.homeGoals} - ${match.awayGoals}`;
  goalCount.textContent = match.totalGoals;
  updateTopTeam(home, away, match.homeGoals, match.awayGoals);
  renderHighlights(match.events);

  matchStatus.textContent = 'Full time';
}

startButton.addEventListener('click', startMatch);
