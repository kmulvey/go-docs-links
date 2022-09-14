// selectors:
// 1. go.mod in the top right "Details" box
// 2. links to types and functions in the center of the page
// 3. "View all" link in the "Source Files" section at the bottom of the page
// 4. file links in the "Source Files" section at the bottom of the page
let links = document.querySelectorAll("ul.UnitMeta-details > li:first-child a, .Documentation-content a.Documentation-source, .UnitFiles-titleLink a, .UnitFiles-fileList a"); 
for (let i = 0; i < links.length; i++) {
	if (links[i].href.includes("go.mod")){
    links[i].href = convertMod(links[i].href);
  } else if (links[i].href.includes("cs.opensource.google/go/go")){
    links[i].href = convertStd(links[i].href);
  } else if (links[i].href.includes("cs.opensource.google/go/x")){
    links[i].href = convertX(links[i].href);
  } 
}

function convertMod(link) {
  var url = link.split("/");
  var github = "https://github.com/golang/";

  for (let i = 4; i < url.length; i++) {
    // handle repo name
    if (url[i] == "go") {
      github +="go/blob/";
    } else if (url[i] == "x") {
      github += url[i+1] + "/blob/";
    }

    // handle branch/tag
    if (url[i] == "+") {
      github += url[i+1].replace(":","/");
    } 
  }

  // handle the last /
  if (github.charAt(github.length-1) == "/"){
    github += "go.mod";
  } else {
    github += "/go.mod";
  }

  return github;
}

function convertStd(link) {
  var url = link.split("/");
  var github = "https://github.com/golang/go/blob/";
  github += url[6].replace(":","/") + "/";
  github += url.slice(7, url.length).join("/");
  github = github.replace('go;l=', 'go#L');
  return github;
}


function convertX(link) {
  var url = link.split("/");
  var github = "https://github.com/golang/";
  github += url[5]+"/blob/";
  github += url[7].replace(":","/") + "/";
  github += url.slice(8, url.length).join("/");
  github = github.replace('go;l=', 'go#L');

  // this handles the "View All" at the bottom of the page
  if (!github.includes(".go")){
    github = github.replace("blob","tree");
  }
  return github;
}