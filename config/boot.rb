ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../Gemfile', __dir__)

require 'bundler/setup' # Set up gems listed in the Gemfile.
require 'logger'  # Require logger gem for Rails 6.1 with Ruby 2.6
require 'bootsnap/setup' # Speed up boot time by caching expensive operations.
