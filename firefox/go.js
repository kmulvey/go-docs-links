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

// https://github.com/golang/go/blob/go1.19.1/src/go.mod
function convertMod(link) {
  var url = link.split("/");
  var github = "https://github.com/golang/go/blob/";
  github += url[6].replace(":","/") + "/go.mod";
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
  return github;
}

/*
// https://github.com/golang/go/blob/go1.19.1/src/net/http/client.go#L116
// https://github.com/golang/tools/blob/v0.1.12/go/packages/packages.go#L42
// https://github.com/golang/crypto/blob/master/bn256/constants.go

console.log(convertX("https://cs.opensource.google/go/x/tools/+/v0.1.12:go/packages/packages.go;l=473"));
console.log(convertX("https://cs.opensource.google/go/x/crypto/+/master:bn256/constants.go"));
console.log(convertStd("https://cs.opensource.google/go/go/+/go1.19.1:src/net/http/client.go;l=919"));
console.log(convertStd("https://cs.opensource.google/go/go/+/go1.19.1:src/go/ast/ast.go;l=456"));
*/