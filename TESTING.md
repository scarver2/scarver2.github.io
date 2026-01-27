# Jekyll Site Testing with RSpec

This test suite allows you to test your Jekyll site's page availability using RSpec.

## Setup

1. **Install dependencies:**
   ```bash
   bundle install
   ```

2. **Build your Jekyll site:**
   ```bash
   jekyll build
   ```

3. **Create the spec directory structure:**
   ```bash
   mkdir -p spec
   mv spec_helper.rb spec/
   mv page_availability_spec.rb spec/
   ```

## Running Tests

Run all tests:
```bash
rspec
```

Run with detailed output:
```bash
rspec --format documentation
```

## Configuration

Edit `spec/page_availability_spec.rb` and update the `ENDPOINTS` array with your Jekyll site's pages:

```ruby
ENDPOINTS = [
  '/',
  '/about/',
  '/blog/',
  '/contact/',
  '/projects/',
].freeze
```

## Alternative: Testing the Live Server

If you prefer to test against a running Jekyll server instead of using Rack::Jekyll:

1. Start your Jekyll server:
   ```bash
   jekyll serve
   ```

2. Use this alternative spec_helper.rb:
   ```ruby
   require 'rspec'
   require 'net/http'
   
   BASE_URL = 'http://localhost:4000'
   
   RSpec.configure do |config|
     config.expect_with :rspec do |expectations|
       expectations.include_chain_clauses_in_custom_matcher_descriptions = true
     end
   end
   ```

3. Update your tests to use Net::HTTP:
   ```ruby
   it "returns 200 OK for #{endpoint}" do
     uri = URI("#{BASE_URL}#{endpoint}")
     response = Net::HTTP.get_response(uri)
     expect(response.code).to eq('200')
   end
   ```

## Notes

- Jekyll URLs typically end with `/` (e.g., `/about/` not `/about`)
- Make sure your Jekyll site is built before running tests with Rack::Jekyll
- The `force_build: false` option assumes your site is pre-built for faster tests
