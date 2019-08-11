function getRepositories() {
  const req = new XMLHttpRequest();
  const username = document.getElementById("username").value
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' | <a href="' + r.html_url+ '" target="_blank">Open Repo in Github</a>' + ' | <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '"onclick="getCommits(this)">Get Commits</a> | <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '"onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(data) {
  const username = data.dataset.username
  const repository = data.dataset.repository
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repository + '/commits')
  req.send()
}

function displayCommits(event, data) {
  var details = JSON.parse(this.responseText)
  const detailsList = `<ul>${details.map(detail => '<li> Github Name: ' + detail.author.login + ' | Full Name: ' + detail.commit.author.name + ' | Commit Message: ' + detail.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = detailsList
}

function getBranches(data) {
  const username = data.dataset.username
  const repository = data.dataset.repository
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repository + '/branches')
  req.send()
}

function displayBranches(event, data) {
  var details = JSON.parse(this.responseText)
  const detailsList = `<ul>${details.map(detail => '<li> Branch Name: ' + detail.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = detailsList
}
