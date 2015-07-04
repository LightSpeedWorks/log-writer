// log-writer-test.js

'use strict';

var LogWriter = require('../log-writer');

LogWriterTest_test();

function LogWriterTest_test() {
  var writer = new LogWriter('log-writer-ex-%s.log');
  writer.write('log-writer-test write\r\n');
  writer.writeln('log-writer-test writeln');
  writer.write('log-writer-test write\r\n');
  writer.writeln('log-writer-test writeln');
  writer.writeln({x:1, y:2});
  writer.writeln();
  writer.end();
}
