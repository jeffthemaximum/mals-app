# Meet a local stranger
A chat app where you chat with a local stranger

# TODO
- presence
- [X] Message sent logic
- [X] Message received logic
- [X] `user is typing` logic with text just above footer
- [ ] when user 1 leaves chat, alert user 2 with `user has left` red text just above footer (see: https://medium.com/@a.carreras.c/using-action-cable-for-private-messaging-presence-indicators-on-react-rails-app-526b3e34c14d)
- ~~show time in the text bubble for sent/received~~
- avatar
- [X] random avatar for a user from https://getavataaars.com/
- [ ] optimize avatar to download and precache svg file on rails server, save that to db.
- brand
- [X] text/colors match brand in chat
- loading
- [ ] sending messages disabled until user joins
- [ ] loading lottie file is fun
- [ ] loading has random chats from db show up
- error
- [ ] handle user create error
- [ ] handle chat create error
- [ ] handle message create error
- [ ] handle getJWT error in sagas (make this its own saga)
- redux
- [X] api call for chats and messages thru redux/sagas
- stathat
- [ ] client stats for redux events
- [ ] server stats either like this https://blog.appoptics.com/monitoring-rails-get-hidden-metrics-rails-app/ or this https://guides.rubyonrails.org/active_support_instrumentation.html
- nav
- [ ] custom nav to match branding
- [ ] hamburger menu
- [ ] menu has exit button to take to home screen
- [ ] menu has report button to send message, message received on server, stathat
- longer term
- [ ] if user waits more than n seconds, alert me, I join chat
- local
- [ ] get location on client, send to server, get nearest chat to location on server. Alternately, get location via IP on server. Alternately, have user enter zip in client.
