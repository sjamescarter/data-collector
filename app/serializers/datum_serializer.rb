class DatumSerializer < ActiveModel::Serializer
  attributes :id, :note, :correct, :total
  has_one :goals
end
