# Scheduler
#REST API for scheduling a list of attendees

This app gathers information for a list of event attendees. The host must register all invitees 
through a simple form which when submitted, triggers two API requests - 

1. An SMTP request - required to facilitate mail exchange services between a sender and a receiver.
2. An HTTP POST request - required to send data through a connected server to a database.
3. HTTP GET and DELETE requests - required to display and delete invitees from on and from a list respectively.

#Stack

MERN Stack
