class StudentsController < ApplicationController
  def index
    render json: Student.all
  end

  def create
    student = Student.create(student_params)
    if student.valid?
      render json: student, status: :created
    else
      render json: { errors: student.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  def student_params
    { 
      :first_name=>params[:first_name].titlecase.strip,
      :last_name=>params[:last_name].titlecase.strip, 
      :grade_level=>params[:grade_level] 
    }
  end
end
