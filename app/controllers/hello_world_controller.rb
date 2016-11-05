class HelloWorldController < ApplicationController
  def index
    @hello_world_props = { name: "Kaysser" }
  end
end
