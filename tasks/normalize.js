/*
 * grunt-cmd-normalize
 *
 * Copyright (c) 2013 GaoXiaochen
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

	grunt.registerMultiTask('normalize', 'Normalize everything into cmd.', function() {
		var options = this.options({

		});

		var fname, destfile, count = 0;
		this.files.forEach(function(fileObj) {
			fileObj.src.forEach(function(fpath) {
				count++;

				if (fileObj.cwd) {
					// not expanded
					fname = fpath;
					fpath = path.join(fileObj.cwd, fpath);
				} else {
					fname = path.relative(fileObj.orig.cwd || '', fpath);
				}
				if (grunt.file.isDir(fpath)) return;

				destfile = path.join(fileObj.orig.dest || fileObj.dest, fname);

				grunt.file.copy(fpath, destfile);
			});
		});

		grunt.log.writeln('normalize ' + count.toString().cyan + ' files');
	});
};