

function getRepositories() {
  const req = new XMLHttpRequest()
  let name = document.getElementById("username").value

  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${name}/repos`)
  req.send()

}


function displayRepositories(event, data) {

  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = repos.map(function(r) {
    let a = `${r.owner.login}, ${r.name}, ${r.html_url}, <a href="#" onclick="getCommits(${r.owner.login})">Get Repositories</a>`
  return a})
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(r) {
  let commitReq = new XMLHttpRequest()
  let commitUrl = r
  commitReq.addEventListener("load", displayCommits);
  commitReq.open("GET", `https://api.github.com/repos/octocat/Spoon-Knife/commits`)
  commitReq.send()
}
function displayCommits() {
  let commits = JSON.parse(this.responseText)
  const commitList = commits.map(function(r) {
    let a = `${r.commit.author.name}, ${r.author.login}, ${r.commit.message}, <a href="#" onclick="getBranches(${r})">Get Branches</a>`
  return a })
  document.getElementById("details").innerHTML = commitList
}

function getBranches(commit) {
  let branchReq = new XMLHttpRequest()
  branchReq.addEventListener("load", displayBranches)
  branchReq.open("GET", `https://api.github.com/repos/octocat/Spoon-Knife/branches`)
  branchReq.send()
}

function displayBranches() {
  let branches = JSON.parse(this.responseText)
  const branchList = branches.map(function(r) {
    let a = `${r.name}`
    return a
  })
  document.getElementById("details").innerHTML = branchList
}
