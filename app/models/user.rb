class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :boards, dependent: :destroy
  has_many :board_invitations, dependent: :destroy
  has_many :invited_boards, through: :board_invitations, source: :board

  def name
    email.split('@')[0]
  end
end
