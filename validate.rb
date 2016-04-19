#!/usr/bin/env ruby
#
# Original accessed in July 2015 by Simon Sigurdhsson.
# https://github.com/urdh/blog/blob/gh-pages/validate.rb
#
# Modifications in July 2015 by Brandon Amos <http://bamos.github.io>.
# https://github.com/bamos/bamos.github.io/blob/master/validate.rb

require 'rubygems'
require 'nokogiri'
require 'html5_validator'
require 'w3c_validators'
require 'colorize'
require 'open-uri'

puts "Validating jekyll output in '_site/'..."
puts "\n"
failed = 0
passed = 0
skipped = 0

IGNORED_FILES = [
  '_site/data/2014-07-28/blueimp-gallery.css',
  '_site/data/2014-12-15/Blueprint-VerticalTimeline/css/component.css',
  '_site/css/font-awesome.min.css'
]

class XMLValidator < W3CValidators::Validator
  def validate_file(file)
    if file.respond_to? :read
      src = file.read
      file_path = file.path ||= nil
    else
      src = read_local_file(file)
      file_path = file
    end

    begin
      document = Nokogiri::XML(src)
      @results = if document.xpath('*/@xsi:schemaLocation').empty?
                   W3CValidators::Results.new({:uri => nil, :validity => true})
                 else
                   schema_uri = document.xpath('*/@xsi:schemaLocation').to_s.split[1]
                   schema = Nokogiri::XML::Schema(open(schema_uri).read)
                   errors = schema.validate(document)
                   r = W3CValidators::Results.new(
                     {:uri => nil, :validity => errors.empty?}
                   )
                   errors.each { |msg|
                     r.add_error({ :message => msg.to_s }) if msg.error?
                   }
                   r
                 end
    rescue
      @results = W3CValidators::Results.new(
        {:uri => nil, :validity => false}
      )
      @results.add_error({ :message => 'Nokogiri threw errors on input.' })
    end
    @results
  end
end

class HtmlValidator < W3CValidators::Validator
    def validate_file(file)
        if file.respond_to? :read
            src = file.read
            file_path = file.path ||= nil
        else
            src = read_local_file(file)
            file_path = file
        end

        validator = Html5Validator::Validator.new
        validator.validate_text(src)
        @results = W3CValidators::Results.new(
          {:uri => nil, :validity => validator.valid?}
        )
        validator.errors.each { |err|
          @results.add_error({ :message => err['message'] })
        }
        @results
    end
end

Dir.glob("_site/**/*") do |file|
  next if File.directory?(file)
  next if IGNORED_FILES.include? file
  next if file.include? "vendor"

  validator = case File.extname(file)
              when '.html'
                HtmlValidator.new
              when '.xml'
                if File.basename(file) == 'atom.xml'
                  W3CValidators::FeedValidator.new
                else
                  XMLValidator.new
                end
              when '.css'
                W3CValidators::CSSValidator.new
              else
                skipped += 1
                # puts file.colorize(:light_black)
                next
              end

  errors = nil
  begin
    errors = validator.validate_file(file).errors
  rescue => e
    puts
    puts file
    puts '  + Warning: Unable to validate:'
    puts '==========='
    puts e
    puts '==========='
    puts
  end
  if errors.nil?
  elsif errors.empty?
    puts file.colorize(:green)
    passed += 1
  else
    puts file.colorize(:red)
    puts errors
    failed += 1
  end
end

puts "\n"
puts "#{passed} files pass validation, #{failed} files failed."
exit failed
