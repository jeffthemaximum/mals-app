# Meet a local stranger
A chat app where you chat with a local stranger

# TODO
- presence
    - [X] Message sent logic
    - [X] Message received logic
    - [X] `user is typing` logic with text just above footer
    - [X] when user 1 leaves chat, alert user 2 with `user has left` red text just above footer (see: https://medium.com/@a.carreras.c/using-action-cable-for-private-messaging-presence-indicators-on-react-rails-app-526b3e34c14d)
    - ~~show time in the text bubble for sent/received~~
- avatar
    - [X] random avatar for a user from https://getavataaars.com/
    - [X] optimize avatar to download and precache svg file on rails server, save that to db.
- brand
    - [X] text/colors match brand in chat
- loading
    - [X] sending messages disabled until user joins
    - [X] loading lottie file is fun (uses https://www.humaaans.com/)
    - [X] loading has random chats from db show up
- error
    - [X] handle user create error
    - [X] handle user update error
    - [ ] handle chat create error
    - [ ] handle message create error
    - [ ] handle getJWT error in sagas (make this its own saga)
- redux
    - [X] api call for chats and messages thru redux/sagas
- stathat
    - [X] client stats for redux events
    - [X] server stats either like this https://blog.appoptics.com/monitoring-rails-get-hidden-metrics-rails-app/ or this https://guides.rubyonrails.org/active_support_instrumentation.html
- nav
    - [X] custom nav to match branding
    - [X] hamburger menu
    - [X] menu has exit button to take to home screen
    - [ ] menu has report button to send message, message received on server, stathat
- longer term
    - [X] if user waits more than n seconds, alert me, I join chat
    - [ ] store device ID when creating users on backend
- local
    - [X] get location on client, send to server, get nearest chat to location on server. Alternately, get location via IP on server.
- bugs
    - [X] typing/presence notifications don't show until after first message. should show before it.
    - [X] server stat queue shouldnt be interval / should be when it hits an amount
    - [X] delete JoinChatJob of chat thats deleted
    - [X] keyboard hides input on Home
- testing
    - [ ] E2E https://github.com/wix/Detox
- dist
    - [ ] splash screen
    - [ ] icon
    - [ ] build with "production" secrets
