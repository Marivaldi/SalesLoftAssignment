require 'faraday'
require 'json'
class  Api::PeopleController < Api::BaseController
    respond_to :json

    def initialize
        token = ENV['SALESLOFT_API_KEY']
        url = "https://api.salesloft.com/v2/people.json"
        @conn = Faraday.new(url: url) do |faraday|
            faraday.headers['Authorization'] = "Bearer #{token}"
            faraday.headers['Content-Type'] = 'application/json'
            faraday.headers['User-Agent'] = 'SalesLoftCodingAssignment'
            faraday.adapter Faraday.default_adapter
        end
    end

    def index
        response = @conn.get
        response_body = JSON.parse(response.body, :symbolize_names => true)
        people = response_body[:data]
        people = people.map do |hash|
            { email_address: hash[:email_address], display_name: hash[:display_name] , title: hash[:title]}
        end

        render json: people
    end

    def email_character_counts
        response = @conn.get
        response_body = JSON.parse(response.body, :symbolize_names => true)
        people = response_body[:data]
        email_addresses = people.map do |hash|
            hash[:email_address]
        end

        character_counts = count_unique_characters_in email_addresses
        email_character_tallies = tally_up character_counts
        render json: email_character_tallies
    end

    private

    def count_unique_characters_in(words)
        character_counts = {}

        words.each do |word|
            word.each_char do |char|
                if character_counts.include?(char)
                    character_counts[char] += 1
                else
                    character_counts[char] = 1
                end
            end
        end

        character_counts
    end

    def tally_up(counts)
        counts.map do |k, v|
            {:character => k, :count => v}
        end
    end
end
