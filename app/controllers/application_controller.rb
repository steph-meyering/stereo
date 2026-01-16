class ApplicationController < ActionController::Base
    # CSRF protection for API - use null_session strategy for JSON APIs
    protect_from_forgery with: :null_session, if: -> { request.format.json? }
    
    helper_method :current_user, :logged_in?

    def logged_in?
        !!current_user
    end

    def login(user)
        @current_user = user
        session[:session_token] = user.reset_session_token!
    end

    def logout
        current_user.reset_session_token! 
        session[:session_token] = nil
    end

    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def require_logged_in
        unless logged_in?
            render json: { errors: ['You must be logged in to perform this action'] }, status: 401
        end
    end

    def require_owner(resource)
        unless current_user && (current_user.id == resource.artist_id || current_user.admin?)
            render json: { errors: ['You are not authorized to perform this action'] }, status: 403
        end
    end
end