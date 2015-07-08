// log-writer.js

// LogWriter {ログファイル出力}

// var LogWriter = require('log-writer');
// var writer = new LogWriter('log-file-name-%s.log');
// writer.write('write\r\n');
// writer.writeln('writeln');
// writer.end();

// LogManagerで使用する場合：

// var LogManager = require('log-manager');
// LogManager.setWiter(writer);
// var log = LogManager.getLogger();
// log.trace(msg, arg1, arg2, ...);
// log.debug(msg, arg1, arg2, ...);
// log.info(msg, arg1, arg2, ...);
// log.warn(msg, arg1, arg2, ...);
// log.error(msg, arg1, arg2, ...);
// log.fatal(msg, arg1, arg2, ...);

(function () {
  'use strict';

  var fs = require('fs');
  var util = require('util');

  var toDateString = require('date-time-string').toDateString;

  var CRLF = '\r\n';

  //######################################################################
  /**
   * class LogWriter {ログ・マネージャ・クラス}
   */
  function LogWriter(file) {
    if (!(this instanceof LogWriter))
      return new LogWriter(file);

    this.$color = false;
    this.setFile(file);
  }


  // class LogWriter methods {ログ・マネージャ・クラスのメソッド}
  LogWriter.prototype.setFile   = LogWriter_setFile;
  LogWriter.prototype.setColor  = LogWriter_setColor;
  LogWriter.prototype.write     = LogWriter_write;
  LogWriter.prototype.writeln   = LogWriter_writeln;
  LogWriter.prototype.end       = LogWriter_end;


  //======================================================================
  // LogWriter setFile ファイル設定
  function LogWriter_setFile(file) {
    if (typeof file !== 'string')
      throw new Error('LogWriter_setFile: file name must be string');

    this.$file = file;
    this.$writer = null;
    this.$date = null;
    this.$timer = null;
    var that = this;
    this.$timeout = function () {
      that.end();
    }
    return this;
  }


  //======================================================================
  // LogWriter setColor ファイル設定
  function LogWriter_setColor(color) {
    if (typeof color !== 'boolean')
      throw new Error('LogWriter_setColor: color must be boolean');

    this.$color = color;
    return this;
  }


  //======================================================================
  // LogWriter write 出力
  function LogWriter_write() {
    var msg = LogWriter_format.apply(this, arguments);

    var dt = toDateString();
    if (!this.$writer || this.$date !== dt) {
      this.$date = dt;
      if (this.$writer) this.$writer.end();
      this.$writer = fs.createWriteStream(util.format(this.$file, dt), {flags: 'a'});
    }

    this.$writer.write(msg);
    return this;
  }


  //======================================================================
  // LogWriter writeln 出力(改行)
  function LogWriter_writeln() {
    var msg = LogWriter_format.apply(this, arguments) + CRLF;

    var dt = toDateString();
    if (!this.$writer || this.$date !== dt) {
      this.$date = dt;
      if (this.$writer) this.$writer.end();
      this.$writer = fs.createWriteStream(util.format(this.$file, dt), {flags: 'a'});
    }

    this.$writer.write(msg);
    return this;
  }


  //======================================================================
  // LogWriter end 終了
  function LogWriter_end() {
    if (this.$writer) {
      this.$writer.end();
      this.$writer = null;
    }
    return this;
  }


  //======================================================================
  // LogWriter inspect 探索/インスペクト
  function LogWriter_inspect(obj) {
    return util.inspect(obj, {showHidden: false, depth: null, colors: false});
  }


  //======================================================================
  // LogWriter format 整形/フォーマット
  function LogWriter_format() {
    for (var i = 0, n = arguments.length; i < n; ++i) {
      if (typeof arguments[i] === 'object') {
        if (arguments[i] instanceof Buffer)
          arguments[i] = arguments[i].toString();
        else
          arguments[i] = LogWriter_inspect(arguments[i]);
      }
      if (typeof arguments[i] !== 'string')
        arguments[i] = arguments[i].toString();
    }

    var str = util.format.apply(util, arguments)
    if (this.$color) return str;

    return str.replace(/\x1b\[(\d+)?(;\d+?)*m/g, '|');
  }


  //######################################################################
  if (typeof module === 'object' && module && module.exports)
    module.exports = LogWriter;

})();
