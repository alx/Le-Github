## Process

### BigQuery import

https://github.com/igrigorik/githubarchive.org

### Page Layout and d3.js graphs

Zurb foundation

d3js.org

http://zmoazeni.github.com/github-data/bubble/

### Webpage scraping

Pour le screengrab de la page html que je suis en train de dev pour "Le Github", j'utilises phantomjs - http://www.phantomjs.org/ - qui exporte une image:

```
phantomjs --local-to-remote-url-access=yes rasterize.js
```

### Image printing

puis je passe cette image dans la lib a2_printer:

```
require 'rubygems'
require 'a2_printer'

serial = SerialConnection.new
printer = A2Printer.new serial

printer.begin
printer.set_default
printer.print_image("/Users/alx/code/le_github/output.jpg")
```

