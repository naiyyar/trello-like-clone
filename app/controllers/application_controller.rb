class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  before_action :authenticate_user!

  helper_method :current_board

  def current_board
    @current_board ||= begin 
      Board.find(params[:board_id])
    rescue 
      Board.first
    end
  end
end
