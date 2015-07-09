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
  writer.writeln([1, 2, 3]);
  writer.writeln(123, 12.34);
  writer.writeln(true, false);
  writer.writeln('hello', "world");
  writer.writeln(null, undefined);
  writer.write({x:1, y:2});
  writer.writeln();
  writer.write([1, 2, 3]);
  writer.writeln();
  writer.write(123, 12.34);
  writer.writeln();
  writer.write(true, false);
  writer.writeln();
  writer.write('hello', "world");
  writer.writeln();
  writer.write(null, undefined);
  writer.writeln();
  writer.end();
}
