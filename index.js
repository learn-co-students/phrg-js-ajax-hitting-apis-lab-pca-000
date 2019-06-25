"use strict"

const baseUrl = "https://api.github.com"

function getRepositories(){
  let username = document.getElementById("username").value
  let uri = `${baseUrl}/users/${username}/repos`
  let req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", uri)
  req.send()
}

function displayRepositories() {
  const response = JSON.parse(this.responseText)
  const repoDiv = document.getElementById("repositories")
  let repoList = ["<ul>"]
  response.map(repo => {
    const repoName = repo.name
    const htmlUrl = repo.html_url
    const owner = repo.owner.login
    repoList.push(`
      <li>
        <a  href = ${htmlUrl}><h4>${repoName}</h4></a>
        <br>
        <a href= '#' data-username="${owner}"
                   data-repository="${repoName}"
                   onclick="getCommits(this)">
          Get Commits
        </a>
        <br>
        <a href= '#' data-username="${owner}"
                   data-repository="${repoName}"
                   onclick="getBranches(this)">
          Get Branches
        </a>
      </li>
      `)
  })
  repoList.push("</ul>")
  const repoHtml = repoList.join('')
  repoDiv.innerHTML = repoHtml
  }

function getCommits(element){
  const owner = element.dataset.username
  const repo = element.dataset.repository
  const uri =  `${baseUrl}/repos/${owner}/${repo}/commits`
  console.log(uri)
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", uri)
  req.send()
}

function displayCommits(){
  const response = JSON.parse(this.responseText)
  const detailsDiv = document.getElementById("details")
  let commitList = ["<ul>"]
  response.map(commit => {
    const authorName = commit.commit.author.name
    const githubName = commit.author.login
    const message = commit.commit.message
    commitList.push(`
      <li>authorName: ${authorName} --- githubName: ${githubName} --- message: ${message}
      `)
  })
  commitList.push("</u>")
  const commitHtml = commitList.join('')
  detailsDiv.innerHTML = commitHtml
}

function getBranches(element){
  const owner = element.dataset.username
  const repo = element.dataset.repository
  const uri = `${baseUrl}/repos/${owner}/${repo}/branches`
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches);
  req.open("GET", uri)
  req.send()
}

function displayBranches(){
  const response = JSON.parse(this.responseText)
  const detailsDiv = document.getElementById("details")
  let branchList = ["<ul>"]
  response.map(branch => {
    const name = branch.name
    branchList.push(`
      <li>
      ${name}
      </li>
      `)
  })
  branchList.push("</ul>")
  const branchHtml = branchList.join("")
  detailsDiv.innerHTML = branchHtml
}
