$(function(){
    // console.log(in_pos([256, 130], [0,494]));
    var $ul = $("<ul class='group'></ul>");

    imageFilenames.forEach(function(v, i){
        var $li = $('<li class="photo" id="photo'+ i+'"><img src="images/'+v +'"></li>');
        $ul.append($li);
        $("#container").append($ul);
    });

    var empty_pos = [];
    var positions = [];
    var p_to_l = {};
    var l_to_p = {};
    $("li").each(function(i,v){
        var x = $(v).offset().left;
        var y = $(v).offset().top;
        positions.push([x,y]);
        p_to_l[[x,y]] = $(v).attr("id");
        // console.log($(v));
        // l_to_p[$(v).attr("id")] = [x,y];
    });

    // console.log(l_to_p);
//     console.log(p_to_l);
    stay();

    var $moving_li = null;

    $("li").mousedown(function(event){
        var mouseX = event.pageX;
        var mouseY = event.pageY;
        // console.log($(event.currentTarget));

        var photoX = $(event.currentTarget).offset().left;
        var photoY = $(event.currentTarget).offset().top;
        empty_pos = [photoX, photoY];

        $moving_li = $(event.currentTarget);

        p_to_l[empty_pos] = null;

        // console.log(empty_pos);
 //        console.log(p_to_l);

       $(event.currentTarget).css({position: "absolute","z-index":2, left: mouseX+"px", top: mouseY+"px"});

    });

    $(document).mousemove(function(event){
        if($moving_li){

            var mouseX = event.pageX;
            var mouseY = event.pageY;
            var current_pos = [mouseX, mouseY];

            $moving_li.css({left: mouseX+"px", top: mouseY+"px"});

            positions.forEach(function(pos, i){
                // console.log("pos:",pos);
 //                console.log("current pos",current_pos);
 //                console.log("in:", in_pos(current_pos, pos));
                if (p_to_l[pos] && in_pos(current_pos, pos)){

                    if(!eq(empty_pos, pos) ){

                        var $current_li = $("#"+p_to_l[pos]);

                        var temp = empty_pos;
                        empty_pos = [$current_li.offset().left, $current_li.offset().top];
                        $current_li.css({position: "absolute", left: temp[0]+"px", top:temp[1]+"px"});

                        p_to_l[empty_pos] = null;
                        p_to_l[temp] = $current_li.attr("id");
                        // console.log("current_li:", $current_li.offset().left, $current_li.offset().top);

                        // var temp = [$current_li.offset().left, $current_li.offset().top];
 //                        $current_li.css({left: empty_pos[0]+"px", top:  empty_pos[1]+"px"});
 //                        empty_pos = temp;


                    }
                }
            });

        }
    });

    $(document).mouseup(function(event){

        if($moving_li){
            console.log("mouse relieved!");
            console.log("empty_pos:", empty_pos[0], empty_pos[1]);
            $moving_li.css({ "z-index": 1, left: empty_pos[0]+"px", top: empty_pos[1]+"px"});

            p_to_l[empty_pos] = $moving_li.attr("id");
            $moving_li = null;
            // console.log(p_to_l);

        } else {
            // $moving_li = false;
            console.log("something is wrong");
        }
    });



    function in_pos(pos1, pos2){
        var x1 = pos1[0];
        var y1= pos1[1];
        var x2= pos2[0];
        var y2= pos2[1];

        return ((x2< x1) && (x1 < x2+100) && (y2< y1) && (y1 < y2+ 100));
    }

    function eq(a1, a2){
        for (var i=0; i < a1.length; i++){
            if (a1[i] !== a2[i]){
                return false;
            }
        }
        return true;
    };

    function stay(){
        $("li").each(function(i,v){
            $(v).css({position:"absolute", left:positions[i][0]+"px", top:positions[i][1]+"px"});
        });
    };

    $("li").hover(function(event){
        // console.log($(event.currentTarget).attr("id"));
    })

});

