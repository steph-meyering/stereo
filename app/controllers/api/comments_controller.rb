class Api::CommentsController < ApplicationController
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

        if @comment.save
            render :show
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end
    
    def update
        @comment = Comment.find_by(id: params[:id])
        if @comment && @comment.update_attributes(comment_params)
            render :show
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end
    
    def destroy
        @comment = Comment.find_by(id: params[:id])
        @comment.destroy
    end
    
    private
    
    def comment_params
        params.require(:comment).permit(:user_id, :song_id, :body, :song_time)
    end
end