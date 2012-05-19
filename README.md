## Process

### 1. Webpage scraping

Pour le screengrab de la page html que je suis en train de dev pour "Le Github", j'utilises phantomjs - http://www.phantomjs.org/ - qui exporte une image:

```
phantomjs rasterize.js
```

### 2. Image printing

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

