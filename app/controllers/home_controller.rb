class HomeController < ApplicationController
	def index
		@hello_world_props = { name: "Kaysser" }
	end

	def search
		p params
		@origin = params[:origin]
		@destination = params[:destination]

		bus_data = Hash.from_xml(Net::HTTP.get(URI.parse('http://www.miamidade.gov/transit/WebServices/Buses/?')))['RecordSet']['Record']
		
		@data = {
			:origin => @origin,
			:destination => @desination,
			:bus_data => bus_data
		}

		render :json => @data
		
	end
end
