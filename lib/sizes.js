const fs = require("fs-extra"); // TODO at some point this should be fs/promises
const path = require('path');

// returns a promise for fs.Stats for all files and directories at the given path
function getDirectoryStats(dirPath) {
  return new Promise( (resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (!err) {
        const infosPromise = Promise.all(files.map( (p) => {
          const filePath = path.resolve(dirPath, p);
          return fs.lstat(filePath).then( (info) => { info.path = filePath; return info });
        }));
        infosPromise.then(resolve);
        infosPromise.catch(reject);
      } else {
        reject(err);
      }
    });
  });
}

exports._getDirectoryStats = getDirectoryStats // expose for testing

/*
  Results structure
  {
    directories: {
      "c:/": {
        directories: {

        }
        files: {
          bla..
        }
      }
    }
    files: {}
  }
*/
function updateResults(results, info) {
  const pathParts = info.path.split(path.sep);
  let currentResult = results;
  pathParts.forEach((part, i) => {
    if (i < pathParts.length - 1) {
      currentResult.directories[part] = currentResult.directories[part] ||
        { directories: {}, files: {}};
    } else {
      if (info.isDirectory()) {
        currentResult.directories[part] = { directories: {}, files: {}, info: info };
      } else {
        currentResult.files[part] = info;
      }
    }
  });
}

// build path stats recursively goes through the directory structure, populating
// results with fs.Stats for each path.
function buildPathStats(results, path, progressCallback) {
  const dirStatsPromise = getDirectoryStats(path);
  dirStatsPromise.then( (infos) => {
    infos.forEach( (i) => updateResults(results, i));
    const directories = infos.filter( i => i.isDirectory() );
    if (directories.length > 0) {
      progressCallback({done: false});
      iterateBuildPathStats(results, directories.entries(), progressCallback);
    } else {
      progressCallback({done: true});
    }
  });
}

// iterateBuildPathStats is a helper function for buildPathStats to sequentially
// and recursively build the stats tree.
function iterateBuildPathStats(results, directories, progressCallback) {
  // We want to buildPathStats for each directory in the list, then if all
  // of them have returned { done: true }, we call progressCallback with done true
  // ourselves.
  const next = directories.next();
  if (next.done) {
    progressCallback({done: true});
  } else {
    buildPathStats(results, next, (status) => {
      progressCallback({done: false});
      if (status.done) { // if the previous iteration is done, we iterate
        iterateBuildPathStats(results, directories, progressCallback);
      }
    });
  }
}

function getSizeTree(path, numEntries, minSize, progressCallback) {
  const result = {
    directories: {},
    files: {}
  }
  // keep track of callbacks, when all callbacks are done we
  // should call progressCallback with done: true

  // list the path, get the filesizes of each entry
  // getDirectoryStats(path).then(/*...*/);

  // then make an object of the top (numEntries-1) elements
  // and summarizing the rest into a numEntries'th element
  // invoke the progressCallback to let the UI re-render
  // and then continue the process for the directories
  // that are larger than minSize of the total
  return result;
}
