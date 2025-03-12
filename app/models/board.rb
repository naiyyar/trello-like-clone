class Board < ApplicationRecord
  include RankedModel
  ranks :row_order

  belongs_to :user
  has_many :lists, dependent: :destroy

  validates :name, presence: true
  validates :name, uniqueness: { scope: :user_id, message: 'must be unique' }
end
