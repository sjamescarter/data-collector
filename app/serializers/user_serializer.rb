class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :job_title
  has_many :students do
    object.students.uniq
  end
end

