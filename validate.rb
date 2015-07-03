#!/usr/bin/env ruby
#
# Original by Simon Sigurdhsson at
# https://github.com/urdh/blog/blob/gh-pages/validate.rb
#
# Modifications by Brandon Amos, http://bamos.github.io

require 'rubygems'
require 'nokogiri'
require 'html5_validator'
require 'w3c_validators'
require 'colorize'
require 'open-uri'

IGNORED_FILES = [
]

# Hack: w3c_validators doesn't provide a generic XML validator.
# We provide a replacement based on Nokogiri with compatible interface.
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
                r = W3CValidators::Results.new({:uri => nil, :validity => errors.empty?})
                errors.each { |msg| r.add_message(:error, msg.to_s) if msg.error? }
            end
        rescue
            @results = W3CValidators::Results.new({:uri => nil, :validity => false})
            @results.add_message(:error, 'Nokogiri threw errors on input.')
        end
        @results
    end
end

# Hack: W3CValidators::NuValidator seems broken and the gem looks unmaintained.
# We provide our own replacement based on the html5_validator gem, with compatible interface.
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
        @results = W3CValidators::Results.new({:uri => nil, :validity => validator.valid?})
        validator.errors.each { |err| @results.add_message(:error, err['message']) }
        @results
    end
end

puts "Validating jekyll output in '_site/'..."
puts "\n"
failed = 0
passed = 0
skipped = 0

# Iterate over all the site files and validate them as appropriate.
Dir.glob("_site/**/*") do |file|
    # Skip ignored files and all directories
    next if File.directory?(file)
    next if IGNORED_FILES.include? file

    # Since all validators have compatible interfaces, we create the appropriate instance...
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
        puts file.colorize(:light_black)
        next
    end

    # ... and then run the validation.
    if validator.validate_file(file).errors.empty?
        puts file.colorize(:green)
        passed += 1
    else
        puts file.colorize(:red)
        failed += 1
    end
end

puts "\n"
puts "#{passed} files pass validation, #{failed} files failed."
exit failed
