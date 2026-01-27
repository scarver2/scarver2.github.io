# spec/features/home_spec.rb
# frozen_string_literal: true

# TODO: Load Capybara test environment
require_relative '../spec_helper'

describe '/', :js, type: :feature do
  before do
    skip 'TODO: Load Capybara test environment'
    visit '/'
  end

  it 'exists' do
    expect(page.status_code).to eq 200
  end

  it 'has html element' do
    expect(find('html')).to be_a Capybara::Node::Element
  end

  it 'has page title' do
    expect(find('h1')).to be_a Capybara::Node::Element
  end

  it 'has contact form' do
    expect(page.has_content?('contact-form')).to be true
  end

  it 'has contact css element' do
    expect(page.has_css?('.wrapper')).to be true
  end
end
