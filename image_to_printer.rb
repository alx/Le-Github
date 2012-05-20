require 'rubygems'
require 'a2_printer'
require 'RMagick'
require 'date'
require 'open-uri'
require 'zlib'
require 'yajl'
require 'json'

def json_counter(data, json, key)
  data.select{|event| event["type"] == key}.each do |event|
    repo_name = event["repository"]["name"]
    if existing_event = json[key].select{|repo| repo["repository"]["name"] == repo_name}.first
      existing_event["count"] += 1
    else
      json[key] << event.merge({"count" => 1})
    end
  end
end

def import_bigdata
  date = (DateTime.now - 2).strftime("%Y-%m-%d")
  data = []
  24.times do |index|
    url = "http://data.githubarchive.org/#{date}-#{index}.json.gz"
    p "parsing #{url}"
    gz = open(url)
    js = Zlib::GzipReader.new(gz).read
    data.concat(Yajl::Parser.parse("[" + js.gsub("}{", "},{") + "]"))
  end

  json_data = {
    "DownloadEvent" => [],
    "CommitCommentEvent" => [],
    "ForkEvent" => [],
    "PullRequestReviewCommentEvent" => [],
    "PullRequestEvent" => [],
    "IssueCommentEvent" => [],
    "IssuesEvent" => [],
    "PushEvent" => [],
    "WatchEvent" => []
  }
  json_data.each_key{|key| json_counter(data, json_data, key)}

  json_data.each do |key, repos|
    repos.sort!{|a, b| b["count"] <=> a["count"]}.slice!(5, repos.length)
    repos.map! do |repo|
      {
        "count" => repo["count"], 
        "name" => repo["repository"]["name"],
        "owner" => repo["repository"]["owner"],
        "language" => repo["repository"]["language"]
      }
    end
  end

  File.open("data-#{date}.json", "w") do |file|
    file.write json_data.to_json
  end
end

def print
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
end

print
