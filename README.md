# BUILDING

## Team Members
- [Cem Olcusenler](https://github.com/mcemolcusenler)
- [Dilan Nebioglu](https://github.com/nebdil)

## Project

Final project for [Lighthouse Labs](https://github.com/lighthouse-labs). Users can register into a building under their address. They can post to the message board, reply to others' posts and like them. They can also go to a page where they only see the posts they've created and have responded to. Project is currently being refactored and still under development.

## Getting Started

1. Install dependencies for React App: `npm install`
2. Install dependencies for Rails API App: `bundle install`
3. Run migrations: `bin/rails db:migrate`
4. Seed the data: `bin/rails db:seed`
5. Run the Rails server: `bin/rails server`
6. Run the React server: `npm start`
7. Visit `http://localhost:3001/`

## Dependencies for Rails App

- gem 'rails', '~> 5.1.4'
- gem 'pg'
- gem 'puma', '~> 3.7'
- gem 'bcrypt', '~> 3.1.7'
- gem 'knock'
- gem 'google_places'
- gem 'faker'
- gem 'rack-cors'
- gem 'mailgun-ruby', '~>1.1.6'
- gem 'mailgun_rails'
- gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
- gem 'listen', '>= 3.0.5', '< 3.2'
- gem 'spring'
- gem 'spring-watcher-listen', '~> 2.0.0'
- gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

## Dependencies for React App

- "classnames": "^2.2.5",
- "gsap": "^1.20.3",
- "jquery": "^3.2.1",
- "moment": "^2.19.2",
- "react": "^16.1.1",
- "react-bootstrap": "^0.31.5",
- "react-router-dom": "^4.2.2",
- "react-scripts": "1.0.17"

## Screenshots

![Landing Page](https://github.com/nebdil/Building/blob/master/resources/Landing-Page.png)
![Register Page](https://github.com/nebdil/Building/blob/master/resources/Register.png)
![Message Board](https://github.com/nebdil/Building/blob/master/resources/Message-Board.png)
![Create a Post](https://github.com/nebdil/Building/blob/master/resources/Create-Post.png)
![Display a Post](https://github.com/nebdil/Building/blob/master/resources/Post.png)
![Respond to and Like a Post](https://github.com/nebdil/Building/blob/master/resources/Reply.png)
![Personal Posts](https://github.com/nebdil/Building/blob/master/resources/Personal-Posts.png)
