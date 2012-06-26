# Le Github : a daily newspaper with Github Data

## Requirements

* [1 Arduino](http://arduino.cc)
* [1 Adafruit Thermo Printer](http://adafruit.com/products/600)
* **le_github** gem: 

```
gem install le_github
```


## Howto

Just one command, every morning before breakfast: 

```
le_github
```

## Workflow

![Workflow diagram](https://github.com/alx/Le-Github/raw/master/views/images/workflow.png)

### Arduino programming

You'll need an Arduino for this setup, it'll just be used as a passthrough to your a2_printer.

To do so:

* Connect your a2_printer rx/tx wires to your arduino rx/tx pins (usually, digital pins 0 and 1)
* program your arduino with an empty sketch
* now, reading and writing on usb device from your host will go through your arduino to speak with your a2_printer

### Data import

Instead of using directly Google BigQuery, **LeGithubImporter** is fetching its data from [Github Archive](https://github.com/igrigorik/githubarchive.org) website to build a large json of the last day, and to map it to something way lighter for later display in *views/index.html*

### Page Layout

*views/index.html* is designed using [Foundation](http://foundation.zurb.com/) prototyping framework from [Zurb](http://www.zurb.com)

### Webpage scraping

Discovered in [Freerange Printer](https://github.com/freerange/printer/) project, you can use [PhantomJS](http://www.phantomjs.org/) to render a webpage in an image file:

```
phantomjs --local-to-remote-url-access=yes rasterize.js YYYY-MM-DD /tmp/output.jpg
```

### Image printing

[a2_printer](http://github.com/alx/a2_printer) lib can be used to send
the rendered image file to the thermo-printer:

```
require 'rubygems'
require 'a2_printer'

serial = SerialConnection.new
printer = A2Printer.new serial

printer.begin
printer.set_default
printer.print_image("/tmp/output.jpg")
```

**LeGithubPrinter** allows to split the image file to inject because only
384x384 pixels image are currently accepted in **a2_printer** lib

## Result

![Edition du 20/05/2012](https://github.com/alx/Le-Github/raw/master/views/images/example.jpg)

![on paper](http://i.imgur.com/SS3Ta.jpg)
