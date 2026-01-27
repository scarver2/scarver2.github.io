# spec/requests/blog_spec.rb
# frozen_string_literal: true

require 'spec_helper'

RSpec.describe 'Blog Pages', type: :request do
  describe 'GET blog index page' do
    it 'returns 200 OK for /blog/' do
      get '/blog/'
      expect(last_response).to be_ok
    end
  end

  describe 'GET requests to blog posts' do
    it 'finds blog posts to test' do
      expect(blog_urls).not_to be_empty
    end

    blog_urls.each do |url|
      it "returns 200 OK for #{url}" do
        get url
        expect(last_response).to be_ok
      end
    end
  end
end
