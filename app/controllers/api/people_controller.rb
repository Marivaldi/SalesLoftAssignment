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
end
