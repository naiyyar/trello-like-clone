class BoardInvitationMailer < ApplicationMailer
  default from: 'no-reply@example.com'  # Update with your email

  def invite_email(invitation)
    @invitation = invitation
    @url = accept_invitation_url(token: @invitation.token)

    mail(to: @invitation.email, subject: "You're invited to join the board: #{@invitation.board.name}")
  end
end
