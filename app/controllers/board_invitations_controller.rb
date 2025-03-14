class BoardInvitationsController < ApplicationController
  before_action :authenticate_user!

  def create
    @board = Board.find(params[:board_id])
    invitation = @board.board_invitations.new(invitation_params)
    invitation.user = current_user
    invitation.status = :pending

    respond_to do |format|
      if invitation.save
        BoardInvitationMailer.invite_email(invitation).deliver_now
        format.turbo_stream      
      else
        format.turbo_stream { 
          render turbo_stream: turbo_stream.update('error-message', partial: 'boards/error'), status: :unprocessable_entity 
        }
      end
    end
  end

  def accept
    invitation = BoardInvitation.find_by(token: params[:token])
    
    if invitation&.pending?
      user = User.find_by(email: invitation.email)
      if user
        invitation.update(user: user, status: :accepted)
        flash[:notice] = "You have joined the board!"
        redirect_to root_path
      else
        flash[:alert] = "Invalid invitation."
        redirect_to root_path
      end
    else
      redirect_to root_path, alert: "Invitation is no longer valid."
    end
  end

  private

  def invitation_params
    params.expect(board_invitation: [ :email ])
  end
end
