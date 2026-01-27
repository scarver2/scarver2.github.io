# spec/spec_helper.rb
# frozen_string_literal: true

require 'pry'
require 'rspec'
require 'rspec/its'
require 'rack/jekyll'
require 'rack/test'

require_relative 'support/app'
require_relative 'fixtures/pages'

RSpec.configure do |config|
  config.before(:suite) do
    # Run Jekyll build once before the entire test suite
    raise 'Jekyll cannot build site' unless build_successful?
  end

  config.include Rack::Test::Methods

  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  config.shared_context_metadata_behavior = :apply_to_host_groups
end
