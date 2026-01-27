# support/app.rb
# frozen_string_literal: true

require 'rack/jekyll'
require 'jekyll'

def project_root
  File.expand_path('../..', __dir__)
end

def config_path
  File.join(project_root, '_config.yml')
end

def site_dir
  File.join(project_root, '_site')
end

# Define the app method for Rack::Test
def app
  @app ||= begin
    # Check if site is built
    raise "Jekyll site not built. Run 'jekyll build' first. Expected: #{site_dir}" unless Dir.exist?(site_dir)

    Rack::Jekyll.new(
      force_build: false,
      source: project_root,
      destination: site_dir
    )
  end
end

def config
  # Load Jekyll site configuration
  @config ||= Jekyll.configuration({
                                     'source' => project_root,
                                     'destination' => site_dir
                                   })
end

# Helper to get Jekyll site directly when needed
# Only use this when you need to access Jekyll internals (like posts collection)
def site
  @site ||= begin
    site = Jekyll::Site.new(config)
    site.reset
    site.read
    site
  end
end

def posts
  @posts ||= site.posts.docs
end

def post_urls
  @post_urls ||= posts.map(&:url)
end
alias blog_urls post_urls

class FileNotFoundException < StandardError; end
class FolderNotFoundException < StandardError; end

# Add files and folders that are required for a valid Jekyll site
PROJECT_FILES = %w[_config.yml].freeze
PROJECT_FOLDERS = %w[_pages _posts _layouts _includes _data assets].freeze

def validate_project_folder
  PROJECT_FILES.each do |file|
    path = File.join(project_root, file)
    raise  FileNotFoundException, "File not found: #{path}" unless File.exist?(path)
  end

  PROJECT_FOLDERS.each do |folder|
    path = File.join(project_root, folder)
    raise  FolderNotFoundException, "Folder not found: #{path}" unless Dir.exist?(path)
  end
end

def build_site
  # incremental build to keep the DX responsive
  system("cd #{project_root} && bundle exec jekyll build --incremental --quiet")
end

def build_successful?
  validate_project_folder
  build_site
end
