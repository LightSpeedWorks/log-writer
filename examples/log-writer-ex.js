// log-writer-test.js

'use strict';

var LogWriter = require('../log-writer');

var writer = new LogWriter('log-writer-ex-%s.log');
test();
setTimeout(test, 500);
setTimeout(test, 1000);
setTimeout(test, 1500);
setTimeout(test, 2000);
setTimeout(test, 5000);
setTimeout(test, 8000);
setTimeout(function () { writer.end(); }, 12000);

function test() {
  console.log('test');
  writer.write('==============================\r\n');
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
}
