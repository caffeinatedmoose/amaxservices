require "rack/jekyll"

run Rack::Jekyll.new

require 'rubygems'
require 'bundler'
Bundler.require
run FistFace