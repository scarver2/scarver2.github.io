# Gemfile
# frozen_string_literal: true

source 'https://rubygems.org'

ruby '3.3.10'

group :jekyll_plugins do
  gem 'github-pages'
  gem 'jekyll-feed'
  gem 'jekyll-redirect-from'
  gem 'jekyll-seo-tag'
  gem 'jekyll-sitemap'
end

group :jekyll_tools do
  gem 'faraday-retry'
end

group :development do
  gem 'guard', require: false
  gem 'guard-bundler', require: false
  gem 'guard-rspec', require: false
  gem 'guard-rubocop', require: false
  gem 'guard-shell', require: false
end

group :test do
  gem 'rspec', require: false
  gem 'rspec-its', require: false
end

group :development, :test do
  gem 'pry'
  gem 'rack-jekyll', require: false
  gem 'rack-test', require: false
  gem 'rubocop', require: false
  gem 'rubocop-rspec', require: false
end
