class Api::CommentsController < ApplicationController
    before_action :require_logged_in, only: [:create, :update, :destroy]
    before_action :set_comment, only: [:update, :destroy]
    before_action :authorize_owner, only: [:update, :destroy]

    def show
        @comment = Comment.includes(:user).search(params[:song_id])
        render :show
    end

    def index
        @comments = Comment.includes(:user).search(params[:song_id])
        render :index
    end
    
    def create
        @comment = Comment.new(comment_params)
        @comment.user_id = current_user.id  # Ensure user can only create comments as themselves

        if @comment.save
            render :show
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end
    
    def update
        if @comment.update_attributes(comment_params)
            render :show
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end
    
    def destroy
        @comment.destroy
        render json: { message: 'Comment deleted successfully' }
    end
    
    private

    def set_comment
        @comment = Comment.find_by(id: params[:id])
        unless @comment
            render json: { errors: ['Comment not found'] }, status: 404
        end
    end

    def authorize_owner
        return unless @comment
        unless current_user.id == @comment.user_id || current_user.admin?
            render json: { errors: ['You are not authorized to perform this action'] }, status: 403
        end
    end
    
    def comment_params
        params.require(:comment).permit(:song_id, :body, :song_time)
    end
end