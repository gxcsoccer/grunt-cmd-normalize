var fs = require('fs'),
	path = require('path'),
	should = require('should');

describe('file', function() {
	var base = path.resolve('test/cases'),
		expected = path.resolve('test/expected'),
		dirs = fs.readdirSync(base);

	dirs.forEach(function(dir) {
		var files = fs.readdirSync(path.join(base, dir)).filter(function(file) {
			return (/\.expect$/).test(file);
		});
		if (files.length) {
			it('should test ' + dir, function() {
				files.forEach(function(file) {
					var expect = fs.readFileSync(path.join(base, dir, file));
					var actual = fs.readFileSync(path.join(expected, dir, file.replace(/\.expect$/, '')));
					expect.should.eql(actual);
				});
			});
		}
	});
});