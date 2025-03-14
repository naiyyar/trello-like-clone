class Board < ApplicationRecord
  include RankedModel
  ranks :row_order

  belongs_to :user
  has_many :lists, dependent: :destroy
  has_many :board_invitations, dependent: :destroy
  has_many :invited_users, through: :board_invitations, source: :user

  validates :name, presence: true
  validates :name, uniqueness: { scope: :user_id, message: 'Already taken, must be unique' }

  scope :accepted, -> { where(board_invitations: { status: :accepted }) }
  scope :pending, -> { where(board_invitations: { status: :pending }) }
  scope :rejected, -> { where(board_invitations: { status: :rejected }) }
end
