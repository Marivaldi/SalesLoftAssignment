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
        email_addresses = get_email_addresses

        character_counts = count_unique_characters_in email_addresses
        email_character_tallies = tally_up character_counts
        render json: email_character_tallies.sort_by { |hsh| hsh[:character] }
    end

    def possible_duplicate_email_addresses
        email_addresses = get_email_addresses

        possible_duplicates = possible_duplicate email_addresses
        render json: possible_duplicates
    end

    private

    def get_email_addresses
        response = @conn.get
        response_body = JSON.parse(response.body, :symbolize_names => true)
        people = response_body[:data]
        people.map do |hash|
            hash[:email_address]
        end
    end

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

    def possible_duplicate(email_addresses)
        possible_duplicates = [];
        email_addresses.each_with_index do |email1, index_of_first|
            email_addresses.each_with_index do |email2, index_of_second|
                next if index_of_first == index_of_second

                difference = difference_between(first: email1, second: email2)

                if difference <= 2
                    possible_duplicates.push email2 unless possible_duplicates.include? email2
                    possible_duplicates.push email1 unless possible_duplicates.include? email1
                end
            end
        end

        possible_duplicates
    end

    def difference_between(first:, second:)
        # Levenshtein Distance Algorithm.
        # Calculates the minimum number of edits required to change one word into another.
        # From https://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Levenshtein_distance#Ruby
        m, n = first.length, second.length
        return m if n == 0
        return n if m == 0

        d = Array.new(m+1) {Array.new(n+1)}
        0.upto(m) { |i| d[i][0] = i }
        0.upto(n) { |j| d[0][j] = j }

        1.upto(n) do |j|
          1.upto(m) do |i|
            d[i][j] = first[i-1] == second[j-1] ? d[i-1][j-1] : [d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+1,].min
          end
        end
        d[m][n]
      end
end
