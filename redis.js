console.log("surya");

var redis = require('redis'), set_size = 10;
var client = redis.createClient(6379, '0.0.0.0', {no_ready_check: true});
//client.auth('foobared', function (err) {
 //   if (err) throw err;
//});

client.on('connect', function() {
    console.log('Connected to Redis');
});
client.get("rest_discount", function (err, reply) {
    if (err) throw err;
    console.log("rest_discount = " + reply.toString());
});
/*
client.sadd("bigset", "a member");
client.sadd("bigset", "another member");

while (set_size > 0) {
    client.sadd("bigset", "member " + set_size);
    set_size -= 1;
}
*/
// multi chain with an individual callback
client.multi()
    .scard("bigset")
    .smembers("bigset")
    .dbsize()
    .exec(function (err, replies) {
        console.log("MULTI got " + replies.length + " replies");
        replies.forEach(function (reply, index) {
            console.log("Reply " + index + ": " + reply.toString());});
        client.quit();
    });
