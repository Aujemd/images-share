$("#btn-like").click(function(e){
    e.preventDefault()
    let imgId = $(this).data("id")

    $.post("/images/" + imgId + "/like")
        .done(data => {
            $(".likes-count").text(data.likes)
        })
})