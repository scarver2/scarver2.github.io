# spec/requests/pages_spec.rb
# frozen_string_literal: true

require_relative '../spec_helper'

RSpec.describe 'Pages', type: :request do
  ENDPOINTS.each do |endpoint|
    describe "GET #{endpoint}" do
      before { get endpoint }

      it 'returns 200 OK' do
        expect(last_response).to be_ok
      end
    end
  end
end
