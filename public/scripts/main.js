var client_id;
var pubnub;



$(function() {
    progressJs().setOptions({
        overlayMode: true,
        theme: 'onslaught'
    }).start();
    $.get('/config/pubnub.json', function (data) {
        client_id = PUBNUB.uuid();

        pubnub = PUBNUB.init({
            publish_key: data.publish,
            subscribe_key: data.subscribe,
            ssl: true
        });

        pubnub.subscribe({
            channel: data.channel,

            message: function(data) {
                console.log(data);

                if (data.client === client_id) { return; }
            },
            connect: function() {
                console.log('connected');

                pubnub.publish({
                    channel: data.channel,
                    message: {
                        client: client_id,
                        msg: 'hi'
                    }
                });
            }
        });
    });
});