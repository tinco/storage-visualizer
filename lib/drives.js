const drivelist = require('drivelist');
const prettysize = require('prettysize');
const diskspace = require('diskspace');

cache = {
  drives: {}
}

const present = (rawDrive) => {
  return {
    device: rawDrive.device,
    size: rawDrive.size,
    mountpoint: rawDrive.mountpoints[0],
    formattedSize: prettysize(rawDrive.size)
  }
}

const list = () => {
  return new Promise( (resolve, reject) => {
    drivelist.list((error, drives) => {
      if (error) {
        reject(error);
      }
      cache.drives = {};
      drives.forEach( (drive) => {
        cache.drives[drive.device] = present(drive);
      });
      resolve(drives)
    });
  });
}

const getDrive = (device) => {
  return cache.drives[device];
}

const getDriveUsage = (device) => {
  return new Promise( (resolve, reject) => {
    const drive = cache.drives[device];
    const mountpoint = drive.mountpoint;
    if(!mountpoint) {
      return reject("No mountpoint for " + device);
    }
    diskspace.check(mountpoint.path, function(err, info) {
      if (err) {
        reject(err);
      } else {
        const drive = cache.drives[device];
        drive.used = info.used;
        drive.free = info.free;
        drive.formattedUsed = prettysize(drive.used);
        drive.formattedFree = prettysize(drive.free);
        resolve(drive);
      }
    });
  });
}

exports.list = list;
exports.getDrive = getDrive;
exports.getDriveUsage = getDriveUsage;
