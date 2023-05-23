$(() => {
    const sucess = function (res) {
        if (res.data.length == 0) 
            $("#content").append(`<p> No data found!!</p>`);
        else
            for (let i = 0; i < res.data.length; i++) {
                $("#content").append(`<p> ${i+1} (${res.data[i].wordtype}) :: ${res.data[i].definition}</p>`);
            }
    }

    const execute = () => {
        $("#content").empty();

        $.ajax({
            url: `http://localhost:4000/search?searchinput=${$("#searchinput").val()}`,
            type: 'GET',
            dataType: 'json',
            success: sucess,
        });
    }

    $(".btn").click(execute);
});