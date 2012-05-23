# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "le_github/version"

Gem::Specification.new do |s|
  s.name        = "le_github"
  s.version     = LeGithub::VERSION
  s.authors     = ["Alx"]
  s.email       = ["hi@alexgirard.com"]
  s.homepage    = "https://github.com/alx/Le-Github"
  s.description = %q{GitHub Data Challenge experiment with Adafruit Thermo Printer}
  s.summary     = %q{Need something to read for breakfast?}

  s.add_dependency 'yajl-ruby', "~> 1.1.0"
  s.add_dependency 'json', "~> 1.6.5"
  s.add_dependency 'a2_printer', "~> 0.1.0"
  s.add_dependency 'rmagick', "~> 2.13.1"

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]
end
