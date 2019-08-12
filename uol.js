phantom.casperPath = '/usr/local/lib/node_modules/casperjs/';
phantom.injectJs(phantom.casperPath + '/bin/bootstrap.js');

var casper = require('casper').create();
var fs = require('fs');
var url = 'https://www.uol.com.br';

casper.start();

casper.then(function() {
  stream = fs.open('uol.csv','aw');
  stream.writeLine('News', 'a');
  stream.flush();
  stream.close();
  this.echo('** Csv sheet created **');
  casper.thenOpen(url, function() {
    var news = this.getElementsInfo('h2.titulo.color2');
    var i = 0;
    limit = news.length;
    this.echo('** Filling data to csv file **');
    casper.repeat(limit, function() {
      stream = fs.open('uol.csv','aw');
      stream.writeLine(news[i].text, 'a');
      stream.flush();
      stream.close();
      i++;
    });
  });
});
casper.run();
