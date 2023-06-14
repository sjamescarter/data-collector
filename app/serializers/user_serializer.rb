class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :password_digest, :first_name, :last_name, :job_title
end
