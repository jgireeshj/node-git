'use strict';
var runner = require('../runner');

// TODO: still not test
var Log = function(symbol) {
	var logMsg = symbol.split('\n'),
		BODY_START_LINE_INDEX = 8,
		attrIndex = 0,
		bodyParser = function(lines) {
			var bodyLines = lines.slice(BODY_START_LINE_INDEX - 1),
				bodyFullText = bodyLines.join('\n'),
				bodyValidText = bodyFullText.substring(1, bodyFullText.length);
			return bodyValidText;
		};

	return {
		'commitId': logMsg[attrIndex++],
		'author': logMsg[attrIndex++],
		'authorEmail': logMsg[attrIndex++],
		'committer': logMsg[attrIndex++],
		'committerEmail': logMsg[attrIndex++],
		'commitDate': logMsg[attrIndex++],
		'commitRelateDate': logMsg[attrIndex++],
		'commitSubject': logMsg[attrIndex++],
		'commitBody': bodyParser(logMsg) // need cobime left lines
	};
};


function parse(result) {
	var allLogsMsg = result.split('\n\n'),
		logs = [], logMsg;

	allLogsMsg.map(function(logMsg) {
		logs.push(Log(logMsg));
	});
	return logs;
}

module.exports = function() {
	var needOutputFormat = [
		// commit hash
		'%H',
		// author name
		'%an',
		// author email
		'%ae',
		// committer name
		'%cn',
		// committer email
		'%ce',
		// committer date
		'%cd',
		// committer date, relative
		'%cr',
		// commit subject
		'%s', 
		// commit body
		':%b:',
		// last end line
		'%n'
	];

	return runner.execute(['git', 'log', needOutputFormat.join('%n'), '']);
};