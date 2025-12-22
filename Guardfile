# frozen_string_literal: true

guard :rubocop, all_on_start: false, cli: ['-A'] do
  watch(%r{^_includes/.+\.(html|liquid)$})
  watch(%r{^_layouts/.+\.(html|liquid)$})
  watch(%r{^_data/.+\.ya?ml$})
  watch(%r{^assets/.+\.(js|css|svg|png|ico|mp3)$})
  watch(/^.*\.md$/)
  watch(/^_config\.yml$/)
end

ignore(/_site/)

guard 'jekyll' do
  watch(/.*/)
end
