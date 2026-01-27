# Guardfile
# frozen_string_literal: true

ignore(
  %r{^_site/},
  %r{^\.git/},
  %r{^\.jekyll-cache/},
  %r{^\.jekyll-metadata/},
  %r{^\.sass-cache/},
  %r{^node_modules/},
  %r{^vendor/}
)

guard :bundler do
  require 'guard/bundler'
  require 'guard/bundler/verify'
  helper = Guard::Bundler::Verify.new

  files = ['Gemfile']
  files += Dir['*.gemspec'] if files.any? { |f| helper.uses_gemspec?(f) }

  # Assume files are symlinked from somewhere
  files.each { |file| watch(helper.real_path(file)) }
end

guard :rubocop, cli: ['-A'] do
  watch(%r{^lib/.+\.rb$})
  watch(%r{^spec/.+\.rb$})
end

# Guard::RSpec configuration for Jekyll
guard :rspec,
      cmd: 'bundle exec rspec',
      all_on_start: true,
      ignore_paths: ['_site', '.jekyll-cache'] do
  # Watch all spec files
  watch(%r{^spec/.+_spec\.rb$})

  # Watch spec_helper and run all specs when it changes
  watch('spec/spec_helper.rb') { 'spec' }

  # Jekyll content changes - rebuild and run specs
  # Watch all markdown files in root and subdirectories
  watch(/^(.+)\.md$/) { 'spec' }
  watch(/^(.+)\.markdown$/) { 'spec' }

  # Watch posts
  watch(%r{^_posts/.+\.(md|markdown|html)$}) { 'spec' }

  # Watch pages
  watch(%r{^_pages/.+\.(md|markdown|html)$}) { 'spec' }

  # Watch layouts
  watch(%r{^_layouts/.+\.html$}) { 'spec' }

  # Watch includes
  watch(%r{^_includes/.+\.html$}) { 'spec' }

  # Watch data files
  watch(%r{^_data/.+\.(yml|yaml|json|csv)$}) { 'spec' }

  # Watch config file
  watch('_config.yml') { 'spec' }

  # Watch assets (if they affect page rendering)
  watch(%r{^assets/.+\.(js|css|scss)$}) { 'spec' }

  # Watch HTML files
  watch(/^(.+)\.html$/) { 'spec' }
end

# Optional: Add Jekyll build guard to rebuild site before tests
# Uncomment if you want automatic Jekyll builds
# guard 'jekyll-plus', serve: false do
#   watch(%r{^(.+)\.md$})
#   watch(%r{^_posts/.+})
#   watch(%r{^_layouts/.+})
#   watch(%r{^_includes/.+})
#   watch('_config.yml')
# end
