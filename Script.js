$(document).ready(function() {
    $('#search-link').click(function() {
        $('#search-modal').modal('show');
    });
    $('#library-link').click(function() {
        $('#library-modal').modal('show');
    });
    $('#signup-btn').click(function() {
        $('#signup-modal').modal('show');
    });
    $('#signup-form').submit(function(e) {
        e.preventDefault();
        var email = $('#email').val();
        var password = $('#password').val();
        if (email && password) {
            $('#signup-success').show();
            setTimeout(function() {
                $('#signup-modal').modal('hide');
            }, 2000);
        }
    });
    $('#search-input').on('input', function() {
        var input = $(this).val();
        if (input.length > 0) {
            $.ajax({
                type: 'GET',
                url: 'https://api.spotify.com/v1/search',
                data: {
                    q: input,
                    type: 'track,artist,album'
                },
                headers: {
                    'Authorization': 'Bearer YOUR_SPOTIFY_API_TOKEN'
                },
                success: function(data) {
                    var results = data.tracks.items;
                    var html = '';
                    $.each(results, function(index, result) {
                        html += '<li>';
                        html += '<img src="' + result.album.images[0].url + '" alt="' + result.name + '">';
                        html += '<span>' + result.name + '</span>';
                        html += '</li>';
                    });
                    $('#search-results').html(html);
                }
            });
        } else {
            $('#search-results').html('');
        }
    });
});