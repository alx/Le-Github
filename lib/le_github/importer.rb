require "le_github/version"
require 'date'
require 'open-uri'
require 'zlib'
require 'yajl'
require 'json'

module LeGithubImporter
  def self.from_date(date, output)
    data = []
    2.times do |index|
      url = "http://data.githubarchive.org/#{date.strftime("%Y-%m-%d")}-#{index}.json.gz"
      p "parsing #{url}"
      gz = open(url)
      js = Zlib::GzipReader.new(gz).read
      data.concat(Yajl::Parser.parse("[" + js.gsub("}{", "},{") + "]"))
    end
    
    json_data = {
      "ForkEvent" => [],
      "DownloadEvent" => [],
      "IssuesEvent" => [],
      "PullRequestEvent" => [],
      "PushEvent" => [],
      "WatchEvent" => []
    }

    json_data.each_key do |key| 
      p "DataCount for #{key}"
      data.select{|event| event["type"] == key}.each do |event|
        repo_name = event["repository"]["name"]
        if existing_event = json_data[key].select{|repo| repo["repository"]["name"] == repo_name}.first
          existing_event["count"] += 1
        else
          json_data[key] << event.merge({"count" => 1})
        end
      end
    end
    
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
    
    File.open(output, "w") do |file|
      file.write json_data.to_json
    end
  end
end
