class MyStudentsController < ApplicationController
    def index
        render json: @user.students.uniq
        # , each_serializer: MyStudentSerializer
    end
end
