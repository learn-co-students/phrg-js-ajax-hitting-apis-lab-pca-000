const rootUrl = "https://api.github.com/"

function getRepositories() {
  console.log(this)
  debugger
  const username = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", rootUrl + `users/${username}/repos`)
  req.send()
}

function displayRepositories(event, data) {
  const repos = JSON.parse(this.responseText)
  const repoList = `<ul><li>${repos[0].owner.login}</li>${repos.map(repo => '<li>' + repo.name + ' - <a href=' + repo.html_url + ' data-repo="' + repo.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const repo = el.dataset.repo
  const name = el.dataset.name
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", rootUrl + 'repos/octocat/' + "Spoon-Knife" + '/commits')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const branches = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches);
  req.open("GET", rootUrl + 'repos/octocat/Spoon-Knife/branches')
  req.send()
}

function displayBranches(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/octocat/' + "Spoon-Knife" + '/commits')
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
