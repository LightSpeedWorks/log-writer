# log-writer.js

# LogWriter {ログファイル出力}

```js
var LogWriter = require('log-writer');
var writer = new LogWriter('log-file-name-%s.log');
writer.write('write\r\n');
writer.writeln('writeln');
writer.end();
```

## LogManagerのログ出力用に使用する場合：

```js
var LogManager = require('log-manager');
LogManager.setWiter(writer);
var log = LogManager.getLogger();
log.trace(msg, arg1, arg2, ...);
log.debug(msg, arg1, arg2, ...);
log.info(msg, arg1, arg2, ...);
log.warn(msg, arg1, arg2, ...);
log.error(msg, arg1, arg2, ...);
log.fatal(msg, arg1, arg2, ...);
```
