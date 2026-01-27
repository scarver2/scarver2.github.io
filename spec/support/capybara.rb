# spec/support/capybara.rb
# frozen_string_literal: true

# Add Capybara support
require_relative 'spec_helper'
require 'capybara/rspec'
require 'capybara/dsl'

# Configure Capybara to use Rack::Jekyll
Capybara.app = app

RSpec.configure do |config|
  config.include Capybara::DSL
end
