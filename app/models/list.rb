class List < ApplicationRecord
  belongs_to :board
  has_many :tasks, dependent: :destroy
  validates :name, presence: true

  include RankedModel
  ranks :row_order, with_same: [:board_id]
end
