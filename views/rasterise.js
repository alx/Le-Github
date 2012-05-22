var page = new WebPage(),
    address, output, size;

if (phantom.args.length != 2 ) {
  console.log('Usage: rasterize.js YYYY-MM-DD output');
  phantom.exit();
} else {
  page.viewportSize = { width: 384, height: 10 };
  page.open("../index.html#" + phantom.args[0], function (status) {
    if (status !== 'success') {
      console.log('Unable to load the address "' + address + '"');
      phantom.exit(1);
    } else {
      page.evaluate(function() {
        document.getElementsByTagName("body")[0].className = ""
      });
      window.setTimeout(function () {
        page.render(phantom.args[2]);
        phantom.exit();
      }, 200);
    }
  });
};
