class HomeController < ApplicationController
	def index
		@hello_world_props = { name: "Kaysser" }
	end

	def search
		p params
		@origin = params[:origin]
		@destination = params[:destination]
		render('search_results')
	end
end
