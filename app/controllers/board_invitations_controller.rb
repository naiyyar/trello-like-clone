class BoardInvitationsController < ApplicationController
  before_action :authenticate_user!

  def create
    @board = Board.find(params[:board_id])
    invitation = @board.board_invitations.new(invitation_params)
    invitation.user = current_user
    invitation.status = :pending

    if invitation.save
      BoardInvitationMailer.invite_email(invitation).deliver_later
      redirect_to @board, notice: "Invitation sent successfully."
    else
      redirect_to @board, alert: "Failed to send invitation."
    end
  end

  def accept
    invitation = BoardInvitation.find_by(token: params[:token])
    
    if invitation&.pending?
      user = User.find_by(email: invitation.email)
      if user
        invitation.board.users << user
        invitation.accepted!  # Update status using enum method
        redirect_to invitation.board, notice: "You have joined the board!"
      else
        redirect_to root_path, alert: "Invalid invitation."
      end
    else
      redirect_to root_path, alert: "Invitation is no longer valid."
    end
  end

  private

  def invitation_params
    params.require(:board_invitations).permit(:email)
  end
end
