// module.exports = router;

/* For every time a person accesses the frontend 
without a local storage item, 
generate a token here and send it to the frontend.
The frontend should store the token and ensure it is valid upon loading jokes.
If the token is valid, send a response back to the backend saying the "token"
has voted on the joke, and store that in a join table for votes.
If the token is valid and the "token" has voted on that specific joke
do not allow the vote up/down to be submitted. 
*/
