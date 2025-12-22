# frozen_string_literal: true

source 'https://rubygems.org'

# GitHub notes: Actions is now the recommended Pages deployment path.
# The github-pages gem is still useful locally to stay in sync with Pages dependency sets.
# https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll
gem 'github-pages', group: :jekyll_plugins

group :development do
  gem 'faraday-retry'
end

group :development, :test do
  gem 'capybara', require: false
  gem 'guard', require: false
  gem 'guard-bundler', require: false
  gem 'guard-jekyll', require: false
  gem 'guard-rubocop', require: false
  gem 'rack-test', require: false
  gem 'rspec', require: false
  gem 'rubocop', require: false
  gem 'rubocop-performance', require: false
  gem 'rubocop-rake', require: false
  gem 'rubocop-rspec', require: false
end
