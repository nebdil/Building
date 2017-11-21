class ApplicationMailer < ActionMailer::Base
  default from: ENV['FROM_EMAIL']
  # layout 'mailer'

  # def initialize
  #   Mailgun.configure do |config|
  #     config.api_key = ENV['PRIVATE_API_KEY_MAILGUN']
  #   end
  # end

  def register_email(user)
    puts 'IN EMAIL REGISTER'
    @user = user
    mg_client = Mailgun::Client.new ENV['PRIVATE_API_KEY_MAILGUN']
    message_params = {
      :from => ENV['FROM_EMAIL'],
      :to      => @user.email,
                      :subject => 'Hello from your Building!',
                      :text    => 'Thank you for registering to your Building! Now you can connect with your neighbors!'}
    mg_client.send_message ENV['DOMAIN'], message_params
    # mail(to: @user.email, subject: 'Sample Email')
  end
end
