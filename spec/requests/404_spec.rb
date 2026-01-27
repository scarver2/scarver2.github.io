# spec/requests/404_spec.rb
# frozen_string_literal: true

require_relative '../spec_helper'

RSpec.describe 'Non-existent Pages', type: :request do
  describe 'GET /non-existent-page' do
    before { get '/non-existent-page' }

    it 'returns 404 Not Found' do
      expect(last_response).to be_not_found
    end
  end
end
