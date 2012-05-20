require 'rubygems'
require 'a2_printer'
require 'RMagick'

serial = SerialConnection.new
printer = A2Printer.new serial

printer.begin
printer.set_default

source = "/Users/alx/code/le_github/output.jpg"
image = Magick::Image::read(source).first

if(image.rows < 384)
  printer.print_image(source)
else
  p "large_image"
  images = []
  # cut images in 384px height images
  ((image.rows / 384) + 1).times do |index|
    image_source = source.gsub(".jpg", "_#{index}.jpg")

    cut_image = image.crop(0,index*384,384,384)
    cut_image.write image_source

    images << image_source
  end
  images.each do |image_source|
    p image_source
    printer.print_image(image_source)
  end
end
