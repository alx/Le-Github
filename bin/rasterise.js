var page = new WebPage(),
    address, output, size;

page.viewportSize = { width: 384, height: 10 };
page.open("index.html", function (status) {
  if (status !== 'success') {
    console.log('Unable to load the address "' + address + '"');
    phantom.exit(1);
  } else {
    page.evaluate(function() {
      document.getElementsByTagName("body")[0].className = ""
    });
    window.setTimeout(function () {
      page.render("output.jpg");
      phantom.exit();
    }, 200);
  }
});
