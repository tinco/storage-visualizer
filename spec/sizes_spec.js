const sizes = require("../lib/sizes.js");
const path = require('path')

const pathsFixturePath = path.resolve("./spec/support/fixtures/paths");

describe("_getDirectoryStats", () => {
  const getDirectoryStats = sizes._getDirectoryStats;
  // function getDirectoryStats(path)
  // returns a promise for fs.Stats for all files and directories at the given path

  it("returns a promise that yields an array of file infos", (done) => {
    const promise = getDirectoryStats(pathsFixturePath);
    promise.then( infos => {
      expect(infos.length).toEqual(4);
      expect(infos[0].path).toEqual(path.resolve(pathsFixturePath, "dir_a"));
      expect(infos[0].isDirectory()).toEqual(true);
      done();
    });
  });
});

describe("_updateResults", () => {
  const updateResults = sizes._updateResults;

  // inserts a file info object into the results tree as described above
  // function updateResults(results, info) {
  it("inserts an info object into the results tree", () => {
    const results = {
      directories: {},
      files: {}
    }

    let info = {
      path: "/a/b/c",
      size: 1234,
      isDirectory: () => false
    }

    updateResults(results, info);
    expect(Object.keys(results)).toEqual(["directories", "files"]);
    expect(Object.keys(results.directories)).toEqual(["a"]);
    expect(results.directories.a.directories.b.files.c).toEqual(info);
  });
})
